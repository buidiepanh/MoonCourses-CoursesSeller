const express = require("express");
const bodyParser = require("body-parser");
const {
  getAllCategories,
  postNewCategory,
} = require("../services/CRUDServices");

const categoryRouter = express.Router();
categoryRouter.use(bodyParser.json());

categoryRouter.route("/").get(getAllCategories).post(postNewCategory);

module.exports = categoryRouter;
