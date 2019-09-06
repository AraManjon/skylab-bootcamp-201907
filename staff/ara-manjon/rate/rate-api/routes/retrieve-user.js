const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { id } } = req

    try {
        logic.retrieveUser(id)
            .then(user => res.json({ message: 'User retrieved correctly', user }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}