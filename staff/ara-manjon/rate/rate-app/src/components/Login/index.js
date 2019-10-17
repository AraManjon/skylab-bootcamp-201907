import React from 'react'

export default function ({ goRegister, onLogin }) {
    return <>
    <div className= "landing">

        <h1 className="landing__title--form">Activate RATE</h1>

        <form className= "container-form" onSubmit={event => {
            event.preventDefault()

            const { target: { email: { value: email }, password: { value: password } } } = event

            onLogin(email, password)
        }}>
            <div className= "form-text">
                <input className= "inpt" type="email" name="email" placeholder="Name@email.com"/>
                <label for="youridhere" className= "static-inpt">Email</label>
            </div>

            <div className= "form-text--end">
                <input className= "inpt" type="password" name="password" placeholder="Required"/>
                <label for="youridhere" className= "static-inpt">Password</label>
            </div>
           
        <button className="container-form__title--medium">Sign in</button>
           
        </form>
        <p className= "container-form__title--slim">Create an account</p><a className= "container-form__title--little" href="#" onClick={event => {
            event.preventDefault()

            goRegister()
        }}>Sign up</a>

        {/* <div className="container-foot">
        </div> */}

        </div> 
    </>
}