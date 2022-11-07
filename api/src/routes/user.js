const { Router } = require('express')
const { expressjwt: jwt } = require('express-jwt');
var jwks = require('jwks-rsa');
const {JWKS_URI, AUDIENCE, ISSUER} = process.env
const {
    allUsers,
    userProfile,
    Admins,
    createUser,
    updateUser,
    updateUserAdmin,
    deleteUser
} = require('../controller/Users.js')

const userRouter = Router()

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

userRouter.route('/')
.get(jwtCheck, allUsers)

userRouter.route('/:id')
.delete(jwtCheck, deleteUser)
.put(jwtCheck, updateUser)

userRouter.route( '/:email')
.post(jwtCheck, userProfile)

userRouter.route('/admin/:id')
.put(jwtCheck, updateUserAdmin)

module.exports = userRouter
