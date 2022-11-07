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
.get(allUsers)

userRouter.route('/:id')
.get(userProfile)
userRouter.route('/register')
.post(createUser)

userRouter.route( '/:email')
.get(userProfile,jwtCheck)
.put(updateUser)

userRouter.route('/admin/:id')
.put(updateUserAdmin)

module.exports = userRouter
