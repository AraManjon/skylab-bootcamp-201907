const { Router } = require('express')
const bodyParser = require('body-parser')
const tokenMiddleware = require('../helpers/token-middleware')
const registerUser = require('./register-user')
const authenticateUser = require('./authenticate-user')
const retrieveUser = require('./retrieve-user')
const unregisterUser = require('./unregister-user')
const updateUser = require('./update-user')
const updateGeo = require('./update-geo')
const retrieveAllGeo = require('./retrieve-all-geo')
const registerReview = require('./register-review')
const uploadPhoto = require('./upload-photo')
const retrieveUserProfile = require('./retrieve-user-profile')
const accessReview = require('./access-review')
const retrieveReviews = require('./retrieve-reviews')
const searchUser = require('./search-user')

const router = Router()

const jsonBodyParser = bodyParser.json()
//USER
router.post('/users', jsonBodyParser, registerUser)
router.post('/auth', jsonBodyParser, authenticateUser)
router.get('/users', [tokenMiddleware, jsonBodyParser], retrieveUser)
router.patch('/users', [tokenMiddleware, jsonBodyParser], updateUser)
router.delete('/users', [tokenMiddleware, jsonBodyParser], unregisterUser)
router.post('/users/image', tokenMiddleware, uploadPhoto)
router.get('/users/username', [tokenMiddleware, jsonBodyParser], retrieveUserProfile)

//USER GEO
router.patch('/geolocation', [tokenMiddleware, jsonBodyParser], updateGeo)
router.get('/geolocation/:distance', [tokenMiddleware, jsonBodyParser], retrieveAllGeo)

//REVIEW
router.post('/review/:userToReviewId', [tokenMiddleware, jsonBodyParser], registerReview)
router.get('/reviews', [tokenMiddleware, jsonBodyParser], retrieveReviews)
router.post('/access-review/:userToReviewId', [tokenMiddleware, jsonBodyParser], accessReview)

//SEARCH
router.get('/search', jsonBodyParser, searchUser)
module.exports = router