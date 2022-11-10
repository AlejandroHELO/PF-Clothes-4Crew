const { Schema, model } = require('mongoose')

const purchaseSchema = new Schema(
    {
        paymentId: {
            type: String,
        },
        userId: {
            type: String,
        },
        products: {
            type: Array,
        },
        addresId: {
            type: String,
        },
        time:{
            type:Date
        },
        state:{
            type:String
        }
    },
    {
        timestamp: true,
        versionKey: false,
    }
)

const purchaseModel = model('Purchase', purchaseSchema)

module.exports = purchaseModel
