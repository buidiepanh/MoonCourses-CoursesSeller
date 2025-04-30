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

const getAuthenticatedUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await Users.findById(userId).select("-password");

    if (!user) {
      return res.status(400).json("Cannot get authenticated user!");
    }
    res.status(200).json(user);
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
    const authorId = req.body.author;

    if (!result) {
      res.status(400).json("Cannot add course!");
      return null;
    }

    await Categories.findByIdAndUpdate(categoryId, {
      $push: { courses: result._id },
    });
    await Users.findByIdAndUpdate(authorId, {
      $push: { createdCourses: result._id },
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const result = await Courses.findByIdAndUpdate(
      req.params.courseId,
      { $set: req.body },
      { new: true }
    );

    if (!result) {
      res.status(400).json("Cannot update course!");
      return null;
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

//========================== CATEGORY ====================

const getAllCategories = async (req, res, next) => {
  try {
    const result = await Categories.find({});

    if (!result) {
      res.status(404).json("No categories!");
      return null;
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const postNewCategory = async (req, res, next) => {
  try {
    const result = await Categories.create(req.body);

    if (!result) {
      res.status(400).json("Cannot add category!");
      return null;
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getAuthenticatedUser,
  postNewUser,

  getAllCourses,
  postNewCourse,
  updateCourse,

  getAllCategories,
  postNewCategory,
};
