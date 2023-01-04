const routes = require('express').Router()


//middlewares
const {verifyToken} = require('../middlewares/loginRequired')


routes.get('/index',verifyToken,(req, res) => {
    res.send('Welcome to the private page')
})


module.exports=routes