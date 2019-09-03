const mongoose = require('mongoose')

const { Schema, ObjectId } = mongoose

module.exports = new Schema({
    comment:{
        type: String
    },
    response: {
        type: String
    },
    voteRealised:{
        type: Number,
        required: true
    },
    DateCreate: {
        type: Date
    },
    userCreator: {
        type: [{ type: ObjectId, ref: 'User' }]
    }
})