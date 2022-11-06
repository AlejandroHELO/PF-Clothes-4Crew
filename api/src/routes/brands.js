const { Router } = require('express')
const {
    allBrands,
    UpdateBrand,
    CreateBrand,
} = require('../controller/Brand.js')

const brandsRouter = Router()

brandsRouter.route('/')
.get( allBrands)
.post( CreateBrand)
.put( UpdateBrand)


module.exports = brandsRouter