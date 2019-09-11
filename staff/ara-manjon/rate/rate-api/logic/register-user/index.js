const { models: { User } } = require('rate-data')
const { validate }= require('rate-utils')
const bcrypt = require('bcryptjs')

/**
 * Registers a user.
 * 
 * @param {string} name name introduced by user
 * @param {string} surname surname introduced by user
 * @param {string} username username introduced by user
 * @param {string} email email introduced by user
 * @param {string} password password introduced by user
 * 
 * @returns {Promise} Returns the user
 */


module.exports = function(name, surname, username, email, password) {
    validate.string(name,'name')
    validate.string(surname,'surname')
    validate.string(username,'username')
    validate.string(email,'email')
    validate.email(email,'email')
    validate.string(password,'password')
    validate.password(password,'password')
    
    return (async () => {
        const user = await User.findOne({ email })
        
        if (user) throw Error('User already exists.')

        const _user = await User.findOne({ username })

        if (_user)throw Error('Username is in use')
        const hash = await bcrypt.hash(password,10)
            
        await User.create({name, surname, username, email, password: hash})
        return user
    })()
}
