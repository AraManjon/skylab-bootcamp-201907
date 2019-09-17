import logic from '../../logic'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function () {
    let latitude, longitude
    navigator.geolocation.getCurrentPosition(function (position) {
        latitude = position.coords.latitude
        longitude = position.coords.longitude
        return update(longitude, latitude)       
    },
        function (error) {
            if (error.code === error.PERMISSION_DENIED) {
                alert('Not using geolocation heavily limits Rate functionality, please relaunch the application if you want to activate it')
                latitude = 0
                longitude = 0
                return update(longitude, latitude)               
            }
        })
}
async function update(longitude, latitude) {

    let response = await fetch(`${REACT_APP_API_URL}/geolocation`, {
        method: 'post',
        headers: { 'content-type': 'application/json', 'authorization': `bearer ${logic.__token__}` },
        body: JSON.stringify({longitude, latitude})
        
    })
    if (response.status !== 200) {
        const { error } = await response.json()
        throw Error(error)
    }
}
