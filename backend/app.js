const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const session = require('express-session')
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const MongoDBStore = require('connect-mongodb-session')(session) // add this package to store the user session id automatically on mongodb
// check on your db, you will have another collection (next to people) which is 'mySessions'
require("dotenv").config();
require("./auth/passport");
const User = require("./models/usersModel");
//const dbConnect = require('./database/dbConnect');
// Establish database connection
//dbConnect();
const middlewares = require("./middlewares");
const api = require("./api");

const app = express();
const MAX_AGE = 1000 * 60 * 60 * 3 // 3hrs

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
    // setting up connect-mongodb-session store
const mongoDBstore = new MongoDBStore({
  uri: process.env.DB_URL,
  collection: 'mySessions',
})
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    name: 'session-id', // cookies name to be put in "key" field in postman
    store: mongoDBstore,
    cookie: {
      maxAge: MAX_AGE, // this is when our cookies will expired and the session will not be valid anymore (user will be log out)
      sameSite: false,
      secure: false, // to turn on just in production
    },
    resave: true,
    saveUninitialized: false,
  })
)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Starting App... ",
  });
});

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;