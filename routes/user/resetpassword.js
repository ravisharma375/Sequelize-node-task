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

router.post("/", (req, res) => {
  let OTP = req.body.OTP;

  key = crypto.pbkdf2Sync(req.body.newpassword, "salt", 10, 10, "sha512");
  newpassword = key.toString("hex");
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      console.log(newpassword);

      if (user) {
        console.log(OTP);
        console.log(user.dataValues.OTP);
        if (user.dataValues.OTP == OTP) {
          User.update(
            { password: newpassword },
            {
              where: {
                OTP: OTP
              }
            }
          )
            .then(user => {
              res.json({
                status: true,
                msg: "password change"
              });
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          res.json({
            msg: "invalid OTP 1"
          });
        }
      } else {
        res.json({
          msg: "invalid OTP 1"
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
