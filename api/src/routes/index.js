const { Router } = require('express')
const productsRouter = require("./products")
const categoryRouter = require("./category")
const brandsRouter = require("./brands")
const addressRouter = require("./address")
const userRouter = require('./user')
const purchaseRouter = require('./purchase')
const comments = require ('./comments.js')
const colors = require ('./colors.js')
const favoriteRouter = require('./favorite')
const { 
    MercadoPago, GetMP 
} = require('../controller/MercadoPago.js')
const {
    UpdateCart, getcart 
} = require('../controller/cart.js');
const { Reviews, CreateReview, UpdateReview } = require('../controller/Reviews');
const { expressjwt: jwt } = require('express-jwt');
var jwks = require('jwks-rsa');
const {JWKS_URI, AUDIENCE, ISSUER} = process.env
    
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
router.get('/reviews', Reviews)
router.post('/reviews', CreateReview)
router.put('/reviews', UpdateReview)

router.post('/mercadopago/:id/:addressId',MercadoPago)
router.get('/mercadopago/:id',GetMP)

//---- Purchase routes ------
router.use('/purchase', purchaseRouter)

//----- Address router ------
router.use('/address', addressRouter)

//---- Categories routes ------
router.use('/category', categoryRouter)

//---- Brands routes ------
router.use('/brand', brandsRouter)

//---- Colors routes ------
router.use('/colors', colors)

//-------- Cart routes -----------
router.get('/cart',getcart)
router.post('/cartupdate/:id',UpdateCart)

//---- Users routes ------
router.use('/users', userRouter)

//------ Comments routes ---------
router.use('/comments', comments)

//-------- favoritos ----------
router.use('/favorites', favoriteRouter)

//middleware para el Not Found
router.use((req, res, next) => {
    res.status(404).end()
})

module.exports = router
