const { addressModel } = require("../models")


const getAddress= async(req,res)=>{
    const {id} = req.query
    const allAddress= await addressModel.find({})
    if(id){
        const result= allAddress.filter(f=>f.userId===id)
        if(result.length){
            res.status(200).json(result)
        }else{
            res.status(200).json({msj:'no tiene address'})
        }
    }else{
        res.status(200).json(allAddress)
    }
}

const CreateAddress= async(req,res)=>{
    console.log(req.body)
    const {street,
        codeNumber,
        phoneNumber,
        houseNumber,
        cp,
        city,
        userId,
        country
    }=req.body
    if(codeNumber<1||
        phoneNumber<1||
        houseNumber<1||
        cp<1||
        !city||
        !userId||
        !country){
            res.status(400).json({msj:'es requerido todos los datos'})
        }else{
            const create= new addressModel({
                street:street,
                codeNumber:codeNumber,
                phoneNumber:phoneNumber,
                houseNumber:houseNumber,
                cp:cp,
                city:city,
                userId:userId,
                country:country
            })
            const result= await create.save()
            console.log(result)
            res.status(200).json({msj:'Address create'})
        }
}

const updateAddress=async (req,res)=>{
    const {
        id,
        street,
        codeNumber,
        phoneNumbe,
        houseNumber,
        cp,
        city,
        userId,
        country
    }=req.body
    if(
        !id||
        !street||
        !codeNumber||
        !phoneNumbe||
        !houseNumber||
        !cp||
        !city||
        !userId||
        !country){
            res.status(400).json({msj:'es requerido todos los datos'})
        }else{
    if(id){
        const allAddress= await addressModel.find({})
        const result= allAddress.filter(f=>f._id==id)
        console.log(result)
        if(result.length){
            await addressModel.findByIdAndUpdate(id,{
                street:street,
                codeNumber:codeNumber,
                phoneNumbe:phoneNumbe,
                houseNumber:houseNumber,
                cp:cp,
                city:city,
                userId:userId,
                country:country
            },{ new: true })
            .then(()=>{
                res.status(200).json({msj:'Address update'})
            })

        }else{
            res.status(400).json({msj:'address no fond'})
        }
    }else{
        res.status(400).json({msj:'id is requerid'})
    }
 }
}

module.exports={
    getAddress,
    CreateAddress,
    updateAddress
}