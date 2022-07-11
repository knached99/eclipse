const express = require("express");
const registerApi = require("./register");
const loginApi = require("./login");
const forgotPwdApi = require('./forgotpwd');
const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use(forgotPwdApi);


module.exports = router;