import { validate } from 'rate-utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
* Retrieve a user by id.
* 
* @param {string} id user id
* 
* @throws {Error} incorrect id introduced
* 
*/

export default function (id) {

    validate.string(id, 'id')

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users/${id}`, {
            method: 'get',
            headers: {
                authorization: `bearer ${this.__token__}`
            }
        })
        
        if (response.status !== 200) {

             const { error } = await response.json()

             throw Error(error)
        }

        const { user } = await response.json()
    
        return user
     })()
}