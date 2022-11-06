const { Router } = require('express')
const {
    allUsers,
    userProfile,
    Admins,
    createUser,
    updateUser,
    updateUserAdmin,
} = require('../controller/Users.js')

const userRouter = Router()

userRouter.route('/')
.get(allUsers)

userRouter.route('/:id')
.get(userProfile)
userRouter.route('/register')
.post(createUser)

userRouter.route('/:id')
.put(updateUser)

userRouter.route('/admin/:id')
.put(updateUserAdmin)

module.exports = userRouter
