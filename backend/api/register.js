const express = require("express");
const User = require("../models/usersModel");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { fName, lName, email, pwd } = req.body;

  const alreadyExistsUser = await User.findOne({email}).catch(
    (err) => {
      console.log("Error: ", err);
    }
  );

  if (alreadyExistsUser) {
    return res.status(409).json({ message: "User with email already exists!" });
  }

  const newUser = new User({ fName, lName, email, pwd });
  const savedUser = await newUser.save().catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ error: "Cannot register user at the moment!" });
  });

  if (savedUser) res.json({ message: "Thanks for registering" });
});

module.exports = router;