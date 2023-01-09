import React, { useState} from "react";
import { Link } from "react-router-dom";

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
    

    if(!existToken){
        if(!existTokenLogado){
              goToLogin();  
        }
    }else{
        localStorage.setItem('logado', existToken)
        sessionStorage.setItem('user', user)
    }

  let username = user
    if(!user){
        username  = localStorage.getItem('user')
    }

    return(
        <div>
            <h1>chegou no Home {username} {props.nome}</h1>     
        </div>
    )
}

export default Home;