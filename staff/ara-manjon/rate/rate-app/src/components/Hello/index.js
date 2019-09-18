import React from 'react'
import './index.sass'

 
function Hello({ goRegister }) {
  return <div className= "landing">
            <h1 className="landing__title">Hello</h1>
            <div className = "container-foot">
              <label className= "switch" for="checkbox">
                <input id= "checkbox" type="checkbox" onChange={ event =>{
                  
                  goRegister()
                }}/>
                <div className="slider"></div>
              </label>
            </div>
         </div>
}

export default Hello
