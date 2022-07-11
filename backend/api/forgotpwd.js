const express = require("express");
const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/forgotpwd", async (req, res) => {
  const { email } = req.body;
  let query = {email: email};
  const user = await User.findOne(query).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );


  if (!user)
    return res
      .status(400)
      .json({ message: "An account with this email does not exist" });

 if(user)
    return res 
    .status(200)
    .json({message: 'An email with password reset instructions has been sent to your email'});
});


module.exports = router;