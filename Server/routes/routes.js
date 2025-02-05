const express = require("express");
const route = express.Router();
const Controll = require("../controller/Apicontroll");

//Login and signup api
route.post("/api/login", Controll.LoginPage);

route.post("/api/signup", Controll.SignupPage);

module.exports = route;
