// import libraries from sequelize dependecies
const Sequelize = require('sequelize');

//import enviroments variables
const dotenv=require('dotenv').config()



const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
})


const dbConnection = async (req, res) => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const SynchoneDB=async () => {
    try {
        await sequelize.sync(/*{ force: true }*/);
        console.log('table User loaded successfully');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
  };



module.exports={
    dbConnection,
    sequelize,
    SynchoneDB
}