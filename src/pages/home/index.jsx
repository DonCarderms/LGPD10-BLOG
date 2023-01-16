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
   
    
useEffect(() => {

    if(!existToken){
        if(!existTokenLogado){
              goToLogin();  
        }
    }else{
        localStorage.setItem('logado', existToken)
        sessionStorage.setItem('user', user)
    }
})

  let username = user
    if(!user){
        username  = localStorage.getItem('user')
    }



    useEffect(() => {
        fetch('http://localhost:3000/postagens')
        .then((response) => response.json())
        .then((reponse) => {  
            setPostagens(reponse)
        })
    }, [])


    return(
        <div id="container">
            <Header titulo='LGPD BLOG' background='#656598' heigth={'0px'}/>
            <div style={{marginTop : '65px'}}> 
                <h2 className="postagens">Postagens recentes </h2>      

            </div>
            <div className="Posts">
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
                            console.log(post.id)
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