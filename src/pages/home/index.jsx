import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import './style.css'

import Post from "../../componentes/Post";
import Header from "../../componentes/header";
import Footer from "../../componentes/Footer";
import { GerarToken } from "../login";
import { key } from "localforage";

function Home () {

    const goToLogin = () => window.location.href=`http://localhost:3001`;

    const existToken = sessionStorage.getItem('userSession')
    const existTokenLogado = localStorage.getItem('logado')
    const user = sessionStorage.getItem('user')
    
    const [postagens, setPostagens] = useState([]) 
   

    if(!existToken){
        if(!existTokenLogado){
            if(!localStorage.getItem('user_id'))
              goToLogin();  
        }
    }else{
        localStorage.setItem('logado', existToken)
        localStorage.setItem('user', user)
    }



window.onbeforeunload = function() {
    localStorage.removeItem("logado"); 
    localStorage.removeItem("user"); 
    localStorage.removeItem("user_id"); 
    return '';
    
  };

  const [categoria, setCategoria] = useState()
  const [categories, setCategories] = useState([])
  const [filterTitle, setFilterTitle] = useState('')

  const loadPostagens = () => {
        fetch('http://localhost:3000/postagens')
        .then((response) => response.json())
        .then((reponse) => {  

             const filterCategoria = reponse.filter(item => item.categoria_id === categoria)   
             const filterPerTilte = reponse.filter(item => item.titulo.toLowerCase().startsWith(filterTitle.toLowerCase())) 

             let filtrado = reponse
             if(filterTitle.length > 0){
                filtrado = filterPerTilte
             }else
             if(categoria >= 0){          
                filtrado = filterCategoria
             }
               
              setPostagens(filtrado)
            
                           
                                
        }).catch((error) => console.log(error))
  }

//   const filteredPost = 

    useEffect(() => {
        loadPostagens()
    },[categoria, filterTitle])

   

    useEffect(() => {
        fetch('http://localhost:3000/categorias')
        .then((response) => response.json())
        .then((reponse) => {
            setCategories(reponse)
        }).catch((error) => console.log(error))
    }, [])
    


    return(
        <div id="container">
            <Header titulo='LGPD BLOG' background='#656598' heigth={'0px'}/>
            <div style={{marginTop : '10px'}}> 
                <h2 className="postagens">Postagens recentes </h2>      
                
               
            </div>
            <div className="Posts">
                <div>

                    <label htmlFor="filter">filtar por categoria</label>
                    <select name="filter" id="filter" onClick={(e) => {setCategoria(e.target.value)}}>
                                        <option >nenhum</option>
                                        { 
                                            categories.map((cat, i) => {
                                                return(
                                                    <option key={i} value={cat.id}>{cat.nome}</option>
                                                )
                                            })
                                        }
                    </select>
                    <label htmlFor="filterNome">filtar por titulo</label>
                    <input type="text" name="filterNome" value={filterTitle} onChange={(e) => setFilterTitle(e.target.value)}/>
                </div>
                      <Pagination  dadosPost={postagens}  />                    
            </div>

            <GerarToken/>
         
            <Footer />
        </div>
       
    )
}


export const Pagination = ({dadosPost}) =>{


    const [currentPage, setCurrentPage] = useState(0)
    const pageSize = 10


   const  pages = Math.ceil(dadosPost.length / pageSize)

    const startIndex = currentPage * pageSize;
  
    const endIndex = startIndex + pageSize


    const currentItens = dadosPost.slice(startIndex, endIndex)


    const showPages = (e) => {
            e.target.style.background = '#ccc'
            setCurrentPage(e.target.value)
            const Btns = document.querySelectorAll('button')
            Btns.forEach(el => {
    
               if(el.value !== e.target.value){
                el.style.background = ''
               }
            })
    }

    return(
        <div>
                  <div className="btnsPage">

                        {Array.from(Array(pages), (item, index)=> {
                          
                            return <button key={index} 
                                            value={index} 
                                            onClick={(e) => showPages(e)}
                                            style ={
                                                index === 0
                                                ? {background : '#ccc'}
                                                : {background : ''}
                                            }
                                            >                      
                                            {index + 1}
                                    </button>
                        })}
                    </div><br />
                <div>
                      {
                          currentItens.map((post, i) => {
                              return(
                                  <Link  to={`/Postagem?${post.id}`} key={i} >
                                      <Post titulo={post.titulo} autor={post.autor_id} id_postagem={post.id} maxwidth='900px'/>
                                  </Link>
                              )
                          })
                      }
                  </div>
        </div>
        
    )
}



export default Home;