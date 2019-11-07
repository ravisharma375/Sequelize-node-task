const express = require("express");
const jwt = require("jsonwebtoken");

const crypto = require("crypto");
const router = express.Router();
var User = require("../../module/user");
const dotenv = require("dotenv");
dotenv.config();
var config = require("../../config");
let middleware = require("../../middleware");

//

router.post("/", (req, res) => {
  router.use(cors());

  console.log(User);
  let key = crypto.pbkdf2Sync(req.body.password, "salt", 10, 10, "sha512");
  let password = key.toString("hex");

  const record = {
    username: req.body.username,
    email: req.body.email,
    password: password
  };
  console.log(record);

  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    console.log(user);
    if (!user) {
      User.create(record)
        .then(() => {
          // let token = jwt.sign({ email: req.body.email }, config.secret, {
          //   expiresIn: "24h" // expires in 24 hours
          // });
          // return the JWT token for the future API calls
          res.json({
            success: true,
            message: " successful Registration"
            // token: token
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      res.json({
        status: false,
        msg: "email already register"
      });
    }
  });
});
//
module.exports = router;
