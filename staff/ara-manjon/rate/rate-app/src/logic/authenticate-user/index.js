import { validate } from 'rate-utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
* Authenticate a user by its credentials.
* 
* @param {string} email email introduced by user
* 
* @param {string} password password introduced by user
* 
* @throws {Error} incorrect values introduced
* 
*/

export default function (email, password) {

    validate.string(email, 'e-mail')
    validate.email(email, 'e-mail')
    validate.string(password, 'password')

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/auth`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        if (response.status === 200) {
            
            const { token, id } = await response.json()
            sessionStorage.id = id
            //return token
            this.__token__ = token
            return
        }

        const { error } = await response.json()

        throw Error(error)
    })()
}