const logic = require('../logic')

module.exports = async (req, res) => {
    const { userId, body: { password } } = req
debugger
    try {
        await logic.unregisterUser(userId, password)
        res.status(201).json({ message: 'User correctly unregistered' })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}