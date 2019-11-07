var express = require("express");
var Sequelize = require("sequelize");
var mysql = require("mysql2");

var bodyParser = require("body-parser");
const sequelize = new Sequelize({
  database: "mydb",
  username: "root",
  password: null,
  dialect: "mysql"
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

var db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
