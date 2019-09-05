const mongoose = require('mongoose')

const {
    Schema, ObjectId
} = mongoose

module.exports = new Schema({
    users: [ObjectId]
})