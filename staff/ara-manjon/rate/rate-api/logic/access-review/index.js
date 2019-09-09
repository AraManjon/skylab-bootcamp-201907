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
 * @returns {Promise} ron correct acces returns a promise
 */



module.exports = function (UserId, UserIdtoReview) {

    validate.string(UserId, 'id')
    validate.string(UserIdtoReview, 'id')

    return (async () => {
        const user = await User.findOne({ _id: UserIdtoReview}, { _id: 0, password: 0 }).lean()
        if (!user) throw new Error(`user with id ${UserIdtoReview} does not exist`)

        let reviewsUser= user.reviews.map(review=>review._id.toString())

        let results = await Promise.all(reviewsUser.map( async (reviewUser) =>{
            return await Review.find({_id: reviewUser}, {__v: 0}).lean()
        }))
        
    
        results.forEach((item, index) => {
            
            if(item[index].author[0]._id.toString() === UserId){
                const createAt= moment(item.date)
                const getValidFrom= moment(new Date().toString())
    
                if(getValidFrom.diff(createAt, 'days') < 1) {
                    throw new Error ('you have already rate')
                } 
            } 
        })
    })()
}
