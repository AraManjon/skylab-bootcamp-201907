const mongoose = require('mongoose')
const { user, review, response } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Review: mongoose.model('Review', review),
    Response: mongoose.model('Response',response)
}