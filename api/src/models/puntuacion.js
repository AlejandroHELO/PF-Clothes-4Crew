const {Schema, model} = require('mongoose')


const scoreSchema = new Schema({
    userId: {
        type: String
    },
    score: {
        type: Number
    },
    comment: {
        type: Text
    }
},
{
    timestamp: true,
    versionKey: false
})

const scoreModel = model("Score", scoreSchema);

module.exports = scoreModel