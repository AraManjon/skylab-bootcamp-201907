const { models: { User } } = require('rate-data')

/**
 * Registers a user.
 * 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} email 
 * @param {string} password
 * 
 * @returns {Promise}
 */
module.exports = function (name, surname, username, email, password) {
    validate.string(name,'name')
    validate.string(surname,'surname')
    validate.string(username,'username')
    validate.string(email,'email')
    validate.email(email,'email')
    validate.string(password,'password')
    validate.password(password,'password')

    return User.findOne({ email })
        .then(user => {
            if (user) throw new Error(`user with e-mail ${email} already exists`)

            return User.create({ name, surname,username, email, password })
        })
        .then(() => { })
}