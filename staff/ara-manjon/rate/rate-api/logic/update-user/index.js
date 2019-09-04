const { models: { User } } = require('rate-data')
const { validate }= require('rate-utils')

/**
 * Updates a user.
 * 
 * @param {string} id
 * @param {Object} data
 * 
 * @returns {Promise}
 */
module.exports = function (id, data) {
     validate.string(id, 'id')
    
    async () => {
        const user = await User.findByIdAndUpdate(id, {$set:data})
        if (!user) throw new Error(`user with id ${id} does not exist`)
        }
}