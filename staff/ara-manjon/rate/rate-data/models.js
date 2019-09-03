const mongoose = require('mongoose')
const { user, review } = require('./schemas')

module.exports = {
    User: mongoose.model('User', user),
    Review: mongoose.model('Review', review)
}