const { models: { User } } = require('rate-data')
const { validate }= require('rate-utils')

      /**
       * Retrieves users by geolocation respect a coordenates of id user.
       * 
       * @param {String} id User id to retrieve
       * 
       * @param {Number} distance Max distance to retrieve users
       * 
       * @throws {Error} user id is not found
       * @throws {Error} user location is not found
       * 
       * @throws {Error} user id is empty or blank
       * @throws {Error} user id is not a sring
       * 
       * @throws {Error} distance is empty or blank
       * @throws {Error} distance is not a number
       * 
       * @returns {Promise} Returns users in the range of distance
       * 
       */
module.exports = function (id, distance){
    validate.string(id,'id')
    validate.string(distance, 'distance')  

    const _distance = Number(distance)
    validate.number(_distance, 'distance') 

        return (async () => {            
            const user = await User.findOne({ _id: id}, { _id: 0, password: 0 } ).lean()
            if (!user) throw new Error(`user with id ${id} does not exist`)
            const _location = user.location
            if (user.location.coordinates[0] === 0 && user.location.coordinates[1] === 0 ) throw new Error('User location not found')
             

            if (!_location) throw new Error(`user location with id ${id} not found`)
            
            response = await User.find({ location: { $nearSphere: { $geometry: _location, $maxDistance: _distance } } })
        return response    
        })()    
}
