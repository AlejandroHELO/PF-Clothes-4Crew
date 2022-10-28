const { Router } = require('express')
const { allCategory, UpdateCategory, CreateCategory } = require('../controller/Category.js')
const { allBrands, UpdateBrand, CreateBrand } = require('../controller/Brand.js')
const { Products, CreateProduct, ProductsID, UpdateProduct } = require('../controller/Products.js')
const { allUsers, userProfile, createUser, updateUser, updateUserAdmin } = require('../controller/Users.js')

const router = Router()

//---- Products routes ------
router.get('/products', Products)
router.get('/products/:id', ProductsID)
router.post('/products', CreateProduct)
router.put('/products/:id', UpdateProduct)

//---- Categories routes ------
router.get('/category', allCategory)
router.post('/category', CreateCategory)
router.put('/category', UpdateCategory)

//---- Brands routes ------
router.get('/brand', allBrands)
router.post('/brand', CreateBrand)
router.put('/brand', UpdateBrand)

//---- Users routes ------
router.get('/users', allUsers)
router.get('/users/:id', userProfile)
router.post('/users/register', createUser)
router.put('/users/:id', updateUser)
router.put('/users/admin/:id', updateUserAdmin)

//middleware para el Not Found
router.use((req, res, next) => {
    res.status(404).end()
});

module.exports = router