const express = require("express");
const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, pwd } = req.body;
  let query = {email: email};
  const userWithEmail = await User.findOne(query).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );


  if (!userWithEmail)
    return res
      .status(400)
      .json({ message: "An account with this email does not exist" });

  if (userWithEmail.pwd !== pwd)
    return res
      .status(400)
      .json({ message: "Email or password does not match!" });

  const jwtToken = jwt.sign(
    { id: userWithEmail.id, email: userWithEmail.email },
    process.env.JWT_SECRET
  );
    res.json({message: 'You are logged in as ' + email});
//  res.json({ message: "Welcome Back!", token: jwtToken });
});

module.exports = router;