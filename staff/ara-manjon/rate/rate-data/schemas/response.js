const mongoose = require('mongoose')

const {
    Schema
} = mongoose

module.exports = new Schema({
    comment: {
        type: String
    },
    date: {
        type: Date
    }
})