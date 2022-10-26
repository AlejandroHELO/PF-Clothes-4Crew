const {Schema, model} = require('mongoose')


const addressSchema = new Schema({
    street: {
        type: String
    },
    phoneNumber: {
        type: Number
    },
    houseNumber: {
        type: Number
    },
    city: {
        type: String
    },
    userId: {
        type: String
    }
})

const addressModel = model("Address", addressSchema);

module.exports = addressModel