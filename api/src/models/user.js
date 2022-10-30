const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    fullName: {
        type: String
    },
    email: {
        type: String,
    },
    password: {
        type: String
    },
    birthDate: {
        type: Date,
    },
    genre: {
        type: String
    },
    country: {
        type: String
    },
    address:{
        type: String
    },
    tel: {
        type: Number
    },
    image: {
        type: String
    },
    isAdmin: {
        type: Boolean
    },
    active: {
        type: Boolean
    }
},
{
    timestamp: true,
    versionKey: false
})

const userModel = model("User", userSchema);

module.exports = userModel