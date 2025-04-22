const express = require("express");
const bodyParser = require("body-parser");

const userRouter = express.Router();
userRouter.use(bodyParser.json());

module.exports = userRouter;
