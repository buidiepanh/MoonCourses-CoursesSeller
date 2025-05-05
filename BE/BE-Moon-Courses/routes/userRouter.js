const express = require("express");
const bodyParser = require("body-parser");

const userRouter = express.Router();
userRouter.use(bodyParser.json());

const {
  getAllUsers,
  postNewUser,
  getAuthenticatedUser,
  getAuthorById,
  updateUser,
} = require("../services/CRUDServices");
const authenticate = require("../middleware/authenticate");

userRouter.all("*", authenticate);
userRouter.route("/").get(getAllUsers).post(postNewUser);
userRouter.route("/author").get(getAuthorById);
userRouter.route("/authenticated-user").get(getAuthenticatedUser);
userRouter.route("/:userId").put(updateUser);

module.exports = userRouter;
