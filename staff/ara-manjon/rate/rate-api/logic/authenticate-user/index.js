const { models: { User } } = require('rate-data')
const { validate }= require('rate-utils')
const bcrypt = require('bcryptjs')

/**
* Authenticate a user by its credentials.
* 
* @param {string} email email introduced by user
* 
* @param {string} password password introduced by user
*
* @throws {Error} email is empty or blank
* 
* @throws {Error} email is not a string
* 
* @throws {Error} email does not exist
* 
* @throws {Error} email is not a valid email
*
* @throws {Error} password is empty or blank
* 
* @throws {Error} password is not a string
* 
* @throws {Error} password does not match
* 
* @returns {Promise}
* 
* Returns the user id 
*/

module.exports = function (email, password) {

    validate.string(email, 'e-mail')
    validate.email(email, 'e-mail')
    validate.string(password)
    
    return (async () => {
        //checks if user email exist
        const user = await User.findOne({ email })
            
        if (!user) throw new Error(`user with e-mail ${email} does not exist`)
        
        //checks password without hash 
        const match = await bcrypt.compare(password, user.password)

        if(!match) throw new Error('wrong credentials')

        //returns user id
        return user.id
    })()
}