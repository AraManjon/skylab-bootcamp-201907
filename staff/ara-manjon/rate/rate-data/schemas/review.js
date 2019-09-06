const mongoose = require('mongoose')

const {
    Schema,
    ObjectId
} = mongoose

const Response = require('./response')

module.exports = new Schema({
    comment: {
        type: String
    },
    response: Response,
    rate: {
        type: Number,
        required: true
    },
    date: {
        type: Date
    },
    author: {
        type: ObjectId,
        ref: 'User'
    }
})