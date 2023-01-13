import React, {useEffect, useState}  from "react";
import './Postagem.css'


import Post from "../../componentes/Post";
import Header from "../../componentes/header";
import Footer from "../../componentes/Footer";




const  Postagem =()=>{
    const [postagem, setPostagem] = useState({})
    const url = window.location.search
    const id_postagem = url.split('?')[1]

    useEffect(() => {
        fetch(`http://localhost:3000/postagens/${id_postagem}`, {
            method : 'GET',
        })
        .then((reponse) => reponse.json())
        .then((reponse) => {
            setPostagem(reponse)
        })
    }, [])



    return (
        <div className="Postagem_container">
            <Header titulo='LGPD BLOG' background='#656598' heigth={'0px'}/>

            <div className="Postagem">
       
                {
                    <div style={{ margin : '0 10px'}}>

                            <h1>{postagem.titulo}</h1>
                            <Post 
                                key={postagem.id}
                                id_postagem={postagem.id}
                                contenu={postagem.conteudo} 
                                autor={postagem.autor_id}
                                comments={''}
                            />
                    </div>
                }
               
               
              <Comentario id_postagem={id_postagem} user_id={localStorage.getItem('user_id')}/><br /><br /><br />
            </div>
                
            <Footer/>
        </div>
    )
}


export const Comentario =({id_postagem, user_id})=>{


   const [comment, setComment] = useState('')
   const [comments, setComments] = useState([])

  
 
   const pegarDados = (user, post, contenu) =>{
            return{
                user_id : user,
                postagem_id : post,
                conteudo : contenu
            }
                    
   }

   const enviar = (e) =>{
        const dados = pegarDados(user_id, id_postagem, comment)
             e.preventDefault()

        if(
            dados.user_id !== '' &&
            dados.id_postagem !== '' &&
            dados.conteudo !== ''
    
            ){

                    fetch('http://localhost:3000/comentarios', {
                        method : 'POST',
                        body: JSON.stringify(dados),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }         
                    })

                setComment('')
            }


   }

   useEffect(() => {
    fetch(`http://localhost:3000/comentarios`, {
        method : 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }   
        
    })
    .then((reponse) => reponse.json())
    .then((reponse) => setComments(reponse.filter((comment) => comment.postagem_id === id_postagem)))
}, [comment])



    return(
        <div className="commentarios-container">
                {/* <Postagem/> */}
                <div className="div_textera_enviar">
                     <p>comentarios</p>
                        <input
                        className="Commentarios"
                        placeholder="Deixar seu commentario"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        />
                   
                    
                        <input 
                        className="enviar_bt"
                        type="submit" 
                        value={'enviar'}
                        onClick={(e) => enviar(e)}
                        />
                  
                </div>

                <div>
                    {
                        comments.map((comment, i) => {

                           return(
                                <div className="div-comments" key={i}>
                                    <p >{comment.conteudo}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
    )
}















export default Postagem;