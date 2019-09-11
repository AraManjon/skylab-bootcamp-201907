const logic = require('../logic')

module.exports = async (req, res) => {
    const { userId, params: { distance } } = req

    try {
        const users = await logic.retrieveAllGeo(userId, distance)
        res.json({ message: 'Geolocation users retrieved correctly', users })
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}