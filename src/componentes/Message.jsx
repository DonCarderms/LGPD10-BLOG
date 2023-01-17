import React  from "react";



const Message = ({status, msgError, msgSucces}) => {
  if(status !== undefined){
      if(status){
          return (
          <span
              style={
                  {
                      color : '#ff0000',
                      background : '#d1f075',
                      padding : '10px 20px',
                      margin : '10px'
                  }
              }
          >
              {msgError}
          </span>
          )
      }else{
          return (
              <span
              style={
                {
                    color : '#4caf50',
                    background : 'rgb(237 255 0)',
                    padding : '10px 20px',
                    margin : '10px'
                }
            }
              
              >
                  {msgSucces}
              </span>
          )
      }
  }
  
}

export default Message;