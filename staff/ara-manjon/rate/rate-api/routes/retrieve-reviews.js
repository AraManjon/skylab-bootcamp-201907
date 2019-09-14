const logic = require('../logic')

module.exports = async (req, res) => {
    const { userId, params: {id} } = req

    try {
        const user =  await logic.retrieveReviews(id)
        res.json({ message: 'User retrieved correctly', user })
        
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}