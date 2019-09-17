import React from 'react'
import './index.sass'

export default function ({ goLogin, onRegister }) {
    return <>
        <div className= "landing">
        <h1 className="landing__title--form">Account</h1>
        
        <form className= "container-form" id= "form1" onSubmit={event => {
            event.preventDefault()

            const { target: { name: { value: name }, surname: { value: surname }, username: { value: username },email: { value: email }, password: { value: password } } } = event

            onRegister(name, surname, username, email, password)
        }}>
            <div className= "form-text">
                <input className= "inpt" type="text" name="name" placeholder="Enter your name"/>
                <label for="youridhere" className= "static-inpt">Name</label>
            </div>
            <div className= "form-text">
                <input className= "inpt" type="text" name="surname" placeholder="Enter your surname"/>
                <label for="youridhere" className= "static-inpt">Surname</label>
            </div>

            <div className= "form-text">
                <input className= "inpt" type="text" name="username" placeholder="Enter an username"/>
                <label for="youridhere" className= "static-inpt">Username</label>
            </div>

            <div className= "form-text">
                <input className= "inpt" type="email" name="email" placeholder="Name@email.com"/>
                <label for="youridhere" className= "static-inpt">Email</label>
            </div>

            <div className= "form-text--end">
                <input className= "inpt" type="password" name="password" placeholder="Required"/>
                <label for="youridhere" className= "static-inpt">Password</label>
            </div>
            <button></button>

        </form>
        <p className= "container-form__title--slim">You have an account?</p><a className= "container-form__title--little" href="#" onClick={event => {
            event.preventDefault()

            goLogin()
        }}>Sign in</a>

        <div className="container-foot">
        <button type="submit" className="container-foot__title--medium" form="form1">Sign up</button>
        </div>
        
        </div> 
    </>
}

// .inpt
//     border-top: 0.07rem solid $color-white
//     background-color: none 
//     height: 60px
//     @extend %button-none
//     @extend %text-link
//     text-align: left
//     color: $color-white
//     font-size: 1.3rem

// .inpt[text=text]
//     color: $color-white
// .inpt[type=submit]
//     color: $color-white
// \::placeholder
//     color: $color-white