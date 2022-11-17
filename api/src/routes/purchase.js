const { Router } = require('express')
const { getPurchase, CreatePurchase, updatePurchase } = require('../controller/Purchase.js')

const purchaseRouter = Router()

purchaseRouter.route('/')
.get(getPurchase)
.post(CreatePurchase)

purchaseRouter.route('/:id')
.put(updatePurchase)


module.exports = purchaseRouter