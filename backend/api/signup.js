const express = require('express');
const User = require('../models/User');
const router = express.Router();
// Account registration endpoint 
app.post('/signup', (request, response)=>{
    // Hash the password and salt it 10 times
    bcrypt.hash(request.body.password, 10)
    .then((hashedPassword)=>{
      // Create a new user instance and save the data
      const user = new User({
        email: request.body.email, 
        password: hashedPassword,
      });
      // Save the new user 
      user.save()
      .then((result)=>{
        response.status(201).send({
          // return success message if user was created successfully 
          message: 'User created successfully',
          result,
        });
      }).catch((error)=>{
        response.status(500).send({
          message: 'Error creating user', error
        });
      });
    })
    .catch((e)=>{
      response.status(500).send({
        message: 'Password was not hashed successfully',
        e,
      });
    });
  });