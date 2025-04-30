const Users = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const registerAccount = async (req, res, next) => {
  try {
    const hashPass = await bcrypt.hash(req.body.password, 10);
    const checkUser = await Users.findOne({ email: req.body.email });

    if (checkUser) {
      return res.status(400).json("Email already exist!");
    }

    const result = await Users.create({
      username: req.body.username,
      email: req.body.email,
      password: hashPass,
    });

    if (!result) {
      res.status(400).json("Cannot register!");
      return null;
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const loginAccount = async (req, res, next) => {
  try {
    const foundUser = await Users.findOne({ email: req.body.email }).lean();

    if (foundUser) {
      const correctPass = await bcrypt.compare(
        req.body.password,
        foundUser.password
      );

      if (correctPass) {
        const token = jwt.sign(foundUser, process.env.JWT_SECRET_KEY, {
          expiresIn: process.env.JWT_EXPIRED_IN,
        });
        res.status(200).json({ accessToken: token });
      } else {
        return res.status(404).json("Incorrect password!");
      }
    } else {
      return res.status(404).json("No email found!");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerAccount,
  loginAccount,
};
