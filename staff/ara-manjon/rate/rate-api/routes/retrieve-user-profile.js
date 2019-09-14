const logic = require('../logic')

module.exports = async (req, res) => {
    const { params:{ id } } = req

    try {
        const user =  await logic.retrieveUserProfile(id)

        res.json({ message: 'User profile retrieved correctly', user })        
    } catch ({ message }) {
        debugger
        res.status(404).json({ error: message })
    }
}