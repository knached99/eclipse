const express = require("express");
const User = require("../models/usersModel");
//const OtpVerification = require("../models/userOtpModal");

const nodemailer = require('nodemailer');
const router = express.Router();


router.post('/forgotpwd', async(req, res)=>{
  const {email} = req.body;
  let query = {email: email};
  const userExists = await User.findOne(query).catch((err)=>{
    console.log('QUERY ERROR ' + err);
  });

  if(!userExists){
    return res.status(409).json({message: 'An account with that email does not exist'});
  }
  else{
    // Define new user Object 
    const newUser = new User ({email});
    let code = Math.floor(100000 + Math.random() * 900000);
    const updateCode = await newUser.updateOne({email: email}, {$set: {verificationCode: code}}).catch((err)=>{
      console.log('Update Query Error ' + err);
      return res.status(409).json({message: 'Update Query Error' + err});
      
    });
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
        subject: 'Account Verification',
        text: 'Hey, we\'ve recieved a password reset request from you, please enter this six digit verification code to continue: ' + code
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(500).json({ error: "There was an issue emailing your verification code" });
        } else {
          console.log('Email sent: ' + info.response);
          res.json({message: 'We sent a six digit verification code to this email ' + email});
        }
      });

    }
  }
});

module.exports = router;

