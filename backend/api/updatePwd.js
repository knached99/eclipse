const express = require("express");
const User = require("../models/usersModel");
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/updatePwd', async(req, res)=>{

    const {email, pwd} = req.body;
    
    bcrypt.hash(pwd, 10, async(err, hash)=>{

        if(err){
            console.log(`Unable to hash the password because ${err}`);
        }
        User.pwd = hash 
        const updatePwd = await User.updateOne({email: email}, {$set: {pwd: User.pwd = hash}}).catch((err)=>{
            console.log('Update Error ' + err);
            return res.status(409).json({message: `Unable to update your password because ${err}`});
        });
        if(updatePwd){
            console.log('Password Updated Successfully!');
            res.json({message: 'Your password has been updated!'});
        }
    })

    });

    module.exports = router;