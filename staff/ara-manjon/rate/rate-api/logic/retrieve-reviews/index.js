const { models: { User, Review } } = require('rate-data')
const { validate } = require('rate-utils')
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
 * @throws {Error} user with id does not author any review
 * 
 * @returns {Promise}
 * 
 * Returns reviews user is author
 */


module.exports = function (id) {
    validate.string(id, 'id')
    
    return (async () => {
        
        //checks if user exist
        const user = await User.findById(id, { password: 0, __v: 0 }).lean()
        if(!user) throw Error(`user with id ${id} does not exist`)
        
        //checks if user has reviews
        let reviews = await Review.find({ author: id },{ __v:0, password:0}).populate('owner').lean()
        if (!reviews || reviews.length === 0) throw new Error(`user with id ${id} does not author any review.`)
     
        reviews = reviews.map(review => {
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
        //sort reviews by date
        reviews = reviews.sort(function(a,b){
        if( b.date > a.date) return 1
        })               
        return reviews 
    })()
}