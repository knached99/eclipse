const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Handle account creation logic 

router.post('/register', async (req, res)=>{
    const { fName, lName, email, pwd } = req.body;

    // Check if user exists 
    const userExists = await User.findOne({where: {email}}).catch( (err)=>{
        console.log('Query error -> ', err);
    } );

    // if user exists 
    if(userExists){
        return res.status(409).json({message: 'A user with that email already exists'});
    }

    // Sign user up
    const newUser = new User({fName, lName, email, pwd});

    const savedUser = await newUser.save().catch((err)=>{
        console.log('Account Creation Error: ', err);
        res.status(500).json({error: 'There was an issue creating your account at the moment'});
    });
    if(savedUser){
        res.json({message: 'Your account was successfully created!'})
    }
});

module.exports = router;