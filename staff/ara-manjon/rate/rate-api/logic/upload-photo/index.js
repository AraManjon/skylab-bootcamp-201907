require('dotenv').config()
const { validate } = require('rate-utils')
const { models: { User } } = require('rate-data')
const cloudinary = require('cloudinary')
const { env: { CLOUDINARY_API_KEY, CLOUDINARY_NAME, CLOUDINARY_SECRET_KEY } } = process


/**
* Update user image
* 
* @param {String} userId 
* @param {Buffer} image 
* 
* @throws {TypeError} if userId is not a string or file is not a object
* @throws {Error} if any param is empty, user is not found or image could not be uploaded
*
* @returns {Object} user  
*/

module.exports = function (userId, image) {

    validate.string(userId, 'user id')
    validate.object(image, 'image')

    return (async () => {
        const user = await User.findById(userId)
        if (!user) throw new Error(`user with userId ${userId} not found`)

        cloudinary.config({
            cloud_name: CLOUDINARY_NAME,
            api_key: CLOUDINARY_API_KEY,
            api_secret: CLOUDINARY_SECRET_KEY
            })
        
        const _image = await new Promise((resolve, reject) => {

            const upload_stream = cloudinary.v2.uploader.upload_stream((err,image) => {

                if (err) return reject (`Image could not be uploaded: ${err}`)

                resolve(image)
            })

            image.pipe(upload_stream)
        })
        user.image = _image.secure_url
        user.id = user._id.toString()
        delete user._img
        await user.save()
    })()
}