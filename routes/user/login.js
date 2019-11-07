const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const crypto = require("crypto");
const router = express.Router();
var User = require("../../module/user");
const dotenv = require("dotenv");
dotenv.config();
var config = require("../../config");
let middleware = require("../../middleware");
//login
router.post("/", (req, res, next) => {
  //For the given email fetch email from DB
  var email = req.body.email;
  var password = req.body.password;
  key = crypto.pbkdf2Sync(password, "salt", 10, 10, "sha512");
  // password = key.toString("hex");
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      //if code len1
      if (User) {
        //nested if code nes1

        if (user.dataValues.password == key.toString("hex")) {
          let token = jwt.sign({ email: email }, config.secret, {
            expiresIn: "24h" // expires in 24 hours
          });
          // return the JWT token for the future API calls
          res.json({
            success: true,
            message: "Authentication successful!",
            token: token
          });
        } else {
          res.send({
            code: 204,
            msg: "Password does not match"
          });
        }
      } else {
        res.json({
          msg: "email does not exist code len1 "
        });
      }
    })
    .catch(err => {
      res.json({
        status: false,
        msg: "email does not exist"
      });
    });
});

module.exports = router;
