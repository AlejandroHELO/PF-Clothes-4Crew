const { Router } = require('express')
const { getAddress, CreateAddress, updateAddress } = require('../controller/Address.js')

const addressRouter = Router()

addressRouter.route('/')
.get(getAddress)
.post(CreateAddress)
.put(updateAddress)

module.exports = addressRouter