const logic = require('../logic')

module.exports = async (req, res) => {
    const { userId, params:{ userToReviewId }}= req

    try {
        await logic.accessReview(userId, userToReviewId)
        res.json({ message: 'review access allowed'})
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}