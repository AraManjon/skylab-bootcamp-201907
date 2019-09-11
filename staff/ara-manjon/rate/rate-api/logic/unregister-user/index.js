const { models: { User } } = require('rate-data')
const { validate }= require('rate-utils')

/**
 * Unregisters a user by their id
 * 
 * @param {string} id 
 * @param {string} email
 * @param {string} password 
 * 
 * @returns {Promise}
*/
module.exports = function(id, password) {
    validate.string(id, 'id')
    validate.string(password, 'password')
    validate.password(password, 'password')

    if(!password)throw Error('password required')
    return(async ()=>{
        const result = await User.deleteOne({ _id: id })
        if (!result.deletedCount) throw Error('wrong credentials')
    })()        
}
