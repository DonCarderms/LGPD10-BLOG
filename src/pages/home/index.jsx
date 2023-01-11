import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import './style.css'

import Post from "../../componentes/Post";
import Header from "../../componentes/header";
import Footer from "../../componentes/Footer";

function Home (props) {

    const goToLogin = () => window.location.href=`http://localhost:3001`;

    const existToken = sessionStorage.getItem('userSession')
    const existTokenLogado = localStorage.getItem('logado')
    const user = sessionStorage.getItem('user')
    
   

    if(window.location.href.split('/')[3].split('?')[1]){
         console.log(window.location.href.split('/')[3].split('?')[1].split('=')[1])
    }else{
      goToLogin()
    }
    
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

    return(
        <div id="container">
            <Header titulo='LGPD BLOG' background='#656598'/>
            <div className="Posts">
                 <Post titulo={'Title of post'} contenu='contenu...' comments={789}/>
                 <Post titulo={'Title of post'} contenu='contenu...' comments={1}/>
                 <Post titulo={'Title of post'} contenu='contenu...' comments={0}/>
                 <Post titulo={'Title of post'} contenu='contenu...'/>
                 <Post titulo={'Title of post'} contenu='contenu...'/>
                 <Post titulo={'Title of post'} contenu='contenu...'/>
                 <Post titulo={'Title of post'} contenu='contenu...'/>
                 <Post titulo={'Title of post'} contenu='contenu...'/>
                 <Post titulo={'Title of post'} contenu='contenu...'/>
                 <Post titulo={'Title of post'} contenu='contenu...'/>


            </div>
         
            <Footer />
        </div>
       
    )
}

export default Home;