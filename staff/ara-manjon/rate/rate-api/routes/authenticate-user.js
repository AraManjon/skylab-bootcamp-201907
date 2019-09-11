const jwt = require('jsonwebtoken')
const logic = require('../logic')

const { env: { JWT_SECRET } } = process

module.exports = async (req, res) => {
    const { body: { email, password } } = req

    try {
        const id = await logic.authenticateUser(email, password)
           
        const token = jwt.sign({ sub: id }, JWT_SECRET)

        res.json({ message: 'User correctly authenticated', id, token })
            
    } catch ({ message }) {
        res.status(401).json({ error: message })
    }
}