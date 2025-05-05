const express = require("express");
const bodyParser = require("body-parser");
const {
  getAllCourses,
  postNewCourse,
  updateCourse,
} = require("../services/CRUDServices");
const authenticate = require("../middleware/authenticate");

const courseRouter = express.Router();
courseRouter.use(bodyParser.json());

courseRouter.route("/").get(getAllCourses).post(authenticate, postNewCourse);
courseRouter.route("/:courseId").put(updateCourse);

module.exports = courseRouter;
