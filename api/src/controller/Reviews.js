const { scoreModel } = require('../models/index')

const CreateReview = async(req, res) => {
    const {userId, score, comment, productId} = req.body;

    const newReview = new scoreModel({
        userId: userId,
        score: score,
        comment: comment,
        productId: productId
    })
    const review = await newReview.save();
    console.log(review)
    return res.status(200).json({msj: 'Review successfully created'})
}

const UpdateReview = async(req, res) => {
    const { id } = req.params;
    const {
        score,
        comment,
    } = req.body;
    if(!score || !comment){
        res.status(400).json({msg: 'All fields are required'})
    }else {
        try{
            await scoreModel.findByIdAndUpdate(
                id, 
                {
                    score,
                    comment
                },
                {new:true}
                )
                .then(() => {
                    res.status(200).json({msj: 'Review updated successfully'})
                })
        }catch(err){
            console.log(err)
            res.status(400).json({msj: 'Review did not update correctly'})
        }
    }
}
module.exports={
    CreateReview,
    UpdateReview
}