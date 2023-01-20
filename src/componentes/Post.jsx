import React, {useEffect, useState} from "react";
import './Post.css';
import delete_svg from '../images/delete.svg';
import ModalPost from "./Modal";
function Post ({titulo, contenu, height, autor, maxwidth, id_postagem, showBtnDelete}) {

    const [comments, setComments] = useState([])
    const [nomeAutor, setNomeAutor] = useState()

    

    useEffect(() => {
        fetch(`http://localhost:3000/comentarios`, {
            method : 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }   
    
        })
        .then((reponse) => reponse.json())
        .then((reponse) => {
            setComments(reponse.filter((comment) => comment.postagem_id === `${id_postagem}`)) 
        }).catch((error) => console.log(error))
    }, [id_postagem])

      const comment = comments.length === undefined || 0 ? 0 : comments.length
      const quantidadeComments = comments.length > 1 ? 'comentarios' : 'comentario';

    useEffect(() =>{

        fetch(`http://localhost:3000/autor/${autor}`, {
            method : 'GET',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((reponse) => reponse.json())
        .then((reponse) => setNomeAutor(reponse.nome))   
        .catch((error) => console.log(error))  
    }, [autor])

    
    const deletePost =(id) =>{

        fetch(`http://localhost:3000/postagens/${id}`, {
            method : 'DELETE',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

    }

    const [ editId, setEditId] = useState()

    const editPost = (id) => {
        setEditId(id)
    }

    return(
    
            <div 
           
                className="content"
                id="content" 
                style={{
                    position : 'relative',
                    height: height,
                    maxWidth : maxwidth,
                    display :'flex',
                    justifyContent : 'space-between',
                    padding: '20px',
                    background: '#e6e6e6',
                    marginTop: '5px',
                    cursor : 'pointer',
                    color : '#000',
                }}
            
            > 
                {
                    editId !== undefined
                    ?<ModalPost id={editId}/>
                    : ''
                }
                
                
                <h2 
                    style={{
                        fontSize: '0.9em',
                        fontWeight: 'bold',
                        color: 'rgba(0, 0, 0, 0.7)'
                    }}
                    className="title"
                > {titulo}</h2>
                <p> {contenu} </p>
                <div
                    style={{
                        textAlign :'right'
                    }}
                >
                <span 
                className="comments"
                    style={{
                        right: '10px',
                        bottom: '0',
                        position: 'absolute',
                        fontSize : '0.9rem'
                    }}
                > {comment} {quantidadeComments} <img width={'12'}src="https://img.icons8.com/material-outlined/24/null/comments--v1.png"/></span>
                {
                    showBtnDelete 
                    ?<div style={{display : 'flex' }}>
                        <button 
                            value={id_postagem} 
                            style={{
                                backgroundImage : 'url("https://img.icons8.com/ios-glyphs/30/null/edit-row.png")',
                                backgroundRepeat : 'no-repeat',
                                backgroundPosition : 'center',
                                backgroundSize : '20px'
                            }}

                            onClick={(e) => editPost(e.target.value)}
                        >

                        </button>
                        <form >

                            <button
                            type="submit"
                            value={id_postagem} 
                            style={{
                                    backgroundImage: 'url("https://img.icons8.com/ios-glyphs/30/null/delete-forever.png")' , 
                                    border : 0,
                                    backgroundRepeat : 'no-repeat',
                                    backgroundPosition : 'center',
                                    backgroundSize : '20px'
                                }} 
                                onClick={(e) => deletePost(e.target.value)}>
                            </button> 
                        </form>
                       
                    </div> 
                     : ''
                }
                </div>
                    <p 
                    
                        style={{
                            fontSize: '0.8rem',
                            position: 'absolute',
                            bottom: '0'
                            }}> 
                    <span style={{ fontWeight : '600' }}>Autor:</span>  <i>{nomeAutor}</i> 
                    </p>


            </div>  

    )
}

export default Post;