const { Schema, model } = require('mongoose')

const cartSchema = new Schema(
    {
        userId: {
            type: String,
        },
        products: {
            type: Array,
        },
    },
    {
        timestamp: true,
        versionKey: false,
    }
)

const cartModel = model('Cart', cartSchema)

module.exports = cartModel
