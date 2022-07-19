const express = require("express");
const User = require("../models/usersModel");
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/verifyAccount', async(req, res)=>{
    const {email, code} = req.body;
  
    const getCode = User.findOne({email : email}, function(err, result){
        console.log(result.verificationCode);
        if(err){
            console.log('Query Error ' + err);
        }
        else if(getCode){
           
            if(code != result.verificationCode){
                console.log('Invalid code entered');
                res.json({message: 'Invalid code entered'});
            }
            else{
                console.log('Your account was verified!');
                res.json({message: 'Your account was verified!'});
            }
        }
    })
 
});

module.exports = router;