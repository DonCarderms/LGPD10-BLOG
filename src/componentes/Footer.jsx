import React from "react";

function Footer () {
    return(
        <div 
         id="footer"
         style={{
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center',
            bottom: '0',
            left: '0',
            height: '40px',
            position: 'fixed',
            width: '100%'
         }}
         >
            <h2>Copy © 2023 Blog LGPD</h2>
         </div>
    )
} 

export default Footer;