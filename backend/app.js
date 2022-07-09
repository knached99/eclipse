const bcrypt = require("bcrypt"); // Bycrypt is a password hash library
const jwt = require('jsonwebtoken'); // Compares hashed pwd to plaintext pwd
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// Cors will be able to run both the client and server on the same port 
var cors = require("cors");
// Import Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
// Require Auth function 
const auth = require("./auth");

// Require database connection to Mongoose
const dbConnect = require('./database/dbConnect');

// Handle CORS Errors 
app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');

  res.setHeader(
    'Access=Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
})
// Require any models here 
const User = require("./models/usersModel");

// Connect to the database 
dbConnect();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routing methods
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



// Login endpoint 
app.post('/login', (request, response)=>{
  // Check if the email exists 
  User.findOne({ email: request.body.email})
  // If email does exist 
  .then((user)=>{
    // Compare the password entered and the hashed password found 
    bcrypt.compare(request.body.password, user.password)
    .then((passwordCheck)=>{
      // Check if password matches 
      if(!passwordCheck){
        return response.status(400).send({
          message: 'Password is incorrect',
          error, 
        });
      }
      // Create  JWT Token 
      const token = jwt.sign({
        userId: user._id, 
        userEmail: user.email,
      },
      "RANDOM-TOKEN",
      {expiresIn: "24h"}
      );
      // Return success message 
      response.status(200).send({
        message: 'Login successful',
        email: user.email,
        token,
      });
    })
    .catch((error)=>{
      response.status(400).send({
        message: 'Passwords do not match',
        error,
      });
    });
  })
  // catch error if email does not exist 
  .catch((e)=>{
    response.status(400).send({
      message: 'Email not found',
      e,
    });
  });
});

// Protect endpoints from unauthorized access
// free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
});
module.exports = app;
