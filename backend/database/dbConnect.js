// Require Mongoose
const mongoose = require('mongoose');
require('dotenv').config()

async function dbConnect(){
// use mongoose to connect this app 
//to our database on mongoDB using 
//the DB_URL (connection string) 
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

}

module.exports = dbConnect;