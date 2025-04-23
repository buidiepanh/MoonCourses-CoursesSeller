const Users = require("../models/user");
const Courses = require("../models/course");
const Categories = require("../models/category");

//========================= USER =====================

const getAllUsers = async (req, res, next) => {
  try {
    const result = await Users.find({});

    if (!result) {
      res.status(404).json("No users!");
      return null;
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const postNewUser = async (req, res, next) => {
  try {
    const result = await Users.create(req.body);

    if (!result) {
      res.status(400).json("Cannot add user!");
      return null;
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

//========================= COURSES ====================

const getAllCourses = async (req, res, next) => {
  try {
    const result = await Courses.find({});

    if (!result) {
      res.status(404).json("No courses!");
      return null;
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const postNewCourse = async (req, res, next) => {
  try {
    const result = await Courses.create(req.body);
    const categoryId = req.body.category;

    if (!result) {
      res.status(400).json("Cannot add course!");
      return null;
    }

    await Categories.findByIdAndUpdate(categoryId, {
      $push: { courses: result._id },
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  postNewUser,

  getAllCourses,
  postNewCourse,
};
