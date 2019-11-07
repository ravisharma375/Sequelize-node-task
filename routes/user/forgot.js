const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const router = express.Router();
var User = require("../../module/user");
const dotenv = require("dotenv");
dotenv.config();
var config = require("../../config");
let middleware = require("../../middleware");
//
router.post("/", (req, res, next) => {
  const { email } = req.body;
  //following if statement check the user email
  if (!email) {
    res.json("email required");
  }
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      //generate otp
      var optgen = () => {
        // Declare a digits variable
        // which stores all digits
        var digits = "0123456789";
        var OTP = "";
        for (let i = 0; i < 6; i++) {
          OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
      };
      var onetime = optgen();
      console.log(onetime);
      //end
      //insert otp
      User.update(
        { OTP: onetime },
        {
          where: {
            email: req.body.email
          }
        }
      ).then(user => {
        res.send(user);
      });

      //end
      //sebding email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "somethingdifferent375@gmail.com",
          pass: "9004745064"
        }
      });
      const mailOptions = {
        from: "email",
        to: email,
        subject: "ONE TIME PASSWORD To RESET PASSWORD",
        text: `Your ONE TIME PASSWORD IS : ${onetime}`
      };
      console.log("sending mail");
      transporter.sendMail(mailOptions, function(err, response) {
        if (err) {
          console.log("There was an error", err);
        } else {
          console.log("here is the response", response);
          res.status(200).json("otp  sent to email");
        }
      });
      //end
    })
    .catch(err => {
      res.json({
        status: false,
        msg: "email does not exist"
      });
    });
});

module.exports = router;
