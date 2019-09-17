const logic = require('../logic')

module.exports = async (req, res) => {
    const { userId, body: {longitude, latitude} }= req

    try {
        await logic.updateGeo(userId, longitude, latitude)
        res.json({ message: 'User geolocation updated successfully'})
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}