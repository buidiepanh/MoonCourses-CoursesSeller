const Users = require("../models/user");
const Courses = require("../models/course");
const Categories = require("../models/category");
const Comments = require("../models/comment");
const Contents = require("../models/content");

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
    const user = await Users.findById(userId)
      .select("-password")
      .populate("purchasedCourses");

    if (!user) {
      return res.status(400).json("Cannot get authenticated user!");
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const getAuthorById = async (req, res, next) => {
  try {
    const result = await Users.findById(req.body.author);

    if (!result) {
      return res.status(404).json("No users found!");
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
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
    const result = await Courses.find({})
      .populate("category", "title")
      .populate("author", "username")
      .populate("comments", "-course")
      .populate("contents", "-course");

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

//========================== COMMENT ======================

const getAllCommentsByCourse = async (req, res, next) => {
  try {
    const courseId = req.query.courseId;
    const result = await Comments.find({ course: courseId })
      .select("-course")
      .populate("author", "username");

    if (!result) {
      res.status(404).json("No comments!");
      return null;
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const postNewComment = async (req, res, next) => {
  try {
    const result = await Comments.create({
      course: req.body.course,
      author: req.user._id,
      content: req.body.content,
    });
    const courseId = req.body.course;

    if (!result) {
      res.status(400).json("Cannot add comment!");
      return null;
    }

    await Courses.findByIdAndUpdate(courseId, {
      $push: { comments: result._id },
    });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const updateCommentLikes = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const liked = req.body.liked === true;
    var result = {};

    if (liked) {
      result = await Comments.findByIdAndUpdate(
        commentId,
        { $inc: { likes: -1 } },
        { new: true }
      );
    } else {
      result = await Comments.findByIdAndUpdate(
        commentId,
        { $inc: { likes: 1 } },
        { new: true }
      );
    }

    if (!result) {
      res.status(400).json("Cannot update comment's likes!");
      return null;
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

//=========================== COURSE CONTENT =================

const getAllCourseContent = async (req, res, next) => {
  try {
    const courseId = req.body.courseId;
    const result = await Contents.find({ course: courseId });

    if (!result) {
      res.status(404).json("No content!");
      return null;
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const postNewContent = async (req, res, next) => {
  try {
    const result = await Contents.create(req.body);
    const courseId = req.body.course;

    if (!result) {
      res.status(400).json("Cannot add comment!");
      return null;
    }

    await Courses.findByIdAndUpdate(courseId, {
      $push: { contents: result._id },
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getAuthenticatedUser,
  getAuthorById,
  postNewUser,

  getAllCourses,
  postNewCourse,
  updateCourse,

  getAllCategories,
  postNewCategory,

  getAllCommentsByCourse,
  postNewComment,
  updateCommentLikes,

  getAllCourseContent,
  postNewContent,
};
