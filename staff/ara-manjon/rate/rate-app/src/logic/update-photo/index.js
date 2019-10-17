
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
* Update user image.
* 
* @param {Buffer} image 
* 
* @throws {Error} if userId is not a string or file is not a object
*  
*/

export default function (image) {

    var formData = new FormData();
    
    formData.append('image', image);

    return (async () => {
       
        const response = await fetch(`${REACT_APP_API_URL}/users/upload`, {
            method: 'post',
            headers: {
                'authorization': `bearer ${this.__token__}`
            },
            body: formData
        })
        
        if (response.status !== 200) {
            const { error } = await response.json()
            throw new Error(error)
        } 
        const { message } = await response.json()
        return message
    })()
}


