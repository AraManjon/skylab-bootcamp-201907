const logic = require('../logic')

module.exports = async function (req, res) {
    const { body: { name, surname, username, email } } = req
    try {
        const results = await logic.searchUser({ name, surname, username, email })
        res.json({ message: 'search undergone successfully', results })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}