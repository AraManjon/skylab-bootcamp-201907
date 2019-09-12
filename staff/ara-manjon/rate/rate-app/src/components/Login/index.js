import React from 'react'

export default function ({ goRegister, onLogin }) {
    return <>
        <h2>Login</h2>
        <form onSubmit={event => {
            event.preventDefault()

            const { target: { email: { value: email }, password: { value: password } } } = event

            onLogin(email, password)
        }}>
            <input type="email" name="email" />
            <input type="password" name="password" />
            <button>Proceed</button>
        </form>
        <a href="#" onClick={event => {
            event.preventDefault()

            goRegister()
        }}>Go register</a>
    </>
}