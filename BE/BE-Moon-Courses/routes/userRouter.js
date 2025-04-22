const express = require("express");
const bodyParser = require("body-parser");

const userRouter = express.Router();
userRouter.use(bodyParser.json());

const { getAllUsers, postNewUser } = require("../services/CRUDServices");

userRouter.route("/").get(getAllUsers).post(postNewUser);

module.exports = userRouter;
