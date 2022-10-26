const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const router = require('./routes/index')

const server = express()

server.name = 'Pf server'

server.use(express.json())
server.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
server.use(bodyParser.json({limit: '50mb'}));
server.use(cookieParser())
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    next()
})

server.use('/', router);

server.use((err, req, res, next) => {
    const errorCode = err.status
    const errorMessage = err.message
    res.status(errorCode).send(errorMessage)
})

module.exports= server

