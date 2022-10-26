const {Schema, model} = require('mongoose')


const purchaseSchema = new Schema({
    paymentId: {
        type: String
    },
    userId: {
        type: String
    },
    products: {
        type: Array
    },
    addresId: {
        type: String
    }
})

const purchaseModel = model("Purchase", purchaseSchema);

module.exports = purchaseModel