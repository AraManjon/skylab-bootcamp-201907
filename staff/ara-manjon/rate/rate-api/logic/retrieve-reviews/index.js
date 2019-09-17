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

        
        let reviews = await Review.find({ author: id },{ __v:0, password:0}).populate('owner').lean()
        if (!reviews) throw new Error(`User with id ${id} does not author any review.`)
     
        reviews = reviews.map(review=>{
            review.id = review._id.toString()
            delete review._id.toString()
            
            review.author.id = review.author._id.toString()
            delete review.author._id.toString()

            review.owner.id = review.owner._id.toString()
            delete review.owner._id.toString()
            delete review.owner.__v
            delete review.owner.password

            return review
        })
        reviews = reviews.sort(function(a,b){
            if( b.date > a.date) return 1
        })               
        return reviews 
    })()
}