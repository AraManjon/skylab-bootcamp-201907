import React from 'react'
import './index.sass'

 
function Hello({ goRegister }) {
  return <div className= "landing">
            <h1 className="landing__title">Hello</h1>
            <div className = "container-foot">
                <a href="#" className="container-form__title--medium" onClick={ event =>{
                  event.preventDefault()
                  goRegister()
                }}>Start to Rate</a>

            </div>
         </div>
}

export default Hello
