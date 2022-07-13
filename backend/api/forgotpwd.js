const express = require("express");
const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/forgotpwd', async(req, res)=>{

  const {email} = req.body;
   let query = {email: email};
   const userExists = await User.findOne(query).catch((err)=>{
    console.log('Query Error ' + err);
    res.status(500).json({error: 'Query errorr occurred ' + err});
   });
   if(!userExists){
    return res.status(409).json({message: 'An account with that email does not exist'});
   }
   // Create 6 digit code 
   let code = Math.floor(100000 + Math.random() * 900000);
   let myQuery = {email: req.body.email};
   let newCode = {$set: {verificationCode: code}};
   const newUser = new User({email});
   const updateCode = await newUser.updateOne(myQuery, newCode,  function(err, res){
    if(err){
      console.log('Query Error' + err);
      return res.status(500).json({error: 'Update query error ' + err});
    }
    if(updateCode){
      let transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "f73748fdfbd962",
          pass: "41445c2690e986"
        }
      });
      
      let mailOptions = {
        from: 'f73748fdfbd962@inbox.mailtrap.io',
        to: req.body.email,
        subject: 'Account Recovery',
        text: 'Hey, looks like you\'ve initiated an account recovery, please enter this six-digit code to continue ' + code
      };
      transporter.sendMail(mailOptions, function(error, info){
        if(error){
          console.log('Email error ' + error);
          return res.status(500).json({error: 'There was an issue sending your verification code'});
        }
        else{
          console.log('Email sent: ' + info.response);
          res.json({message: 'A verification code was sent to your email at ' + req.body.email});
        }
      })
    }
   })
});

module.exports = router;