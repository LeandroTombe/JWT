const express= require('express');
const dotenv= require('dotenv').config()
const bodyParser = require('body-parser')


//importing database
const {dbConnection} = require('./config/database')

//importing routes for our aplication
const LoginRoutes = require('./routes/login')
const tokenRoutes= require('./models/token')
const indexRoutes= require('./routes/index')

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(LoginRoutes)
app.use(tokenRoutes)
app.use(indexRoutes)



const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
    dbConnection()
})