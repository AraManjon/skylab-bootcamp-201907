const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (userIdToReview){

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