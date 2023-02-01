require('dotenv').config()
const server = require('./src/app')
const { PORT } = process.env
const { dbConn } = require('./src/db') //conectamos la DB
//comentario
server.listen(PORT, () => {
    console.log(`Server rised and listening at port ${PORT}`)
})

dbConn()
