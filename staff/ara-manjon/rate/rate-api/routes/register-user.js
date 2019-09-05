const logic = require('../logic')

module.exports = function (req, res) {
    const { body: { name, surname, username, email, password, longitude, latitude } } = req

    try {
        logic.registerUser(name, surname,username, email, password, longitude, latitude)
            .then(() => res.status(201).json({ message: 'user correctly registered' }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}