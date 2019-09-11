const { models: { User } } = require('rate-data')
const { validate }= require('rate-utils')
const bcrypt = require('bcryptjs')

/**
       * Authenticate a user by its credentials.
       * 
       * @param {string} email
       * 
       * @param {string} password 
       * 
       * @returns {Promise}
       * 
       * Returns the id and token
       */


    module.exports = function (email, password) {
        validate.string(email, 'e-mail')
        validate.email(email, 'e-mail')
        validate.string(password)
    
        return (async () => {
            const user = await User.findOne({ email })
            
            if (!user) throw new Error(`user with e-mail ${email} does not exist`)
    
            const match = await bcrypt.compare(password, user.password)
            if(!match) throw new Error('wrong credentials')
            return user.id
        })()
    }