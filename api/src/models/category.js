const {Schema, model} = require('mongoose')


const categorySchema = new Schema({
    name: {
        type: String
    }
},
{
    timestamp: true,
    versionKey: false
})

const categoryModel = model("Category", categorySchema);

module.exports = categoryModel