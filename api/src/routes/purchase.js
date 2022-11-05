const { Router } = require('express')
const { getPurchase, CreatePurchase } = require('../controller/Purchase.js')

const purchaseRouter = Router()

purchaseRouter.route('/')
.get(getPurchase)
.post(CreatePurchase)

module.exports = purchaseRouter