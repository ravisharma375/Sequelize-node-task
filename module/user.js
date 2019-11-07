const express = require("express");
const crypto = require("crypto");
const db = require("../db/db");
var Sequelize = require("sequelize");
var router = express.Router();
module.exports = db.sequelize.define(
  `user`,
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    OTP: {
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false
  }
);
