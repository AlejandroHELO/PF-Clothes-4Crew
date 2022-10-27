const { Schema, model } = require('mongoose')


const productSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    stock: {
        type: Number
    },
    color: {
        type: String
    },
    size: {
        type: Number
    },
    category: {
        type: Array
    },
    image: {
        type: Array
    },
    genre: {
        type: String
    },
    brand: {
        type: String
    },
    price: {
        type: Number
    },
    active: {
        type: Boolean
    }
},
    {
        timestamp: true,
        versionKey: false
    })

const productModel = model("Product", productSchema);

module.exports = productModel