const Users = require("../models/user");

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

module.exports = {
  getAllUsers,
  postNewUser,
};
