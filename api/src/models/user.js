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
        type: Boolean
    }
},
{
    timestamp: true,
    versionKey: false
})

const userModel = model("User", userSchema);

module.exports = userModel