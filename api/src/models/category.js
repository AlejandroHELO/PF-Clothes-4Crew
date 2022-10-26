const {Schema, model} = require('mongoose')


const categorySchema = new Schema({
    name: {
        type: String
    }
})

const categoryModel = model("Category", categorySchema);

module.exports = categoryModel