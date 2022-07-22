var express = require('express');
var session = require('express-session');
//var random = require("random");
const mongoose = require('mongoose')
require("dotenv").config();
const api = require("./api");
const app = express();

// Connect to the database 
console.log('Connecting to Mongodb...');
mongoose.connect(
    
    process.env.DB_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log('Successfully conntected to MongoDB Atlas!');
    }).catch((error)=>{
        console.log('Unable to conect to MongoDB Atlas');
        console.log(error);
    })


module.exports = app;