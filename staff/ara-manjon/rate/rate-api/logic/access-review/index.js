const { models: { User,Review } } = require('rate-data')
const { validate }= require('rate-utils')
const moment = require('moment')

/**
 * Access a review.
 * 
 * @param {String} UserId user id to access a revies
 * 
 * @param {String} UserIdtoReview user id to check reviews
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

module.exports = function (UserId, UserIdtoReview) {

    validate.string(UserId, 'id')
    validate.string(UserIdtoReview, 'id')

    return (async () => {

        //find user to review
        const user = await User.findOne({ _id: UserIdtoReview}, { password: 0, __v: 0 }).populate('reviews').lean()
        if (!user) throw new Error(`user with id ${UserIdtoReview} does not exist`)
        //clean user id
        user.id = user._id.toString()
        delete user._id 
        

        let reviewsUser= user.reviews.map(review=>{
            //clean user review
            review.id = review._id.toString()
            delete review._id

            //clean user review author
            review.author.id = review.author._id.toString()
            delete review.author._id
            delete review.author.__v
            return user
        })

        //checks if user just reviwed 
        reviewsUser.forEach((item, index) => {

            if(item.reviews[index].author.id === UserId){
                const createAt= moment(item.date)
                const getValidFrom= moment(new Date().toString())
    
                if(getValidFrom.diff(createAt, 'days') < 1) {
                    throw new Error ('you have already rate')
                } 
            } 
        })
    })()
}
