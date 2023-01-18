import React, { useEffect, useState } from "react";
import './Modal.css';

const ModalPost =({id}) => {

    const [postagem , setPostagem ] = useState({})

    useEffect(() => {

        fetch(`http://localhost:3000/postagens/${id}`, {
            method : 'GET',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
        .then((res) => setPostagem((res)))
    }, [])


    const objectVazio = Object.values(postagem).length ===  0
    console.log(objectVazio)
    return(
        <div className="modal"> 
            
           <form>
                <div>

                    <label htmlFor="titulo">Titulo</label>
                    <input 
                    type="text"
                    name='titulo'
                    id="titulo"
                    value={postagem.titulo}
                    />
                </div>
                <div>
                    <label htmlFor="contenu">Contéudo do post</label>
                    <textarea 
                    type="text"
                    name="contenu"
                    id="contenu"
                    value={postagem.conteudo}
                    />
                </div>
                 <input className="editar" type="submit" value="editar" />
           </form>
        </div>
    )
}

export default ModalPost;