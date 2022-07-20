const express = require("express");
const User = require("../models/usersModel");
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, pwd } = req.body
  let query = {email: email };
  const user = await User.findOne(query) // finding user in db
  if (!user) {
    return res.status(400).json({ message: 'An account with the email ' + email + " does not exist" });
  }

  const matchPassword = await bcrypt.compare(pwd, user.pwd)
  if (matchPassword) {

    if(user.verified== false){
      return res.status(400).json({message: 'Your account is not verified'});
    }
    else{
      const userSession = { email: user.email } // creating user session to keep user loggedin also on refresh
      req.session.user = userSession // attach user session to session object from express-session
  
      return res
        .status(200)
        .json({ message: 'You have logged in successfully', userSession }) // attach user session id to the response. It will be transfer in the cookies
    }

  } else {
    return res.status(400).json({ message: 'Credentials you entered are not valid' });
  }
})


module.exports = router;