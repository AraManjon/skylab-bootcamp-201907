import React from 'react'

export default function ({ onBack, onRegister }) {
    return <>
        <h2>Register</h2>
        <form onSubmit={event => {
            event.preventDefault()

            const { target: { name: { value: name }, surname: { value: surname }, username: { value: username },email: { value: email }, password: { value: password } } } = event

            onRegister(name, surname, username, email, password)
        }}>
            <input type="text" name="name" />
            <input type="text" name="surname" />
            <input type="text" name="username" />
            <input type="email" name="email" />
            <input type="password" name="password" />
            <button>Proceed</button>
        </form>
        <a href="#" onClick={event => {
            event.preventDefault()

            onBack()
        }}>Go back</a>
    </>
}