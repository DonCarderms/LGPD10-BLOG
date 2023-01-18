import React, {useEffect, useState}  from "react";
import './Postagem.css'


import Post from "../../componentes/Post";
import Header from "../../componentes/header";
import Footer from "../../componentes/Footer";




const  Postagem =()=>{
    const [postagem, setPostagem] = useState({})
    const url = window.location.search
    const id_postagem = url.split('?')[1]

    const goToLogin = () => window.location.href=`http://localhost:3001`;
    
    useEffect(() =>{
        
        fetch(`http://localhost:3000/postagens/${id_postagem}`, {
            method : 'GET',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((reponse) => reponse.json())
        .then((reponse) => {
            setPostagem(reponse)
        })
    }, [])

    if(!localStorage.getItem('user_id')){
        goToLogin()
    }


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
        e.preventDefault()
        
        const dados = pegarDados(user_id, id_postagem, comment)

        if(
            dados.user_id !== '' &&
            dados.id_postagem !== '' &&
            dados.conteudo !== '' &&
            dados.conteudo.length >= 10 &&
            dados.conteudo.length <= 100
    
            ){

                    fetch('http://localhost:3000/comentarios', {
                        method : 'POST',
                        body: JSON.stringify(dados),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }         
                    }).then(()=>{
                        loadComentario()
                    }).catch((e)=>console.log(e))

                setComment('')
            }
   }

   const loadComentario = () => {
    fetch(`http://localhost:3000/comentarios`, {
        method : 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }   
        
    })
    .then((reponse) => reponse.json())
    .then((reponse) => setComments(reponse.filter((comment) => comment.postagem_id === id_postagem)))
   }

   useEffect(() => {
    loadComentario()
}, [])

    return(
        <div className="commentarios-container">
            
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
                        value={'comentar'}
                        onClick={(e) => enviar(e)}
                        />
                  
                </div>

                <div>
                    {
                        comments.map((comment, i) => {

                           return(
                                <div className="div-comments" key={i}>

                                        <GetUserName user_id={comment.user_id}/>
                                   
                                    <p >{comment.conteudo}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
    )
}

export const GetUserName = ({user_id}) => {

       const  [userName, setUserName] = useState('')

        const loadUsuario = () => {
            fetch(`http://localhost:3000/user/${user_id}`, {
            method : 'GET',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
        .then((res) =>setUserName(res.nome))
        }

        React.useEffect(()=>{
            loadUsuario()
        }, [user_id])

        return(
                <h5 className="userName">
                
                    {userName}
                </h5>           
        )
}















export default Postagem;