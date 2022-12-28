const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const {Schema} = mongoose

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
        // type: String,
        // required: true,
        // minlength: 1
    },
    cart:{
        
    } 
}) 
 





    userSchema.methods.matchPassword = async function (password) {
        try {
            return await bcrypt.compare(password, this.password);
        } 
        catch (error) {
            throw new Error(error);
        }
    }

    



const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel