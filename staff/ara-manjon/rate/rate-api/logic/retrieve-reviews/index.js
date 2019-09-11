const {
    models: {
        User,
        Review
    }
} = require('rate-data')
const {
    validate
} = require('rate-utils')
/**
 * Retrieves reviews user by its id.
 * 
 * @param {string} id user Id
 * 
 * @throws {Error} user id is empty or blank
 * 
 * @throws {Error} user id is not a string
 * 
 * @throws {Error} user with id does not exist
 * 
 * @returns {Promise}
 * 
 * Returns a user
 */


module.exports = function (id) {
    validate.string(id, 'id')
    
    return (async () => {

        const user = await User.findById({ _id: id})
        if (!user) throw new Error(`user with id ${id} does not exist`)
        
        let reviews = await Review.find({ author: id },{ __v:0, password:0}).lean()
        reviews.forEach(review=>{
            review.id = review._id.toString()
            delete review._id.toString()
            
            review.author.id = review.author[0]._id.toString()
            delete review.author[0]._id.toString()
        })
        if (!reviews) throw new Error(`User with id ${id} does not author any review.`)

        let reviewedUsers = await Promise.all(reviews.map(review => {
           
            return User.findById(review.owner, { __v:0, password:0}).lean()
        }
        ))
        reviewedUsers.forEach(reviewedUser=>{
            reviewedUser.id = reviewedUser._id.toString()
            delete reviewedUser._id.toString()
        })
               
        return { reviews, reviewedUsers }
    })()
}