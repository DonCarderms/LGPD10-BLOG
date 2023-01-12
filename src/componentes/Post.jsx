import React, {useEffect, useState} from "react";
import './post.css';

function Post ({titulo, contenu, comments, height, autor, maxwidth}) {
    const comment = comments === undefined || 0 ? 0 : comments
    const quantidadeComments = comment > 1 ? 'comentarios' : 'comentario';

    const [nomeAutor, setNomeAutor] = useState()


useEffect(() =>{

    fetch(`http://localhost:3000/autor/${autor}`, {
        method : 'GET',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then((reponse) => reponse.json())
    .then((reponse) => setNomeAutor(reponse.nome))     
})

    return(
        <div 
            id="content" 
            style={{
                position : 'relative',
                height: height,
                maxWidth : maxwidth,
                display :'flex',
                justifyContent : 'space-between',
                padding: '20px',
                background: '#e6e6e6',
                marginTop: '5px',
                cursor : 'pointer'
            }}
        
        >
            <h2 
                style={{
                    fontSize: '0.9em',
                    fontWeight: 'bold',
                    color: 'rgba(0, 0, 0, 0.7)'
                }}
                className="title"
            > {titulo}</h2>
            <p> {contenu} </p>
            <div
                style={{
                    textAlign :'right'
                }}
            >
            <span 
             className="comments"
                style={{
                    fontSize : '0.9rem'
                }}
             > {comment} {quantidadeComments} <img width={'12'}src="https://img.icons8.com/material-outlined/24/null/comments--v1.png"/></span>
             
            </div>

            <p style={{
                    fontSize: '0.8rem',
                    position: 'absolute',
                    bottom: '0'
            }}> <span style={{ fontWeight : '600' }}>Autor:</span>  <i>{nomeAutor}</i> </p>

        </div>

    )
}

export default Post;