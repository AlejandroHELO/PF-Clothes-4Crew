const { Schema, model } = require('mongoose')

const favoriteSchema = new Schema(
    {
        product: {
            type: String,
        },
        userId: {

        }
    },
    {
        timestamp: true,
        versionKey: false,
    }
)
const favoriteModel = model('Brand', favoriteSchema)
module.exports = favoriteModel
