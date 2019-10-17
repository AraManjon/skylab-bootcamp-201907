const { models: { User } } = require('rate-data')
const { validate }= require('rate-utils')
const bcrypt = require('bcryptjs')

/**
 * Registers a user
 * 
 * @param {string} name name introduced by user
 * 
 * @param {string} surname surname introduced by user
 * 
 * @param {string} username username introduced by user
 * 
 * @param {string} email email introduced by user
 * 
 * @param {string} password password introduced by user
 * 
 * @throws {Error} name, surname, username, email or password is empty or blank
 * 
 * @throws {Error} name, surname, username, email or password is not a string
 * 
 * @throws {Error} password is not a valid password
 * 
 * @returns {Promise}
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
        //checks if user email exist
        const user = await User.findOne({ email })
        
        if (user) throw Error(`user with e-mail ${email} already exist`)

        //checks if user username exist
        const _user = await User.findOne({ username })

        if (_user)throw Error(`user with username ${username} already exist`)

        //transform password in a hash
        const hash = await bcrypt.hash(password,10)

        //create user   
        await User.create({name, surname, username, email, password: hash})
    })()
}
