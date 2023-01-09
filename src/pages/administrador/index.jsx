import { List } from "dom";
import React,{useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import './style.css'


function Admin () {
    const existToken = sessionStorage.getItem('AdmSession')
    const existTokenLogado = localStorage.getItem('AdmLogado')

    const [autores, setAutores] = useState(false)
    const [categorias, setCategorias] = useState(false)

    const showAutores  = () =>{
            setAutores(true)
            setCategorias(false)
    }
    const showCategorias  = () =>{
        setCategorias(true)
            setAutores(false)
    }

    if(!existToken){
        if(!existTokenLogado){
                window.location.href=`http://localhost:3001`;
        }
    }else{
        localStorage.setItem('AdmLogado', existToken)
    }
   
    const logout = () => {
        if(existToken && existTokenLogado){
            sessionStorage.clear();
            localStorage.clear();
        }
    }
    return(
        <div className="admin-dashboard">
            <header className="">
                <div>
                    <h1>Blog Dashboard</h1>
                </div>
                <div>
                    <h3>Administrador</h3>
                </div>
            </header>
            <div style={{ 
                height : 'calc(100% - 100px)',
                display :'flex'
             }}>

                <nav>
                    <div>
                        <ul onClick={showAutores}>
                            <li><a to={''} >autores</a></li>
                        </ul>
                        <ul onClick={showCategorias}>
                            <li><a to={''} >categorias</a></li>
                        </ul>
                    </div>

                    <div>
                        <ul>
                            <li>
                                <Link to={'/'} >sair</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <main>
                    {
                        autores && (

                    <div>

                        <div >
                                <button className="new-autor">Cadstrar novo autor</button>
                        </div>
                        <div className="div-table">
                                <table>
                                    <thead>
                                        <tr style={{
                                            height : '50px'
                                        }}>
                                            <th>nome do autor</th>
                                            <th>email do autor</th>
                                            <th>Quantidade de Post</th>
                                        </tr>             
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>autor 1</td>
                                            <td>email 1</td>
                                            <td style={{
                                                textAlign : 'center'
                                            }}> 89 post</td>
                                        </tr>
                                        <tr>
                                            <td>autor 2</td>
                                            <td>email 2</td>
                                            <td style={{
                                                textAlign : 'center'
                                            }}>45 post</td>
                                        </tr>
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
                                <button className="new-autor">Cadstrar novo categoria</button>
                        </div>
                        <div className="div-table">
                                <table>
                                    <thead>
                                        <tr style={{
                                            height : '50px'
                                        }}>
                                            <th>nome do categorias</th>
                                            <th>email do autor</th>
                                            <th>Quantidade de Post</th>
                                        </tr>             
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>autor 1</td>
                                            <td>email 1</td>
                                            <td style={{
                                                textAlign : 'center'
                                            }}> 89 post</td>
                                        </tr>
                                        <tr>
                                            <td>autor 2</td>
                                            <td>email 2</td>
                                            <td style={{
                                                textAlign : 'center'
                                            }}>45 post</td>
                                        </tr>
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

export default Admin;
