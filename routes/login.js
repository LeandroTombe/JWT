//importing modules
const routes = require('express').Router()
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken')

// importing user context
const User = require("../models/user");
// Register
routes.post("/register", async (req, res) => {
    try {
        const {firstName, lastName,email,password} = req.body

        if (!(email && password && firstName && lastName)) {
            res.status(400).send("All input are required");
        };

        // check if user already exist
        // Validate if user exist in our database
        newEmail= await User.findOne({ where: { email:email}})
        if (newEmail){
            return res.status(409).send("User Already Exist with this email address");
        };

        //Encrypt user password
        const salt = bcrypt.genSaltSync(10)
        const encryptedPassword = bcrypt.hashSync(password,salt)

        // Create user in our database
        const user =await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        })
        
        res.status(201).json(user);

       
    } catch (err) {
        console.log(err);
    }


});


// Login
routes.post("/login", async (req, res) => {
   email=req.body.email
   password=req.body.password
   //check if email is exist
   const user= await User.findOne({ where: { email: email }})

   if(!user){
    return res.status(401).json({ message: 'Authentication failed. Invalid email' });
   }

   if(!bcrypt.compareSync(password, user.password)){
    return res.status(401).json({ message: 'Authentication failed. Invalid password' });
   }

   const token=jwt.sign({email:user.email,id:user.id},process.env.TOKEN_KEY,{
                                expiresIn:process.env.EXPIRES
                        })
    
    return res.status(201).json({
        ok: true,
        usuario: user,
        token,
    }) 
});

module.exports=routes