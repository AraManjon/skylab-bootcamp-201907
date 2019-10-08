const { models: { User } } = require('rate-data')
const {validate} = require('rate-utils')
const bcrypt = require('bcryptjs')

/**
 * Update a user.
 * 
 * @param {string} id user id
 * 
 * @param {Object} data data parametres introduced by user
 *  
 * @throws {Error} user with id does not exist
 * 
 * @returns {Promise}  Returns a promise
 */

 module.exports = function (id, data) {

    validate.string(id, 'id')
    validate.object(data, 'data')

    if (data.name) validate.string(data.name, 'name')
    if (data.surname) validate.string(data.surname, 'surname')
    if (data.username) validate.string(data.username, 'username')
    if (data.password) validate.string(data.password, 'password')
    if (data.image) validate.string(data.image, 'image')
    if (data.password) validate.password(data.password, 'password')

    if(data.email) throw new Error('email non-modifiable')
 
    return (async () => {

        //checks if password match
        if(data.password){
            const hash = await bcrypt.hash(data.password,10)
            data.password = hash
        }

        //find user by id and update data info 
        const user = await User.findByIdAndUpdate(id, { $set: data })

        if (!user) throw Error(`User with id ${id} does not exist.`)         
    })()
} 





