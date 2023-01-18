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
        })
    }


    const deleteAutor = (id)=> {
        fetch(`http://localhost:3000/autor/${id}`, {
            method : 'DELETE',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => reloadAutores())
         
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
        } )
         
    }
    const reloadCategorias = () => {
        fetch('http://localhost:3000/categorias')
            .then((reponse) => reponse.json())
            .then((reponse) => {
                setCategorieData(reponse)
            })
    }

    const reloadAutores = () => {
        fetch('http://localhost:3000/autor')
            .then((reponse) => reponse.json())
            .then((reponse) => {
                setAutorData(reponse)
            })
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
                        })

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

                    <div>
                        <ul>
                            <li>
                                <Link to={'/'} onClick={logout}>sair</Link>
                            </li>
                        </ul>
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
