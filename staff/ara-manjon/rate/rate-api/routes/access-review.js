const logic = require('../logic')

module.exports = async (req, res) => {
    const { userId, params:{ userToReviewId }}= req

    try {
        debugger
        await logic.accessReview(userId, userToReviewId)
        res.json({ message: 'review access allowed'})
        res.status(404).json({ error: message })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}