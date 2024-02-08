const mongoose = require('mongoose')

const StudentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: false
        },
        phoneNumber: {
            type: String,
            unique: true,
            required: true
        },
        class: {
            type: String,
            required: false
        },
        gender: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            default: true
        },
        role: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timeStamps: true
    }
)

const Student = mongoose.model('Student', StudentSchema)

module.exports = Student


