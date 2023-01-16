import React, {useEffect, useState} from "react";
import './post.css'


function Post ({titulo, contenu, height, autor, maxwidth, id_postagem}) {

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
        })
    }, [])

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
    }, [])



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
                
                </div>

                <p style={{
                        fontSize: '0.8rem',
                        position: 'absolute',
                        bottom: '0'
                }}> <span style={{ fontWeight : '600' }}>Autor:</span>  <i>{nomeAutor}</i> </p>

            </div>  

    )
}

export default Post;