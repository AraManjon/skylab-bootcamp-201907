const { validate } = require('rate-utils')
const { models: { User } } = require('rate-data')
/**
 * Search users by params introduced by user
 * 
 * @param {string} searchParams fiels
 * 
 * @returns {Promise}
*/

 module.exports = function (searchParams) {

    if (Object.keys(searchParams).length <= 0) throw Error('Input is empty')
    Object.keys(searchParams).forEach(key => searchParams[key] === undefined ? delete searchParams[key] : '')
    
    if (!(searchParams instanceof Object)) throw Error(`Input ${searchParams} is not an Object`)    
    if (searchParams.name) validate.string(searchParams.name, 'name')
    if (searchParams.surname) validate.string(searchParams.surname, 'surname')
    if (searchParams.username) validate.string(searchParams.username, 'username')
    if (searchParams.email) validate.string(searchParams.email, 'email')
    debugger
    return (async () => {
        
        const users = await User.find(searchParams, { __v: 0, password: 0 }).lean()
        if (users.length === 0) throw Error('user not found')
        users.map(user => {
            
        if (!user._id) throw Error('user not found')
        debugger
            user.id = user._id.toString()
            delete user._id
            
        })
        return users
        
    }) ()
} 