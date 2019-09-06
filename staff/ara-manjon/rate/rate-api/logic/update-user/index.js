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

    return (async () => {
        const user = await User.findById(id)
        if (!user) throw new Error(`user with id ${id} does not exist`)
        await User.updateOne({_id:id},{$set:data})
    })()
}
