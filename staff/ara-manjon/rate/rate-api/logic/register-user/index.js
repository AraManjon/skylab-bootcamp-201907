const { models: { User } } = require('rate-data')
const { validate }= require('rate-utils')

/**
 * Registers a user.
 * 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} username 
 * @param {string} email 
 * @param {string} password
 * 
 * @returns {Promise}
 */
/* module.exports = function (name, surname, username, email, password, longitude, latitude) {
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
        const newUser= new User({name, surname, username, email, password})
        newUser.location.coordinates.push(longitude, latitude)
        
        
        await newUser.save()
        return newUser
    })()
} */

module.exports = function(name, surname, username, email, password, longitude, latitude) {
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
            
        await User.create({name, surname, username, email, password, longitude, latitude})
        return user
    })()
}
