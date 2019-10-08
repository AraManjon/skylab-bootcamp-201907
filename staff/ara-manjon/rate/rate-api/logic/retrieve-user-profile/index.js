const { models: { User, Review } } = require('rate-data')
const { validate } = require('rate-utils')

/**
 * Retrieve a user profile.
 * 
 * @param {String} UserId user id to access a reviews
 *
 * @throws {Error} user id is empty or blank
 * 
 * @throws {Error} user id is not a string
 * 
 * @throws {Error} user with id does not exist
 * 
 * @returns {Promise} returns a user profile, reviews and author completed
*/

module.exports = function (id) {
    
    validate.string(id, 'id')

    return (async () => {

        //retrieve User without password
        const user = await User.findById(id, { password: 0, __v: 0 }).populate('reviews').lean()

        if(!user) throw Error(`user with id ${id} does not exist`)

        //cleaning _id's to be id
        user.id = user._id.toString()
        delete user._id
         
        const rate = user.reviews.map(review => {

            review.id = review._id.toString()
            delete review._id

            return review.rate
        })
        
        //retrieve average rate (number)
        let averageRate = 0
        if (rate.length > 0) {
            averageRate = rate.reduce((previous, current) => current += previous) / rate.length
        }     
        averageRate = averageRate.toFixed(1)

        //retrieve reviews with autor

        const reviews = user.reviews

        const reviewsWithAuthor = await Promise.all(reviews.map(async (review) => {

            let reviewAndAuthor = await Review.findById({
                _id: review.id
            }).populate('author').lean()

            reviewAndAuthor.id = reviewAndAuthor._id.toString()
            delete reviewAndAuthor._id

            delete reviewAndAuthor.__v
            delete reviewAndAuthor.author.password

            reviewAndAuthor.author.id = reviewAndAuthor.author._id.toString()
            delete reviewAndAuthor.author._id
            delete reviewAndAuthor.author.__v

            reviewAndAuthor.owner.id = reviewAndAuthor.owner._id.toString()
            delete reviewAndAuthor.owner._id
            delete reviewAndAuthor.owner.__v
            //

            reviewAndAuthor.author = reviewAndAuthor.author

            //    
            return reviewAndAuthor
        }))

        //user average rate into user object    
        user.averageRate = averageRate

        //replace reviews with id's with reviews with author object sorted by date
        reviewsWithAuthor.sort(function(a,b){
            if( a.date < b.date) return 1
        })
        user.reviews = reviewsWithAuthor
        
        return user
    })()
}