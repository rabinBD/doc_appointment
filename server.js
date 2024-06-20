const express = require('express');
const morgan = require('morgan');
const pool = require('./config/db');
const dotenv = require ('dotenv').config()
const app = express()

//middlewares
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/medplus/auth', require('./routes/userroutes'));
app.use('/api/medplus/admin',require('./routes/adminroutes'));

//connection of Database and Server
pool.query('SELECT 1').then(()=> {
    //mysql 
    console.log('Mysql_db connected');
    //listen to server
    app.listen(process.env.PORT, () => {
        console.log(`Server is Running successfully: ${process.env.PORT}`);
    })
}).catch((Error) =>{
    console.log(Error);
});



