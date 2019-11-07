const express = require("express");
const router = express.Router();
//router/user
const user_api = require("./user/user_api");
router.use("/user", user_api);
module.exports = router;
