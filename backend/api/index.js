const express = require("express");
const registerApi = require("./register");
const loginApi = require("./login");
const forgotPwdApi = require('./forgotpwd');
const verifyCodeApi = require('./verifyCode');
const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use(forgotPwdApi);
router.use(verifyCodeApi);

module.exports = router;