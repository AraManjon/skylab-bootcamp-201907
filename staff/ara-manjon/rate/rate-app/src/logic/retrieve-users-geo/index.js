import logic from '../../logic'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

/**
* Retrieve a users geolocation.
* 
*/

export default function (callback) {
     let latitude, longitude, users
     let distance = '100'

    navigator.geolocation.getCurrentPosition(function (position) {
        latitude = position.coords.latitude
        longitude = position.coords.longitude
        return (async () => {
            const results = await retrieve(distance,longitude, latitude)
       
            callback(results.users)
        })()
    },
        function (error) {
            if (error.code === error.PERMISSION_DENIED) {
                alert('Not using geolocation heavily limits Rate functionality, please relaunch the application if you want to activate it')
                latitude = 0
                longitude = 0
                return (async () => {
                    return await retrieve(distance, longitude, latitude)
                })()
            }
        })
    return users
}
async function retrieve(distance, longitude, latitude) {
    let response = await fetch(`${REACT_APP_API_URL}/geolocation-users/${distance}`, {
        method: 'post',
        headers: { 'content-type': 'application/json','authorization': `bearer ${logic.__token__}`},
        body: JSON.stringify({ location:[longitude, latitude ]})

    })
    if (response.status !== 200) {
        const { error } = await response.json()
        throw Error(error)
    }
    const _response = await response.json()
    return _response 
}