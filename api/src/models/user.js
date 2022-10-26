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
    isAdmin: {
        type: Boolean
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    address : {
        type: String
    },
    telephone: {
        type: Number
    }
})

const userModel = model("User", userSchema);

module.exports = userModel