import React  from "react";


const Header = ({titulo, background, color, user, heigth}) => {
    return(
        <header style={{ 
            height : heigth,
            position : 'fixed',
            width :'100%',
            color : color,
            backgroundColor : background
             }}>
           <h1 style={{fontSize : '0.9em', textAlign : 'left' }}> {titulo} </h1>
        {/* <img src="" alt="image" /> */}
        <p style={{ color : '#fff' , }}>{user}</p>
        </header>
    )
}


export default Header;