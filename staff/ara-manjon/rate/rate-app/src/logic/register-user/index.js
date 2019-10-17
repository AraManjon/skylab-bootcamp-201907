import { validate } from 'rate-utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
 * Registers a user
 * 
 * @param {string} name name introduced by user
 * 
 * @param {string} surname surname introduced by user
 * 
 * @param {string} username username introduced by user
 * 
 * @param {string} email email introduced by user
 * 
 * @param {string} password password introduced by user
 * 
 * @throws {Error} 'KO' Error that is throw when API error has ocurried 
 * 
 * @returns agree new user in API
 */

export default function (name, surname, username, email, password) {
    

    validate.string(name,'name')
    validate.string(surname,'surname')
    validate.string(username,'username')
    validate.string(email,'email')
    validate.email(email,'email')
    validate.string(password,'password')
    validate.password(password,'password') 

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ name, surname, username, email, password })
        })
        if (response.status !== 201) {
            const { error } = await response.json()

            throw Error(error)
        }
    })()
}