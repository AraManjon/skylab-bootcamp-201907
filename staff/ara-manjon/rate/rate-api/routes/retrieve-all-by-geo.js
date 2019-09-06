const logic = require('../logic')

module.exports = (req, res) => {
    const { params: { id }, body: distance } = req

    try {
        logic.retrieveAllByGeo(id, distance)
            .then(user => res.json({ message: 'Geolocation users retrieved correctly', user }))
            .catch(({ message }) => res.status(404).json({ error: message }))
    } catch ({ message }) {
        res.status(404).json({ error: message })
    }
}