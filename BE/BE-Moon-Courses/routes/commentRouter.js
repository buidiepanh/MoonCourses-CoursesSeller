const express = require("express");
const bodyParser = require("body-parser");
const {
  postNewComment,
  getAllCommentsByCourse,
} = require("../services/CRUDServices");

const commentRouter = express.Router();
commentRouter.use(bodyParser.json());

commentRouter.route("/").get(getAllCommentsByCourse).post(postNewComment);
module.exports = commentRouter;
