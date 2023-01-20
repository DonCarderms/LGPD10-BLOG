import { List } from "dom";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.css'


function Admin() {
    const existToken = sessionStorage.getItem('AdmSession')
    const existTokenLogado = localStorage.getItem('AdmLogado')

    const [autores, setAutores] = useState(false)
    const [categorias, setCategorias] = useState(false)


    const [categorieData, setCategorieData] = useState([])
    const [autorData, setAutorData] = useState([])

    const showAutores = () => {
        setAutores(true)
        setCategorias(false)
    }

    const showCategorias = () => {
        setCategorias(true)
        setAutores(false)
    }


    if (!existToken && !existTokenLogado) {
        window.location.href = `http://localhost:3001`;
    } else {
        localStorage.setItem('AdmLogado', existToken)
    }



    const [nameAutor, setNameAutor] = useState('')
    const [emailAutor, setEmailAutor] = useState('@gmail.com')
    const [PasswordAutor, setPasswordAutor] = useState('')

    const [categorieName, setCategorieName] = useState('')

    const Newautor = (nameAutor, emailAutor, PasswordAutor) => {
        return {
            nome: nameAutor,
            email: emailAutor,
            senha: PasswordAutor
        }
    }


    const newCategoria = (nome) => {
        return {
            nome: nome
        }
    }

    const cadstrarCategoria = (e) => {
        e.preventDefault()
        const dados = newCategoria(categorieName)
        if(dados.nome.length > 0){

            fetch('http://localhost:3000/categorias', {
                method: 'POST',
                body: JSON.stringify(dados),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                reloadCategorias()
                setCategorieName('')
            }).catch((error) => console.log(error))
        }
    }


    const deleteAutor = (id)=> {
        fetch(`http://localhost:3000/autor/${id}`, {
            method : 'DELETE',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => reloadAutores())
        .catch((error) => console.log(error))
         
    }


    const deleteCategoria = (id)=> {
        fetch(`http://localhost:3000/categorias/${id}`, {
            method : 'DELETE',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            reloadCategorias()
        } ).catch((error) => console.log(error))
         
    }
    const reloadCategorias = () => {
        fetch('http://localhost:3000/categorias')
            .then((reponse) => reponse.json())
            .then((reponse) => {
                setCategorieData(reponse)
            }).catch((error) => console.log(error))
    }

    const reloadAutores = () => {
        fetch('http://localhost:3000/autor')
            .then((reponse) => reponse.json())
            .then((reponse) => {
                setAutorData(reponse)
            }).catch((error) => console.log(error))
    }

    useEffect(() => {
        if (!autores) return;
        reloadAutores()
    }, [autores])

    useEffect(() => {
        if (!categorias) return;
        reloadCategorias()
    }, [categorias])

    const cadastrarAutor = (e) => {
        e.preventDefault()

        const dados = Newautor(nameAutor, emailAutor, PasswordAutor)

        if (dados.nome !== '' && dados.email !== '' && dados.senha !== '') {
            fetch('http://localhost:3000/autor')
                .then((reponse) => reponse.json())
                .then((reponse) => {
                    const [...autor] = reponse

                    const existName = autor.filter(element => element.nome === dados.nome)
                    const existEmail = autor.filter(element => element.email === dados.email)
                    const existPassword = autor.filter(element => element.senha === dados.senha)

                 

                    if (existName.length === 0 && existEmail.length === 0 && existPassword.length === 0) {
                        
                        fetch('http://localhost:3000/autor', {
                            method: 'POST',
                            body: JSON.stringify(dados),
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
                        }).then(() => {
                            reloadAutores()
                            setNameAutor('')
                            setPasswordAutor('')
                            setEmailAutor('@gmail.com')
                        }).catch((error) => console.log(error))

                    }
                })



        }
    }

    window.onbeforeunload = function() {
        if (existToken && existTokenLogado) {
            sessionStorage.clear();
            localStorage.clear();
        }
        return '';
        
      };
    
    const logout = () => {
        if (existToken && existTokenLogado) {
            sessionStorage.clear();
            localStorage.clear();
        }

        window.location.href = `http://localhost:3001`;
    }

    return (
        <div className="admin-dashboard">
            <header className="heeader-app">
                <div>
                    <h1>Blog Dashboard</h1>
                </div>
                <div>
                    <h3>Administrador <img src="." alt="" /></h3>
                </div>
            </header>
            <div style={{
                height: 'calc(100% - 100px)',
                display: 'flex'
            }}>

                <nav>
                    <div>
                        <ul onClick={showAutores}>
                            <li><a >autores</a></li>
                        </ul>
                        <ul onClick={showCategorias}>
                            <li><a >categorias</a></li>
                        </ul>
                    </div>

                    <div style={{textAlign : 'center'}} onClick={logout}>     
                                <Link to={'/'} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M15 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11985 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H15M10 7L15 12M15 12L10 17M15 12L3 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>       
                                 </Link>
                    </div>
                </nav>
                <main>
                    {
                        autores && (

                            <div>

                                <div >
                                    <form >
                                        <input type="submit" className="new-autor" onClick={(e) => cadastrarAutor(e)} value="Cadastrar novo autor" />
                                        <input
                                            type="text"
                                            placeholder="nome"
                                            value={nameAutor}
                                            onChange={(e) => setNameAutor(e.target.value)}
                                            required
                                        />
                                        <input
                                            type="email"
                                            placeholder="email"
                                            autoComplete="off"
                                            value={emailAutor}
                                            onChange={(e) => setEmailAutor(e.target.value)}
                                            required
                                        />
                                        <input
                                            type="password"
                                            placeholder="senha"
                                            autoComplete="off"
                                            value={PasswordAutor}
                                            onChange={(e) => setPasswordAutor(e.target.value)}
                                            required
                                        />

                                    </form>
                                </div>
                                <div className="div-table">
                                    <table>
                                        <thead>
                                            <tr style={{
                                                height: '50px'
                                            }}>
                                                <th>nome do autor</th>
                                                <th>email do autor</th>
                                                <th>Quantidade de Post</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                autorData.map((autor, i) => {
                                                    
                                                    return (
                                                        <tr key={i}>
                                                            <td>{autor.nome}</td>
                                                            
                                                            <td>{autor.email}</td>
                                                            <td style={{
                                                                textAlign: 'center'
                                                            }}> <QuantidadePost autor_id={autor.id}/></td>
                                                             <td>
                                                                <button style={{ background : '#fff', border : 0 }}>
                                                                   
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button 
                                                                value={autor.id} 
                                                                style={{
                                                                    backgroundImage: 'url("https://img.icons8.com/ios-glyphs/30/null/delete-forever.png")' , 
                                                                    border : 0,
                                                                    backgroundRepeat : 'no-repeat',
                                                                    backgroundPosition : 'center'
                                                                  }} 
                                                                 onClick={(e) => deleteAutor(e.target.value)}>
                                                                    
                                                                </button>
                                                            </td>                                                           
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    }
                    {
                        categorias && (

                            <div>

                                <div >
                                    <form action="">
                                        <input type="submit" value="Cadastrar novo categoria" className="new-autor" onClick={(e) => cadstrarCategoria(e)} />
                                        <input
                                            type="text"
                                            placeholder="nome"
                                            value={categorieName}
                                            onChange={(e) => setCategorieName(e.target.value)}
                                            required
                                        />

                                    </form>
                                </div>
                                <div className="div-table">
                                    <table>
                                        <thead>
                                            <tr style={{
                                                height: '50px'
                                            }}>
                                                <th>Categorias</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                categorieData.map((item, i) => {
                                                    return (

                                                        <tr key={i}>
                                                            <td>{item.nome}</td>
                                                            <td>
                                                                    <button style={{ background : '#fff', border : 0 }}>
                                                                        
                                                                    </button>
                                                            </td>
                                                            <td>
                                                                <button
                                                                 value={item.id} 
                                                                 style={{
                                                                    backgroundImage: 'url("https://img.icons8.com/ios-glyphs/30/null/delete-forever.png")' , 
                                                                    border : 0,
                                                                    backgroundRepeat : 'no-repeat',
                                                                    backgroundPosition : 'center'
                                                                  }} 
                                                                 
                                                                 onClick={(e) => deleteCategoria(e.target.value)}>

                                                                    
                                                                </button>
                                                            </td>
                                                        </tr>

                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )
                    }
                </main>
            </div>

        </div>
    )
}

export const QuantidadePost = ({autor_id}) =>{
    const [quantidadePost, setQuantidadePost] = useState(0)
    const loadQtdPost =()=>{
        fetch(`http://localhost:3000/postagens`)
        .then((res) => res.json())
        .then((res) => setQuantidadePost(res.filter((post) => post.autor_id === `${autor_id}`).length))
        .catch((error) => console.log(error))
    }

    useEffect(() => {
        loadQtdPost()
    }, [autor_id])

    return(
        <span>
            
            {
                quantidadePost > 1
                ? quantidadePost + ' Posts'
                 
                :quantidadePost + ' Post'
            }
        </span>
    )
}



export default Admin;
