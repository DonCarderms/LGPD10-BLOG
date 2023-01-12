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
            height: '10px',
            position: 'fixed',
            width: '100%'
         }}
         >
            <h3>Copy © 2023 Blog LGPD</h3>
         </div>
    )
} 

export default Footer;