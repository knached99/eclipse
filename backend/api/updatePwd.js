const express = require("express");
const User = require("../models/usersModel");
const router = express.Router();

router.post('/updatePwd', async(req, res)=>{

    const {email, pwd} = req.body;

    const updatePwd = await User.updateOne({email: email}, {$set: {pwd: pwd}}).catch((err)=>{
    console.log('Query Error' + err);
    return res.status(409).json({messge: 'Update Error ' + err});
    });
    if(updatePwd){
        console.log('Password successfully updated!');
        res.redirect('http://localhost:3000/login');
    }
    else{
        console.log('Unable to update your password');
        res,json({message: 'Unable to update your password'});
    }
    });

    module.exports = router;