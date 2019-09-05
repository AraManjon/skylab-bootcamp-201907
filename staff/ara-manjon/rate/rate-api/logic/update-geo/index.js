const { models: { User } } = require('rate-data')
const { validate }= require('rate-utils')

/**
 * Updates a user geolocation.
 * 
 * @param {string} id
 * @param {Object} data
 * 
 * @returns {Promise}
 */



module.exports = function (id, longitude, latitude) {
     validate.string(id, 'id')
     validate.number(longitude, 'longitude')
     validate.number(latitude, 'latitude')

     const location= {type: 'Point', coordinates: [longitude, latitude]}

    return (async () => {
        const user = await User.findById(id)
        if (!user) throw new Error(`user with id ${id} does not exist`)
        await User.updateOne({_id:id},{$set:location})
    })()
}
