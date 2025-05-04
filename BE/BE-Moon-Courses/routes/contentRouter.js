const express = require("express");
const bodyParser = require("body-parser");
const authenticate = require("../middleware/authenticate");
const {
  getAllCourseContent,
  postNewContent,
} = require("../services/CRUDServices");

const contentRouter = express.Router();
contentRouter.use(bodyParser.json());

contentRouter.all("*", authenticate);
contentRouter.route("/").get(getAllCourseContent).post(postNewContent);

module.exports = contentRouter;
