import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Switch, Routes, Route , Link} from 'react-router-dom';
import '../login/login.css';


function Cadastro () {

    const url = 'http://localhost:3000/user'

    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();


    const pegarDados = (nome, email, senha) => {
        return {
            nome : nome,
            email : email,
            senha : senha
        }
    }


    const cadastrar = () => {
        const dados = pegarDados(nome, email, password)
        if(dados.nome !== '' &&
           dados.email !== '' &&
           dados.senha !== ''
             )
            {

                fetch(url)
                .then((reponse) => reponse.json())
                .then((reponse) => {
                    const [...user] = reponse

                    const existName = user.filter(element => element.nome === dados.nome) 
                    const existEmail = user.filter(element => element.email === dados.email) 
                    const existPassword = user.filter(element => element.senha === dados.senha) 


                    if(existName.length === 0 && existEmail.length === 0 && existPassword.length === 0){
                                        fetch(url , {
                                            method: 'POST',
                                            body: JSON.stringify(dados),
                                            headers: {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json'
                                            }
                                        }).then((response) =>{
                                            getStatus(response.statusText)
                                        })
                                        .catch(() => {
                                            window.alert('Deu erro, tente novamente');
                                        })
                    }
                           
                });
            }
     
    }
    

    const getStatus = (status) =>{
        if(status === 'Created'){
            console.log('passou')
            window.location.href=`http://localhost:3001`;
        }
    }


    return(
        <div style={
            {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100vh' ,
                backgroundColor : '#866AE3'
                
            }
        }>


            <div className="formLogin"> 
                
                <div className="item foto">
                    <img src="https://consultoriaprebianchi.com.br/wp-content/uploads/2021/05/Lei-Geral-de-Prote%C3%A7%C3%A3o-de-Dados.png" alt="" />
                </div>
                <div className="item login">
                    <h1>
                        WELCOME
                    </h1>
                    <h2>cadstrar-se!</h2>
                    <form >
                            <div className="nome div-input" >
                                <input type="text"         
                                    placeholder="Nome"
                                    required
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </div>
                            <div className="email div-input" >
                            <img className="gmail" src="https://img.icons8.com/neon/96/null/experimental-filled-message-neon.png"/>        
                                <input type="email"         
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="password div-input">
                            <img className="key" src="https://img.icons8.com/ultraviolet/40/null/password.png"/>
                                <input type="password" 
                                    placeholder="Senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>  
                            <div className="div-entrar">
                                <input type="button" className="entrar"  value={'cadstrar'} onClick={cadastrar}/>
                            </div>  
                            <div className="div-input">
                                <p>já tem cadastro faça login? <Link to='/' >faça login </Link></p>
                            </div>                 
                    </form>
                </div>
            </div>
        </div>
    )

}

export default Cadastro;