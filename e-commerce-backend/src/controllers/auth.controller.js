// using this to hold all the logic for authentication and login
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const token = signToken(newUser._id);

    res.status(200).json({
      status: "success",
      token,
      data: { user: newUser },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "please provide the email and password" });
    }

    const Current_user = await User.findOne({ email }).select("+password");
    if (
      !Current_user ||
      !(await Current_user.comparePassword(password, Current_user.password))
    ) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = signToken(Current_user._id);
    res.status(200).json({
      status: "success",
      token,
      user: {
        id: Current_user._id,
        name: Current_user.name,
        email: Current_user.email,
        role: Current_user.role,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.fpass = async (req, res) => {};
