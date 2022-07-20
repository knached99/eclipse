const express = require("express");
const User = require("../models/usersModel");
const router = express.Router();


router.post('/verifyAccount', async(req, res)=>{
    const {email, code} = req.body;
    
    const getCode = await User.findOne({email: email});
    console.log(getCode.verificationCode);
    if(code != getCode.verificationCode){
        console.log('Incorrect verification code');
        res.json({message: 'Incorrect verification code entered, check your email and try again'});
    }
    else{
        const newUser = new User({email});
        const updateStatus = await newUser.updateOne({email: email}, {$set: {verified: "true"}}).catch((err)=>{
            console.log('Update Query Error ' + err);
            res.json({message: 'Something went wrong'});
        });
        if(updateStatus){
            console.log('The account ' + email  + " is verified!");
            res.json({message: 'Your account is now verified!'});
        }
    }
});

module.exports = router;