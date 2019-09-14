const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function () {
    /* let latitude, longitude, users
    const disctance = '1000'

    navigator.geolocation.getCurrentPosition(function (position) {
        latitude = position.coords.latitude
        longitude = position.coords.longitude
        return (async () => {
            const { results: users } = await retrieve(distance,longitude, latitude)
            callback(users)
        })()
    },
        function (error) {
            if (error.code === error.PERMISSION_DENIED) {
                alert('Not using geolocation heavily limits Rate functionality, please relaunch the application if you want to activate it')
                latitude = 0
                longitude = 0
                return (async () => {
                    return await search(distance, longitude, latitude)
                })()
            }
        })
    return dogs
}
async function retrieve(distance, longitude, latitude) {
    let response = await fetch(`${REACT_APP_API_URL}/geolocation/${distance}`, {
        method: 'get',
        headers: {
            authorization: `bearer ${this.__token__}`
        },
    })
    if (response.status !== 200) {
        const { error } = await response.json()
        throw Error(error)
    }
    const _response = await response.json()
    return _response */
}