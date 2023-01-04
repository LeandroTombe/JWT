//importing modules
const routes = require('express').Router()
const dotenv= require('dotenv').config()
const jwt = require('jsonwebtoken')



routes.post("/token", (req, res) => {
    console.log(req.headers["authorization"])
    const {id,firstName, lastName} = req.body

    jwt.sign({id, firstName, lastName},process.env.TOKEN_KEY , (err,token) => {
        if(err){
           res.status(400).send({msg : 'Error'})
        }
        else {
           res.send({msg:'success' , token:token})
        }
    })
})

module.exports=routes