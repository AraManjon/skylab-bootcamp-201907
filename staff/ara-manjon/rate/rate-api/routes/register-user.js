const logic = require('../logic')

module.exports = async (req, res) => {
    const { body: { name, surname, username, email, password } } = req

    try {
        await logic.registerUser(name, surname,username, email, password)
        res.status(201).json({ message: 'User correctly registered' })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}