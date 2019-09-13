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
                let [review] = await Review.find({_id: reviewUserId}, {__v: 0}).lean()
                review.owner.id = review.owner._id.toString()
                delete review.owner._id
                
                review.id = review._id.toString()
                delete review._id
                return review
            }))

            let reviewsRate = reviewsUserComplete.map(review => review.rate)
            

            let reviewsAuthorId= reviewsUserComplete.map(review =>{
                 review.author.id = review.author._id.toString()
                 delete review.author._id.toString()
                 return review.author
                })
                
            let authorComplete = await Promise.all(reviewsAuthorId.map(async (authorId) =>{
                let author = await User.find({_id: authorId.id}, {__v: 0, password: 0}).lean()
                author[0].id = author[0]._id.toString()
               
                delete author[0]._id
                return author[0]

            }))
            let averageRate
            if(reviewsRate.length > 1) averageRate= reviewsRate.reduce((previous, current) => current += previous ) / reviewsRate.length
            else {averageRate = 0}
            
            return {user, averageRate, reviewsUserComplete, authorComplete}

            })()    
}