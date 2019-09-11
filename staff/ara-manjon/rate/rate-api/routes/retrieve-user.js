const logic = require('../logic')

module.exports = async (req, res) => {
    const { userId } = req

    try {
        const user =  await logic.retrieveUser(userId)
        res.json({ message: 'User retrieved correctly', user })
        
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}