const {Schema, model} = require('mongoose')


const scoreSchema = new Schema({
    userId: {
        type: String
    },
    score: {
        type: Number
    },
    comment: {
        type: String
    }
})

const scoreModel = model("Score", scoreSchema);

module.exports = scoreModel