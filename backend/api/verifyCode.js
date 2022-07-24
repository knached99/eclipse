const express = require("express");
const User = require("../models/usersModel");
const router = express.Router();


router.post('/verifyCode', async(req, res)=>{
    const {email, code} = req.body;
    
    const getCode = await User.findOne({email: email});
    console.log(getCode.optCode);
    if(code != getCode.optCode){
        console.log('Incorrect verification code');
        res.json({message: 'Incorrect verification code entered, check your email and try again'});
    }
    else{
        const newUser = new User({email});
        const updateStatus = await newUser.updateOne({email: email}, {$set: {otpVerified: true}}).catch((err)=>{
            console.log('Update Query Error ' + err);
            res.json({message: 'Something went wrong'});
        }).then((response)=>{
            console.log(response);
            console.log('The account ' + email  + " is verified!");
            res.json({message: 'Your account is now verified!'});
        });
       /* if(updateStatus){
           
        } */
    }
});

module.exports = router;