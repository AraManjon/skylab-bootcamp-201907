import { validate } from 'rate-utils'

const REACT_APP_API_URL = process.env.REACT_APP_API_URL
/**
* Register a review to user by id.
* 
* @param {string} userIdToReview user id
* 
* @param {string} comment comment to user
* 
* @param {string} rate rate to user
* 
* @throws {Error} incorrect values introduced
* 
*/
export default function (userIdToReview, comment, rate){
    validate.string(userIdToReview, 'id')

    return (async () => {
    const response = await fetch(`${REACT_APP_API_URL}/review/${userIdToReview}`,{
        method: 'post',
        headers: { 'content-type': 'application/json', 'authorization': `bearer ${this.__token__}` },
        body: JSON.stringify({comment, rate})
    })
    if (response.status !== 200) {
        const { error } = await response.json()
        throw Error(error)
    }
})()
}