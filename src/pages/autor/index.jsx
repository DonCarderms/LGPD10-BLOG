import { List } from "dom";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// componentes
import Header from "../../componentes/header";
import Post from "../../componentes/Post";
import Footer from "../../componentes/Footer";
import Message from "../../componentes/Message";
import { Foot } from "../home/index";

import './style.css'


function Autor() {

    const existToken = sessionStorage.getItem('autorSession')
    const existTokenLogado = localStorage.getItem('autorLogado')

    const autor = localStorage.getItem('autor')
    const autorId = localStorage.getItem('autorId')


    const [postTitle, setPostTitle] = useState('')
    const [postContenu, setPostContenu] = useState('')
    const [categories, setCategories] = useState([])
    const [categoria_id, setCategoria_id] = useState(0)


    const [postagens, setPostagens] = useState([]) 
    const [newPost, setNewPost] = useState()

    const post = (autor, categoria, titulo, conteudo) =>{
        return{
            autor_id : autor,
            categoria_id : categoria,
            titulo : titulo,
            conteudo : conteudo
        }
    }


  const[ Statusmessage, setStatusMessage] =  useState(undefined)

   const postContenuSize = () => postContenu.length

    const salvarPost = (e) => {
        e.preventDefault()

           const dados = post(autorId, (categoria_id - 1), postTitle, postContenu)
           if( 
            dados.categoria_id  >= 0 &&
            dados.titulo.length >= 10 &&
            postContenuSize() >= 100 &&
            postContenuSize() <= 1000
            ){
 
                setStatusMessage(false)
                fetch('http://localhost:3000/postagens', {
                    method : 'POST',
                    body: JSON.stringify(dados),
                    headers : {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then((res) => res.json())
                .then((res) => {
                    setNewPost(res)

                    setPostTitle('')
                    setPostContenu('')
                }).catch((error) => console.log(error))
            }else {
                    setStatusMessage(true)           
            }


    }

    useEffect(() => {
        fetch('http://localhost:3000/categorias')
        .then((response) => response.json())
        .then((reponse) => {
            setCategories(reponse)
        }).catch((error) => console.log(error))
    }, [])
    
    
    useEffect(() => {
        fetch('http://localhost:3000/postagens')
        .then((response) => response.json())
        .then((reponse) => {  
            setPostagens(reponse.filter(post => post.autor_id === autorId))
        }).catch((error) => console.log(error))
    }, [newPost])
    
    if (!existToken && !existTokenLogado) {
        window.location.href=`http://localhost:3001`;
    } else {
        localStorage.setItem('autorLogado', existToken)
    }


    const logout = () => {
        sessionStorage.clear('autorSession')
        localStorage.clear('autorLogado')
        window.location.href = `http://localhost:3001`;
    }
    
    return (
        <div className="div-app">
            <div className="wrapper"></div>
            <Header titulo='LGPD BLOG' background='#656598' user={autor} heigth='10px'/>
             <button className="bt-sair" onClick={logout}>
               <img width={20} src="https://img.icons8.com/ios-filled/50/null/logout-rounded-left.png"/>
             </button>
            <div style={{padding : '20px'}}>
                
                <div className="post-autor">
                        <div className="container">
                            <form>
                                <div style={{margin : '10px', textAlign : 'center' }}>

                                  <Message status={Statusmessage} msgError='dados incorretos' msgSucces='post publicado com sucesso!'/>
                                </div>
                                <div className="">
                                    <label htmlFor="fname">Título do Post</label>
                                    <input 
                                    type="text"
                                    id="fname" 
                                    name="title" 
                                    placeholder="Digite o título do post" 
                                    value={postTitle}
                                    onChange={(e) => {setPostTitle(e.target.value)}}
                                    />
                                </div>
                                <label htmlFor="lname">Conteúdo do Post</label>
                                <textarea 
                                  name="content" 
                                  placeholder="Digite o conteúdo do post"
                                   value={postContenu}
                                   onChange={(e) => {setPostContenu(e.target.value)}}
                                   ></textarea>
                                Categorias
                                <select name="" id="" onClick={(e) => {setCategoria_id(e.target.value)}}>
                                    <option value={0}>selectionar o categoria</option>
                                    { 
                                        categories.map((cat, i) => {
                                            return(
                                                <option key={i} value={cat.id + 1}>{cat.nome}</option>
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
                                <div key={i}>
                                    
                                        <Post titulo={post.titulo} maxwidth='900px' autor={autorId} id_postagem={post.id} showBtnDelete={true}/> 
                                                                     
                                </div>
                                            
                            )
                               
                        
                        })
                    } 
                    
                    
                <br/><br/>
                <br/><br/>
                </div>
               
                    <Footer />
            </div>
        </div>
      
    )
}


export default Autor;
