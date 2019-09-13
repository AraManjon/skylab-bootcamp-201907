const logic = require('../logic')

module.exports = async (req, res) => {
    const { userId } = req

    try {
        debugger
        const user =  await logic.retrieveUserProfile(userId)
        res.json({ message: 'User retrieved correctly', user })
        
    } catch ({ message }) {
        debugger
        res.status(404).json({ error: message })
    }
}