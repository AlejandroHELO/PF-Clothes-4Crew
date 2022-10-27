const {productModel} =require('../models/models')


const Products=async (req,res)=>{
    const {id} =req.params
    const {name}=req.query
    const allProducts= await productModel.find({})
    if(id){
        const result=allProducts.filter(f=>f.id===id)
        result?res.status(200).json(result):
        res.status(400).json({msj:'Product not found'})
    }else if(name){
        const result=allProducts.filter(f=>f.name.includes(name))
        result?res.status(200).json(result):
        res.status(400).json({msj:'Product not found'})
    }else if(allProducts){
        res.status(200).json(allProducts)
    }else{
        res.status(400).json({msj:'Product not found'})
    }
    


}


module.exports = {
    Products
}