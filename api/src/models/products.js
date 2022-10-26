const {Schema, model} = require('mongoose')


const productSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: Text
    },
    stock: {
        type: Int32Array
    },
    color: {
        type: String
    },
    status: {
        type: String
    },
    size: {
        type: Number
    },
    category: {
        type: Array
    }
})

const productModel = model("Product", productSchema);

module.exports = productModel