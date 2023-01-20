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
        .catch((error) => console.log(error))
    }, [])


    const handleEditTitle = (e) => {
        setPostagem({
            ...postagem,
            titulo : e.target.value
        }
        )
    }

    const handleEditContentPost = (e) => {
        setPostagem({
            ...postagem,
            conteudo : e.target.value
        })
    }

    const editPost = () => {
        fetch(`http://localhost:3000/postagens/${postagem.id}` , {
            method: 'PUT',
            body: JSON.stringify(postagem),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).catch(() => {
            window.alert('Deu erro, tente novamente');
        })
    }

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
                    onChange={(e) => handleEditTitle(e)}
                    />
                </div>
                <div style={{ width : '100%'}}>
                    <label htmlFor="contenu">Contéudo do post</label>
                    <textarea 
                    type="text"
                    name="contenu"
                    id="contenu"
                    value={postagem.conteudo}
                    onChange={(e) => handleEditContentPost(e)}
                    />
                </div>
                 <input className="editar" type="submit" value="editar" onClick={editPost}/>
           </form>
           <div className="bardiv">
               <span className="bara1"></span>
               <span className="bara2"></span>
           </div>
        </div>
    )
}

export default ModalPost;