const axios= require('axios')
require("dotenv").config();
const mercadopago = require('mercadopago');
const { userModel, cartModel, addressModel } = require('../models');

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN
})
const MercadoPago=async (req,res)=>{
        const {id,addressId} =req.params
        
        let user= await userModel.find({})
        user= user.filter(f=>f._id===id)
        if(user){
            const car= await cartModel.findOne({userId:id})
            if(car){
                const cart=car.products.map(cart=>{
                    return {
                        "id": cart.id,
                        "title": cart.name,
                        "currency_id": "ARS",
                        "picture_url": cart.image[0],
                        "description": cart.description,
                        "category_id": "art",
                        "quantity": cart.count,
                        "unit_price": cart.price
                    }
                })
                const address = await addressModel.findOne({_id:addressId})
                console.log('soy la direccion: '+address)
                //const address = addres.filter(f=>f._id===addressId)
                if(address){
                    const body = {
                        "items":cart,
                        "payer": {
                            "name": user.fullName,
                            "surname": user.fullName,
                            "email": user.email,
                            "phone": {
                                "area_code": address.codeNumber.toString(),
                                "number":address.phoneNumber
                            },
                            "identification": {
                                "type": user.identificationtype,
                                "number": user.identificationnumber
                            },
                            "address": {
                                "street_name": address.street,
                                "street_number": address.houseNumber, 
                                "zip_code": address.cp.toString()
                            }
                        },
                        "back_urls": {
                            "success": "clothes-4-crew-hjrhcliur-alejandrohelo.vercel.app/checkout/confirm/"+address._id,
                            "failure":"clothes-4-crew-hjrhcliur-alejandrohelo.vercel.app/checkout/confirm/"+address._id,
                            "pending": "clothes-4-crew-hjrhcliur-alejandrohelo.vercel.app/checkout/confirm/"+address._id
                        },  //"https://clothes-4-crew.vercel.app/checkout/confirm/"
                        "auto_return": "approved",
                        "payment_methods": {
                            "excluded_payment_methods": [
                                {
                                    "id": "master"
                                }
                            ],
                            "excluded_payment_types": [
                                {
                                    "id": "ticket"
                                }
                            ],
                            "installments": 12
                        },
                        "notification_url": "https://www.your-site.com/ipn",
                        "statement_descriptor": "Clothes 4Crew",
                        "external_reference": "Reference_1234",
                        "expires": false,
                       //"expiration_date_from": "2016-02-01T12:00:00.000-04:00",
                       //"expiration_date_to": "2016-02-28T12:00:00.000-04:00"
                     }
                
                    //   try {
                    //     const url='https://api.mercadopago.com/preapproval'
                    //     const resp= await axios( {
                    //     method: 'post',
                    //     url: url,
                    //     headers: { 
                    //       'Authorization' : `Bearer ${process.env.ACCESS_TOKEN}`,
                    //       'Content-Type': 'application/json'
                    //     },
                    //     data : body
                    //   })
                    //   console.log(resp)
                    //   res.status(200).send('ok')
                    //   } catch (error) {
                    //     res.status(400).send('error')
                    //     console.log(error)
                    //   }
                      mercadopago.preferences.create(body)
                      .then(resp=>{
                        console.log(resp.body)
                        res.status(200).send(resp.body.id)
                    })
                      .catch(err=>{
                        console.log(err)
                        res.status(400).send(err)
                    }
                    )
                }else {
                    res.status(400).json({msj:'address is required'})
                }
               
            }else{
                res.status(400).json({msj:'there was a problem with the cart'})
            }
        }else{
            res.status(400).json({msj:'Username does not exist'})
        }
        
}
const GetMP= async (id)=>{
    let result=[]
    mercadopago.payment.get(id)
    .then((resp)=>{
        result=[...resp.body]
    })
    .catch((err)=>{
        result={msj:'algo salio mal'}
    })
    return result
}
module.exports={
    MercadoPago,
    GetMP
}