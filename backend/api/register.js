const express = require("express");
const User = require("../models/usersModel");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { fName, lName, email, pwd } = req.body;
  let query = {email: email};
  const userExists = await User.findOne(query).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  if (userExists) {
    return res.status(409).json({ message: "An account with that email already exists!" });
  }

  const newUser = new User({ fName, lName, email, pwd });
  const savedUser = await newUser.save().catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Cannot register user at the moment!" });
  });

  if (savedUser) res.json({ message: "Your account was successfully created!" });
});

module.exports = router;