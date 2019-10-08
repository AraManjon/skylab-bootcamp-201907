const { models: { User } } = require('rate-data')
const { validate }= require('rate-utils')

/**
 * Updates a user geolocation.
 * 
 * @param {string} id user id
 * 
 * @param {string} longitude longitude given by geolocation user
 * 
 * @param {string} latitude latitude given by geolocation user
 * 
 * @throws {Error} user id is empty or blank
 * 
 * @throws {Error} user id is not a string
 * 
 * @throws {Error} user with id does not exist
 * 
 * @throws {Error} longitude is not a number
 * 
 * @throws {Error} latitude is not a number
 * 
 * @returns {Promise} 
 */



module.exports = function (id, longitude, latitude) {

     validate.string(id, 'id')
     validate.number(longitude, 'longitude')
     validate.number(latitude, 'latitude')

     const location= {type: 'Point', coordinates: [longitude, latitude]}

    return (async () => {

        const user = await User.findById(id, { password: 0, __v: 0 })
        if (!user) throw new Error(`user with id ${id} does not exist`)

        user.location = location
        user.location.id = user.location._id
        delete user.location._id
        
        await user.save()
        
    })()
}
