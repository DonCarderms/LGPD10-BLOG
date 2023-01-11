import React  from "react";


const Header = ({titulo, background, color, user}) => {
    return(
        <header style={{ 
            position : 'fixed',
            width :'100%',
            color : color,
            backgroundColor : background
             }}>
           <h1> {titulo} </h1>
        {/* <img src="" alt="image" /> */}
        <p style={{ color : '#fff' }}>{user}</p>
        </header>
    )
}


export default Header;