const { Schema, model } = require('mongoose')

const colorSchema = new Schema(
    {
        name: {
            type: String,
        },
    },
    {
        timestamp: true,
        versionKey: false,
    }
)

const colorModel = model('Color', colorSchema)

module.exports = colorModel
