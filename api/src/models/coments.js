const {Schema, model} = require('mongoose')


const commentSchema = new Schema({
    comment: {
        type: String
    },
    userId: {
        type: String
    }
})

const commentModel = model("Comment", commentSchema);

module.exports = commentModel