const {Router} = require('express')
const {getUserFavorites, favoriteProduct} = require('../controller/favorites')

const favoriteRouter = Router()
favoriteRouter.post('/', favoriteProduct)
favoriteRouter.get('/:userId', getUserFavorites)

module.exports = favoriteRouter