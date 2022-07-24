const express = require("express");
const User = require("../models/usersModel");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/register', async(req, res)=>{

  const {fName, lName, email, pwd, termsAgreement} = req.body; 
  let query = {email: email};

  const userExists = await User.findOne(query).catch((err)=>{
    console.log('Search Query Error: ' + err);
  });

  if(userExists){
    return res.status(409).json({message: 'An account with the email ' + email + " already exists"});
  }
  // Else if user does not exist 
  let acctVerificationCode = Math.floor(100000 + Math.random() * 900000);
  const newUser = new User({fName, lName, email, pwd, acctVerificationCode, termsAgreement});
  
  // Hash Password
  bcrypt.hash(pwd, 10, async (err, hash) => {
    if (err)
      return res.status(400).json({ message: 'error while hashing the password' })

    newUser.pwd = hash
    const savedUser = await newUser.save().catch((err)=>{
      console.log('Error ' + err);
      return res.status(409).json({message: 'Error creating account at the moment ' + err});
    });
    if(savedUser){
      console.log('Account created! ');
      res.json({message: 'Your account was successfully created!'}); 
    }

  });
});

module.exports = router;