const {DataTypes}= require('sequelize')
const {sequelize, SynchoneDB} = require('../config/database')



const User= sequelize.define("User",{
    firstName:{
        type:DataTypes.STRING,
        defaultValue:null
    },
    lastName:{
        type:DataTypes.STRING,
        defaultValue:null
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    password:{
      type:DataTypes.STRING,
      allowNull: false  
    }},
    {
        timestamps: false
    }
)

SynchoneDB()


module.exports=User