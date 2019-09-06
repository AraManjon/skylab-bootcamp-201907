const logic = require('../logic')

module.exports = function (req, res) {
    const { params: { id }, body: {longitude, latitude} }= req

    try {
        logic.updateGeo(id, longitude, latitude)
            .then(() => res.json({ message: 'User geolocation updated successfully'}))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}