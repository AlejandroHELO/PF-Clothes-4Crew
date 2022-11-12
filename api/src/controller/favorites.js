const {favoriteModel }= require('../models/favorite')


const favoriteProduct = async(req,res) => {
    let {productId, userId} = req.body
    try {
        const newFavorite = new favoriteModel({
            product: productId,
            userId: userId
        })

        await newFavorite.save()
        res.status(201).json({
            msj: 'Favorite added'
        })
    } catch (error) {
        res.status(500).send('something is not good')
    }
}


const getUserFavorites = async(req, res) => {
    let{userId} = req.params
    try {
        const queryAllfavorites = await favoriteModel.find({})
        const userFavorites = queryAllfavorites.filter(product => product.userId === userId)
        res.status(200).send(userFavorites)
    } catch (error) {
        res.status(500).send('something is not good')
    }
}

module.exports = {
    favoriteProduct,
    getUserFavorites
}