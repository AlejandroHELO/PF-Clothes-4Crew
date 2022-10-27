const {Router} = require('express')
const { Products } = require('../controller/Products')


const router = Router()

router.get('products/:id',Products)
module.exports = router