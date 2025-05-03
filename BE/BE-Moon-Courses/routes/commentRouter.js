const express = require("express");
const bodyParser = require("body-parser");
const {
  postNewComment,
  getAllCommentsByCourse,
  updateCommentLikes,
} = require("../services/CRUDServices");
const authenticate = require("../middleware/authenticate");

const commentRouter = express.Router();
commentRouter.use(bodyParser.json());

commentRouter
  .route("/")
  .get(getAllCommentsByCourse)
  .post(authenticate, postNewComment);
commentRouter.route("/:commentId").put(authenticate, updateCommentLikes);

module.exports = commentRouter;
