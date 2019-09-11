const logic = require('../logic')

module.exports = async (req, res) => {
    debugger
    const { params:{ userToReviewId },userId, body: {comment, rate} } = req
    try {
        
        await logic.registerReview(userId, userToReviewId, comment, rate)
        res.status(201).json({ message: 'Review correctly registered' })
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}