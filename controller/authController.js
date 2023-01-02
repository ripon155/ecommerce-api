const User = require("./../model/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const bcrypt = require("bcrypt");

const gentoken = (id) => {
  return jwt.sign({ id: id }, "secrete", {
    expiresIn: "100h",
  });
};
exports.signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    const token = jwt.sign({ id: newUser._id }, "secrete", {
      expiresIn: "100h",
    });

    res.status(201).json({
      status: "success",
      token: token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "faild",
      error: error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const token = gentoken(user._id);
    const correct = await user.correctPassword(password, user.password);

    if (!user || !correct) {
      res.status(401).json({
        message: "incorrect email or password",
      });
    }

    res.status(200).json({
      status: "success",
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      status: "faild",
      error: error,
    });
  }
};

exports.protectRoute = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1]; // && req.headers.authorization.startwith("Barear")

      if (!token) {
        res.status(401).json({
          message: "you are not authorized",
        });
      }
      const decode = await jwt.verify(token, process.env.JWTTOKEN);
      let fuser = await User.findById(decode.id);
      if (!fuser) {
        res.status(401).json({
          message: "you are not authorized",
        });
      }
      req.user = fuser;
      next();
    }
  } catch (error) {
    res.status(401).json({
      message: error,
    });
  }
};

exports.restricTo = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      res.status(401).json({
        message: "you have not permission to delete the data",
      });
    }
    next();
  };
};
