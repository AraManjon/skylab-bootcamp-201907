const { models: { User } } = require('rate-data')
const { validate }= require('rate-utils')
      /**
       * Retrieves users by geolocation respect a coordenates of id user.
       * 
       * @param {string} id The id its given by authenticateUser
       * 
       * @returns {Promise}
       * 
       */
module.exports = function (id, distance){
    validate.string(id,'id')   
        return (async () => {            
            const user = await User.findOne({ _id: id}, { _id: 0, password: 0 } ).lean()
            if (!user) throw new Error(`user with id ${id} not found`)
            const _location = user.location.coordinates
            //const { location: { coordinates: shh } } = user

            if (!_location) throw new Error(`user location with id ${id} not found`)
            
            const response = await User.find({ location: { $nearSphere: { $geometry: { type: "Point", coordinates: [ 2.1894, 41.403 ] }, $maxDistance: distance } } })
        return response    
        })()    
}