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
        enum: [1,2,3,4,5],
        default: 1,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    owner: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
})