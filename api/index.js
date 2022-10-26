require('dotenv').config()
const server = require('./src/app')
const {PORT} = process.env
const {dbConn} = require('./src/db')


dbConn();

server.listen(PORT, () => {
    console.log('Server rised and listening at port '+PORT)
})
