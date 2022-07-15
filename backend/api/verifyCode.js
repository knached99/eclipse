const express = require("express");
const User = require("../models/usersModel");
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/verifyCode', async(req, res)=>{
    const {email, code} = req.body;
  
    const getCode = User.findOne({email : email}, function(err, result){
        console.log(result.verificationCode);
        if(err){
            console.log('Query Error ' + err);
        }
        else if(getCode){
           
            if(code !== result.verificationCode){
                console.log('Invalid code entered');
                return res.status(400).json({message: 'Invalid code entered'});
            }
            else{
                console.log('Your code was verified');
                res.json({message: 'Your code was verified!'});
            }
        }
    })
    /*const getCode = User.findOne({email: email}, function(err, result) {
       if(err){
        console.log('Database Error' + err);
        return res.status(400).json({message: 'SQL Query Error'});
       }
       else if(getCode){
        verificationCode = result.verificationCode;
        if(code !== verificationCode){
            return res.status(400).json({message: 'Invalid code entered'});
        }
        else{
            res.json({message: 'Your code was verified'});
        }
       }
      }); */
});

module.exports = router;