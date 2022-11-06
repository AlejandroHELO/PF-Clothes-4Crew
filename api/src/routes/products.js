const { Router } = require('express')
const {
    Products,
    CreateProduct,
    ProductsID,
    UpdateProduct,
} = require('../controller/Products.js')

const productsRouter = Router()

productsRouter.route("/")
.get(Products)
.post(CreateProduct)

productsRouter.route('/:id')
.get(ProductsID)
.put(UpdateProduct)


module.exports = productsRouter