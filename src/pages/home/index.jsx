import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import './style.css'

import Post from "../../componentes/Post";
import Header from "../../componentes/header";
import Footer from "../../componentes/Footer";
import { GerarToken } from "../login";

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
                
                    {
                        postagens.map((post, i) => {
                            return(
                                    <Link to={`/Postagem?${post.id}`} >
                                         <Post key={i} titulo={post.titulo} autor={post.autor_id} maxwidth="800px" id_postagem={post.id}/>
                                    </Link>
                                 )                               
                        })
                    }                   
                                       
            </div>

            <GerarToken/>
         
            <Footer />
        </div>
       
    )
}



export default Home;