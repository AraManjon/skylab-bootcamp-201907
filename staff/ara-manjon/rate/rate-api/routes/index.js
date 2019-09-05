const { Router } = require('express')
const bodyParser = require('body-parser')
const tokenMiddleware = require('../helpers/token-middleware')
const registerUser = require('./register-user')
const authenticateUser = require('./authenticate-user')
const retrieveUser = require('./retrieve-user')
const unregisterUser = require('./unregister-user')
const updateUser = require('./update-user')
/* const registerReview = require('./register-review') */

const router = Router()

const jsonBodyParser = bodyParser.json()
//USER
router.post('/users', jsonBodyParser, registerUser)
router.post('/auth', jsonBodyParser, authenticateUser)
router.get('/users/:id', [tokenMiddleware, jsonBodyParser], retrieveUser)
router.patch('/users/:id', [tokenMiddleware, jsonBodyParser], updateUser)
router.delete('/users/:id', [tokenMiddleware, jsonBodyParser], unregisterUser)
//REVIEW
/* router.post('/review',jsonBodyParser, registerUser) */

//RESPONSE

module.exports = router