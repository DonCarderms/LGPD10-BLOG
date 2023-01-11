import React from "react";

function Post ({titulo, contenu, comments, height}) {
    const comment = comments === undefined || 0 ? 0 : comments
    const quantidadeComments = comment > 1 ? 'comentarios' : 'comentario';
    return(
        <div 
            id="content" 
            style={{
                height: height,
                display :'flex',
                justifyContent : 'space-between',
                height : '20px',
                padding: '20px',
                background: '#e6e6e6',
                marginTop: '20px',
                cursor : 'pointer'
            }}
        
        >
            <h2 
                style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: 'rgba(0, 0, 0, 0.7)'
                }}
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
                    fontSize : '1.2em'
                }}
             > {comment} {quantidadeComments} <img src="https://img.icons8.com/material-outlined/24/null/comments--v1.png"/></span>

            </div>
        </div>

    )
}

export default Post;