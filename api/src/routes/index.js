const {Router} = require('express')
const { Products,CreateProduct, ProductsID,UpdateProduct } = require('../controller/Products.js')


const router = Router()

router.get('/products',Products)
router.get('/products/:id',ProductsID)
router.post('/products',CreateProduct)
router.put('/products/:id',UpdateProduct)
module.exports = router