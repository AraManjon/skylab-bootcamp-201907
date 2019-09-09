const { models: { User } } = require('rate-data')
const {validate} = require('rate-utils')

/* const streamifier = require('streamifier')
const cloudinary = require('cloudinary')
​
const { CLOUDINARY_API_KEY, CLOUDINARY_NAME, CLOUDINARY_SECRET_KEY } = require('./config')
​ */ 

/**
 * Updates a user.
 * 
 * @param {string} id
 * @param {Object} data
 * 
 * @returns {Promise}
 */




 
 module.exports = function (id, data) {
     validate.string(id, 'id')
     /* validate.object(image, 'image') */
/*       validate.object(data, 'data')
     if (data.name) validate.string(data.name, 'name')
     if (data.surname) validate.string(data.surname, 'surname')
     if (data.username) validate.string(data.username, 'userrname')
     if (data.password) validate.string(data.password, 'password')
     if (data.password) validate.password(data.password, 'password') */
 
    return (async () => {
        const user = await User.findById(id)
        if (!user) throw new Error(`user with id ${id} does not exist`)
        /* const user = await User.findByIdAndUpdate({_id: id},{$set: data}) */
 ​        /* _user.id = _user._id.toString() */
        return user  
    })()
} 



/*          cloudinary.config({
            cloud_name: CLOUDINARY_NAME,
            api_key: CLOUDINARY_API_KEY,
            api_secret: CLOUDINARY_SECRET_KEY
            })

            const _image = await new Promise((resolve, reject) => {
                ​
                            const upload_stream = cloudinary.uploader.upload_stream((err,_image) => {
                ​
                                if (err) return reject (`Image could not be uploaded: ${err}`)
                ​
                                resolve(_image)
                            })
                            streamifier.createReadStream(image).pipe(upload_stream)
                        })

        await User.updateOne({_id:id},{$set:data})

        let _user = await User.findByIdAndUpdate(userId, { image: image.secure_url }, { new: true, runValidators: true }).select('-__v -password').lean()
        
        _user.id = user._id.toString()
        delete _user._id  */




