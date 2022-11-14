const { Schema, model } = require('mongoose')

const favoriteSchema = new Schema(
    {
        product: {
            type: String,
        },
        userId: {
            type: String
        }
    },
    {
        timestamp: true,
        versionKey: false,
    }
)
const favoriteModel = model('Favorite', favoriteSchema)
module.exports = favoriteModel
