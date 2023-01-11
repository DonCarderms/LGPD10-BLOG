import { List } from "dom";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// componentes
import Header from "../../componentes/header";
import Post from "../../componentes/Post";
import Footer from "../../componentes/Footer";

import './style.css'


function Autor() {
    const existToken = sessionStorage.getItem('autorSession')
    const existTokenLogado = localStorage.getItem('')

    const autor = localStorage.getItem('autor')
    const autorId = localStorage.getItem('autorId')


    const [postTitle, setPostTitle] = useState('')
    const [postContenu, setPostContenu] = useState('')
    const [categories, setCategories] = useState([])
    const [categoria_id, setCategoria_id] = useState(0)

    const [postagens, setPostagens] = useState([]) 


    const post = (autor, categoria, titulo, conteudo) =>{
        return{
            autor_id : autor,
            categoria_id : categoria,
            titulo : titulo,
            conteudo : conteudo
        }
    }

   const postContenuSize = () => postContenu.length

    const salvarPost = (e) => {
        e.preventDefault()
           const dados = post(autorId, categoria_id, postTitle, postContenu)
          
           if( 
            dados.categoria_id !== 'null' &&
            dados.postTitle !== '' &&
            postContenuSize() >= 100
            ){

                fetch('http://localhost:3000/postagens', {
                    method : 'POST',
                    body: JSON.stringify(dados),
                    headers : {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then((reponse) => {
                    console.log(reponse)
                })
            }


    }
   
    
    useEffect(() => {
        fetch('http://localhost:3000/categorias')
        .then((response) => response.json())
        .then((reponse) => {
            setCategories(reponse)
        })
    }, [])
    
    
    useEffect(() => {
        fetch('http://localhost:3000/postagens')
        .then((response) => response.json())
        .then((reponse) => {  
            setPostagens(reponse.filter(post => post.autor_id === autorId))
        })
    }, [])
    
    
    const logout = () => {
        
    }
    
    return (
        <div className="div-app">
            <Header titulo='LGPD BLOG' background='#656598' user={autor}/>
            <div style={{padding : '20px'}}>
                
                <div className="post-autor">
                        <div className="container">
                            <form >
                                <label htmlFor="fname">Título do Post</label>
                                <input 
                                  type="text"
                                   id="fname" 
                                   name="title" 
                                   placeholder="Digite o título do post" 
                                   value={postTitle}
                                   onChange={(e) => {setPostTitle(e.target.value)}}
                                />
                                <label htmlFor="lname">Conteúdo do Post</label>
                                <textarea 
                                  name="content" 
                                  placeholder="Digite o conteúdo do post"
                                   value={postContenu}
                                   onChange={(e) => {setPostContenu(e.target.value)}}
                                   ></textarea>
                                Categorias
                                <select name="" id="" onClick={(e) => {setCategoria_id(e.target.value)}}>
                                    <option value="null">selectionar o categoria</option>
                                    { 
                                        categories.map((cat, i) => {
                                            return(
                                                <option key={i} value={cat.id}>{cat.nome}</option>
                                            )
                                        })
                                    }
                                </select>
                                <input className="submit-post-btn" type="submit" value="Salvar" onClick={(e) => {salvarPost(e)}}/>
                            </form>
                        </div>
                </div>
                <h2 style={{textAlign : 'center'}}>Meus Posts</h2>
                <div className="Posts-home">

                    {
                        postagens.map((post, i) => {
                            return(
                                
                                    <Post key={i} titulo={post.titulo}/>              
                            )
                               
                        
                        })
                    } 
                    

                    
                <br /><br />
                </div>
               
                    <Footer />
            </div>
        </div>
      
    )
}

export default Autor;
