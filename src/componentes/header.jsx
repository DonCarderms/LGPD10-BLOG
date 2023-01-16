import React  from "react";


const Header = ({titulo, background, color, user, heigth}) => {
    return(
        <header style={{ 
            height : heigth,
            position : 'fixed',
            color : color,
            backgroundColor : background
             }}>
           <h1 style={{fontSize : '0.9em', textAlign : 'left' }}> {titulo} </h1>
           <p style={{ color : '#fff' , position : 'absolute', top : '25px', right : '100px'}}>{user}</p>
        </header>
    )
}


export default Header;