const express = require("express");
const bodyParser = require("body-parser");
const { registerAccount, loginAccount } = require("../services/AuthenServices");

const authenRouter = express.Router();
authenRouter.use(bodyParser.json());

authenRouter.route("/register").post(registerAccount);
authenRouter.route("/login").post(loginAccount);

module.exports = authenRouter;
