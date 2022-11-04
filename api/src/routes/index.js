const { Router } = require('express')
const { 
    MercadoPago 
} = require('../controller/MercadoPago.js')
const {
     UpdateCart, getcart 
    } = require('../controller/cart.js')


const {
    allCategory,
    UpdateCategory,
    CreateCategory,
} = require('../controller/Category.js')
const {
    allBrands,
    UpdateBrand,
    CreateBrand,
} = require('../controller/Brand.js')
const {
    Products,
    CreateProduct,
    ProductsID,
    UpdateProduct,
} = require('../controller/Products.js')
const {
    allUsers,
    userProfile,
    Admins,
    createUser,
    updateUser,
    updateUserAdmin,
} = require('../controller/Users.js')
const { getPurchase, CreatePurchase } = require('../controller/Purchase.js')
const { getAddress, CreateAddress, updateAddress } = require('../controller/Address.js')

const router = Router()

//---- Products routes ------
router.get('/products', Products)
router.get('/products/:id', ProductsID)
router.post('/products', CreateProduct)
router.put('/products/:id', UpdateProduct)
router.post('/mercadopago',MercadoPago)

//---- Purchase routes ------
router.get('/purchase',getPurchase)
router.post('/purchase',CreatePurchase)

//----- Address router ------
router.get('/address',getAddress)
router.post('/address',CreateAddress)
router.put('/address',updateAddress)

//---- Categories routes ------
router.get('/category', allCategory)
router.post('/category', CreateCategory)
router.put('/category', UpdateCategory)

//---- Brands routes ------
router.get('/brand', allBrands)
router.post('/brand', CreateBrand)
router.put('/brand', UpdateBrand)

//--------  Cart-----------
router.get('/cart',getcart)
router.post('/cartupdate/:id',UpdateCart)

//---- Users routes ------
router.get('/users', allUsers)
router.get('/users/:id', userProfile)
router.get('/users/admins', Admins)
router.post('/users/register', createUser)
router.put('/users/:id', updateUser)
router.put('/users/admin/:id', updateUserAdmin)

//middleware para el Not Found
router.use((req, res, next) => {
    res.status(404).end()
})

module.exports = router
