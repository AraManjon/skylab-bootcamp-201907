const { models: { User,Review } } = require('rate-data')
const { validate }= require('rate-utils')

/**
 * Retrieve a user profile.
 * 
 * @param {String} UserId user id to access a revies
 *
 * @throws {Error} user id is empty or blank
 * 
 * @throws {Error} user id is not a string
 * 
 * @throws {Error} user with id does not exist
 * 
 * @returns {Promise} returns a user profile and reviews
 */

module.exports = function (id){
    validate.string(id,'id')
    
        return (async () => {         
            const user= await User.findOne({ _id: id}, { __v: 0, password: 0 } ).lean()
            if (!user) throw new Error(`user with id ${id} does not exist`)
            user.id = id
            delete user._id            
            let reviewsUserId = user.reviews.map(review=>review._id.toString())
            
            let reviewsUserComplete = await Promise.all(reviewsUserId.map( async (reviewUserId) =>{
                let review = await Review.find({_id: reviewUserId}, {__v: 0}).lean()
                review[0].owner.id = review[0].owner._id.toString()
                delete review[0].owner._id
                
                review[0].id = review[0]._id.toString()
                delete review[0]._id
                return review
            }))

            let reviewsRate = reviewsUserComplete.map(review => review[0].rate)
            
            let reviewsAuthorId = reviewsUserComplete.map(review =>{                
                review[0].author.id = review[0].author[0]._id.toString()
                delete review[0].author[0]._id.toString()              
                 return review[0].author.id
                })
          
            let authorComplete = await Promise.all(reviewsAuthorId.map(async (authorId) =>{              
                let author = await User.findById(authorId, {__v: 0, password: 0}).lean()                
                author.id = author._id.toString()              
                delete author._id
                return author
            }))
            let averageRate
            if(reviewsRate.length > 1) averageRate= reviewsRate.reduce((previous, current) => current += previous ) / reviewsRate.length
            else {averageRate = 0}
            
            return {user, averageRate, reviewsUserComplete, authorComplete}

            })()    
}