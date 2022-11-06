const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const router = require('./routes/index')
const cors = require('cors')


const server = express()

server.name = 'Pf server'

server.use(express.json())
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
server.use(bodyParser.json({ limit: '50mb' }))
server.use(cookieParser())
server.use(morgan('dev'))

server.use(cors())
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, DELETE, PUT, OPTIONS'
    )
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
})

server.use('/', router)

// Error catching endware.
server.use((error, req, res, next) => {
    console.log(error)
    const errorCode = error.status
    const errorName = error.name
    const errorMessage = error.message
    res.status(errorCode).send(errorName + errorMessage)
})

module.exports = server
