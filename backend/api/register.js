const express = require("express");
const User = require("../models/usersModel");
const nodemailer = require('nodemailer');
const router = express.Router();

// Initialize node email 

router.post("/register", async (req, res) => {
  const { fName, lName, email, pwd, termsAgreement } = req.body;
  let query = {email: email};
  const userExists = await User.findOne(query).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  if (userExists) {
    return res.status(409).json({ message: "An account with that email already exists!" });
  }
  let verificationCode = Math.floor(100000 + Math.random() * 900000);
  let verified = false;
  const newUser = new User({ fName, lName, email, pwd, verificationCode, verified, termsAgreement});
  const savedUser = await newUser.save().catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Cannot register user at the moment!" });
  });
// res.json({ message: "Your account was successfully created!" });
  if (savedUser){
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
    text: 'Hey,' + req.body.fName + ', thank you for creating an account with us! To fully setup your account you must enter this verification code: ' + verificationCode
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.status(500).json({ error: "There was an issue emailing your verification code" });
    } else {
      console.log('Email sent: ' + info.response);
      res.json({message: 'Your account was created but you must verify your email to continue. We sent your verification code to ' + req.body.email});
    }
  });
}});

module.exports = router;