const { Router } = require('express')
const bodyParser = require('body-parser')
const tokenMiddleware = require('../helpers/token-middleware')
const registerUser = require('./register-user')

const router = Router()

const jsonBodyParser = bodyParser.json()

router.post('/users', jsonBodyParser, registerUser)

module.exports = router