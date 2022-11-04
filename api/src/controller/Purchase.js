const { purchaseModel } = require("../models");


const getPurchase= async(req,res)=>{
    const{userId}=req.query;
    const purchase= await purchaseModel.find({})
    if(userId){
        const result=purchase.filter(f=>f.userId===userId)
        if(result){
            res.status(200).json(result)
        }else{
            res.status(404).json({msj:'purchase no font'})
        }
    }else{
        res.status(200).json(purchase)
    }
}

const CreatePurchase=async (req,res)=>{
    const{paymentId,userId,products,addresId}=req.body
    if(!paymentId||!userId||!products||!addresId){
        res.status(404).json( {msj:'campos requeridos'})
    }

    const create= new purchaseModel({
        paymentId:paymentId,
        userId:userId,
        products:products,
        addresId:addresId,
        time:new Date()
    })
    const save= await create.save()
    console.log(save)
    res.status(201).json( {msj:'purchase create'})
}

module.exports={
    getPurchase,
    CreatePurchase
}