const logic = require('../logic')
const Busboy = require('busboy')

module.exports = (req, res) => {
    const { userId } = req
    const busboy = new Busboy({ headers: req.headers })
    
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        logic.uploadPhoto(userId, file)
            .then(() => res.json({ message: 'user image successfully uploaded' }))
            .catch(({message}) => res.status(400).json({ error: message }))
    })
    req.pipe(busboy)
}