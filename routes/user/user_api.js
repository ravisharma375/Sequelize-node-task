const express = require("express");
const router = express.Router();
//signup
const signup = require("./signup");
router.use("/signup", signup);
//login
const login = require("./login");
router.use("/login", login);
//forgot password
const forgot = require("./forgot");
router.use("/forgot", forgot);
//resetpassword
const resetpassword = require("./resetpassword");
router.use("/resetpassword", resetpassword);
module.exports = router;
