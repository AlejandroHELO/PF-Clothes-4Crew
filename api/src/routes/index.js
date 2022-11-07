const { Router } = require('express')
const { expressjwt: jwt } = require('express-jwt');
var jwks = require('jwks-rsa');
const {JWKS_URI, AUDIENCE, ISSUER} = process.env
const productsRouter = require("./products")
const categoryRouter = require("./category")
const brandsRouter = require("./brands")
const addressRouter = require("./address")
const userRouter = require('./user')
const purchaseRouter = require('./purchase')
const { 
    MercadoPago 
} = require('../controller/MercadoPago.js')
const {
     UpdateCart, getcart 
    } = require('../controller/cart.js');
const { CreateReview, UpdateReview } = require('../controller/Reviews');
    
var jwtCheck = jwt({
        secret: jwks.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: JWKS_URI
    }),
    audience: AUDIENCE,
    issuer: ISSUER,
    algorithms: ['RS256']
});

const router = Router()
//----- routes inicial------
router.get('/',(req,res)=>{
    res.status(200).send('Server On')
})
//---- Products routes ------
router.use('/products', productsRouter)
router.post('/products/reviews', CreateReview)
router.put('/products/reviews', UpdateReview)

router.post('/mercadopago/:id/:addressId',MercadoPago)

//---- Purchase routes ------
router.use('/purchase', purchaseRouter)


//----- Address router ------
router.use('/address',addressRouter)


//---- Categories routes ------
router.use('/category', categoryRouter)


//---- Brands routes ------
router.use('/brand',brandsRouter)


//--------  Cart-----------
router.get('/cart',getcart)
router.post('/cartupdate/:id',UpdateCart)

//---- Users routes ------
router.use('/users', userRouter)

//middleware para el Not Found
router.use((req, res, next) => {
    res.status(404).end()
})

module.exports = router
