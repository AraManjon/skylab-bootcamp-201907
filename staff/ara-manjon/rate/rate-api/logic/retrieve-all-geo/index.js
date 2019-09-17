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
module.exports = function (userId, distance){
    validate.string(userId,'id')
    validate.string(distance, 'distance')  

    const _distance = Number(distance)
    validate.number(_distance, 'distance') 

        return (async () => {            
            const user = await User.findOne({ _id: userId}, { _id: 0, password: 0 } ).lean()
            if (!user) throw new Error(`user with id ${userId} does not exist`)
            const _location = user.location
            if (user.location.coordinates[0] === 0 && user.location.coordinates[1] === 0 ) throw new Error('User location not found')
             

            if (!_location) throw new Error(`user location with id ${userId} not found`)
            
            //response = await User.find({ location: { $nearSphere: { $geometry: _location, $maxDistance: _distance } }}).lean()
            
            response = await User.find({ location: { $nearSphere: { $geometry: _location, $maxDistance: _distance } }}).populate('reviews').lean()
            response = response.map(user => {
                if(user._id.toString() !== userId){
                //user    
                    user.id = user._id.toString()
                    delete user._id
                //review
                    const rate = user.reviews.map(review => {
                        review.id = review._id.toString()
                        return review.rate
                    })
                //retrieve average rate (number)
                    let averageRate = 0
                    if (rate.length > 0) {
                        averageRate = rate.reduce((previous, current) => current += previous) / rate.length
                    }
                    averageRate = averageRate.toFixed(2)

                    user.averageRate = averageRate
                    return user 
                }
            })
            response = response.filter(user=>{
            return user !== undefined
            })       
            return response    
        })()    
}
