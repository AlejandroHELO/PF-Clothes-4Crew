const { Router } = require('express')
const {
    allCategory,
    UpdateCategory,
    CreateCategory,
} = require('../controller/Category.js')

const categoryRouter = Router()

categoryRouter.route("/")
.get(allCategory)
.post( CreateCategory)
.put(UpdateCategory)

module.exports = categoryRouter 