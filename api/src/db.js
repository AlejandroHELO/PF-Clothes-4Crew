require('dotenv').config()
const mongoose = require('mongoose');

const dbConn = () => {
    const DB_URI = process.env.DB_URI;
    const connectionString = DB_URI
    // conexion a mongodb
    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    //devuelve promesa
    .then(() => {
        console.log('Database connected to ATLAS')
    }).catch(err => {
        console.error('Connection Error: ',err)
    })
};

module.exports = { dbConn }