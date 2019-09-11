const { models: { User,Review } } = require('rate-data')
const { validate }= require('rate-utils')
const moment = require('moment')

/**
 * Register a review.
 * 
 * @param {String} UserId user id to access a revies
 * 
 * @param {String} UserIdtoReview user id to check reviews
 *
 * @param {String} data the fiels to add in the review
 *  
 * @throws {Error} user id is empty or blank
 * 
 * @throws {Error} user id is not a string
 * 
 * @throws {Error} user with id does not exist
 * 
 * @throws {Error} user have already rate
 * 
 * @returns {Promise} on correct registed review returns a promise
 */

module.exports = function (UserId, UserIdtoReview, comment, rate) {
    if(rate === undefined ) throw new Error('you should to rate to add a comment')
    if(rate > 5 || rate < 1) throw new Error('you should to add a correct number')

    const date = new Date().toString()
    
    validate.string(date, 'date')
     validate.string(UserId, 'id')
     validate.string(UserIdtoReview, 'id')
     validate.number(rate, 'rate')
     
     
     
     return (async () => {


        const user = await User.findOne({ _id: UserIdtoReview })

        if (!user) throw new Error(`user with id ${UserIdtoReview} does not exist`)
        const review = await Review.create({comment, rate, date, author: UserId, owner: UserIdtoReview})
        
        user.reviews.push(review.id)
        await user.save()

    })()
} 