//635c4b2c745e89696caba63a

const { cartModel,userModel } = require("../models")

const getcart= async(req,res)=>{
    const{userId}=req.query;
    const cart= await cartModel.find({})
    if(userId){
        const result=cart.filter(f=>f.userId===userId)
        if(result){
            res.status(200).json(result)
        }else{
            res.status(404).json({msj:'purchase no font'})
        }
    }else{
        res.status(200).json(cart)
    }
}
const CreateCart= async (id)=>{
    const cartif= await cartModel.findOne({userId:id})
    if(!cartif){

        const newcart= new cartModel({
            userId:id
        })
        const created= await newcart.save()
        console.log(created)
        return true
    }else return false
}

const UpdateCart= async(req,res)=>{
    const { id } = req.params
   try {
    const user= await userModel.findOne({_id:id})
    if(user){
        await cartModel.updateOne({userId:id},{
            
            products:req.body
        },{ new: true })
        .then(()=>{
            res.status(200).json({msj:'cart modified successfully'})
        })
    }
   } catch (err) {
        res.status(400).json({msj:'something went wrong',err:err})
   }
}
module.exports={
    CreateCart,
    UpdateCart,
    getcart
}