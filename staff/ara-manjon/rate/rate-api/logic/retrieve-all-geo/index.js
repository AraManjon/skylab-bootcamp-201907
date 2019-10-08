const { models: { User } } = require('rate-data')
const { validate }= require('rate-utils')

/**
* Retrieves users by geolocation respect a coordenates of id user.
* 
* @param {String} userId user id with location
* 
* @param {Number} distance max distance to retrieve users
* 
* @throws {Error} user id is not found
* 
* @throws {Error} user location is not found
* 
* @throws {Error} user id is empty or blank
* @throws {Error} user id is not a string
* 
* @throws {Error} distance is empty or blank
* @throws {Error} distance is not a string
* @throws {Error} _distance is not a number
*
* @throws {Error} if not found users near
* 
* @returns {Promise} return users in the range of distance from user
* 
*/

module.exports = function (userId, distance){

    validate.string(userId,'id')
    validate.string(distance, 'distance')  

    const _distance = Number(distance)
    validate.number( _distance, 'distance') 

    return (async () => {

        //find if user exist            
        const user = await User.findById(userId, { _id: 0, password: 0, __v: 0 } ).lean()
        
        //throw error if user not exist
        if (!user) throw new Error(`user with id ${userId} does not exist`)

        //location user
        const _location = user.location
        //throw error if user location is [0,0]
        if (user.location.coordinates[0] === 0 && user.location.coordinates[1] === 0 ) throw new Error('user location not found')
        

        //response = await User.find({ location: { $nearSphere: { $geometry: _location, $maxDistance: _distance } }}).lean()
        
        //find users by geolocation user and distance
        response = await User.find({ location: { $nearSphere: { $geometry: _location, $maxDistance: _distance } }}).populate('reviews').lean()
        if (!response) throw new Error('not users near')    
        
        //modificate each user retrieved
        response = response.map(user => {
 
            if(user._id.toString() !== userId){
                //clean user id 
                user.id = user._id.toString()
                delete user._id
                delete user.password
                delete user.__v

                //retrieve user rate from reviews
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
                //introduce average rate to user
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
