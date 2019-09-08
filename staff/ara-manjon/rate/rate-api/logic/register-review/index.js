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
 * @returns {Promise} on correct acces returns a promise
 */

module.exports = function (UserId, UserIdtoReview, comment, rate) {

     validate.string(UserId, 'id')
     validate.string(UserIdtoReview, 'id')
     validate.string(comment, 'comment')
     validate.number(rate, 'rate')

     const date = new Date().toString()
     /* validate.date(date, 'date') */

    return (async () => {

        const user = await User.findOne({ _id: UserIdtoReview})
        if (!user) throw new Error(`user with id ${UserIdtoReview} does not exist`)
        await Review.create({comment, rate, date, author: UserId, owner: UserIdtoReview})
        
        user.reviews.push(review.id)
        await user.save()

    })()
} 