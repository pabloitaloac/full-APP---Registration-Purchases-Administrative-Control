const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true,
        minlength: 1
    },
    purchases:{
        type:Array
    }
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel