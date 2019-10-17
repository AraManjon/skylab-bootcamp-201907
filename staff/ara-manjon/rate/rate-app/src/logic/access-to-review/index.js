import { validate } from 'rate-utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL
/**
* Access to review a user.
* 
* @param {string} userIdToReview user id
* 
* @throws {Error} incorrect id introduced
* 
*/
export default function (userIdToReview){

    validate.string(userIdToReview, 'id')

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/access-review/${userIdToReview}`,{
            method: 'post',
            headers: {
                authorization: `bearer ${this.__token__}`
            } 
        })
        if (response.status !== 200) {
            const { error } = await response.json()
            throw Error(error)
        }
    })()
}