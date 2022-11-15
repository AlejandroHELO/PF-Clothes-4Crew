const { purchaseModel,userModel,cartModel, productModel } = require("../models");
const { GetMP } = require("./MercadoPago");


const getPurchase= async(req,res)=>{
    const{userId}=req.query;
    const purchase= await purchaseModel.find({})
    if(userId){
        const result=purchase.filter(f=>f.userId===userId)
        if(result){
            res.status(200).json(result)
        }else{
            res.status(404).json({msj:'purchase not found'})
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
    try {
        const getmp= await GetMP(paymentId)
        //console.log(getmp)
        if(getmp){
            const create= new purchaseModel({
                paymentId:paymentId,
                userId:userId,
                products:products,
                addresId:addresId,
                time:new Date(),
                state:'Prosses'
            })
            const save = await create.save()
            //console.log(save)
            const user = await userModel.findOne({userId:userId})
            //console.log(user)
            if(user){
                await cartModel.findOneAndUpdate({userId:userId},{
                    products:[]
                },{ new: true })
                .then((r)=>{
                    console.log(r)
                })
                
            }
            products.forEach(async(p)=> {
            //console.log('soy los productos: ',p)
            await actualizarStock(p)
            })
            res.status(201).json( {msj:'purchase created'})
        }
    } catch (err) {
        console.log(err)
    }
}

async function actualizarStock(product){
    let produc= await productModel.findById({_id:product.id})
    
    if(produc){
        const size=produc.size.map(p=>{
            if(p.size===product.size.size){
                const stock=p.stock-product.count
                return{
                    size:p.size,
                    stock:p.stock-product.count
                }
            }else{
                return p
            }
        })
        
        await productModel.findByIdAndUpdate(product.id,{
            size:size
        },{ new: true })
        .then((e)=>console.log(e))
    }
}

module.exports={
    getPurchase,
    CreatePurchase
}