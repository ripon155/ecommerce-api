const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const User = require("./../model/User");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { findOne } = require("../model/ProductModel");
// const sendEmail = require("./../utils/sendEmail");
const Email = require("./../utils/sendEmail");

const gentoken = (id, user, res) => {
  const token = jwt.sign({ id: id }, "secrete", {
    expiresIn: process.env.JWTEXP_IN,
  });

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 + 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "productions") cookieOptions.secure = true;
  res.cookie("jwtcookie", token, cookieOptions);

  res.status(200).json({
    token: token,
    user: {
      user,
    },
  });
};
exports.signup = async (req, res) => {
  try {
    const check = await User.find({ email: req.body.email });
    const newUser = await User.create(req.body);
    const token = jwt.sign({ id: newUser._id }, "secrete", {
      expiresIn: "100d",
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
    console.log(req.body);
    console.log(user);
    const correct = user.correctPassword(password, user.password);
    console.log(correct);
    if (!user || !correct) {
      res.status(401).json({
        message: "incorrect email or password",
      });
    }
    const token = gentoken(user._id, user, res);
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

exports.forgetpassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(400).json({
        message: "No User  found !",
      });
    }
    const passToken = await user.passwordResetTokenGen(user);
    await user.save({ validateBeforeSave: false });
    const fullUrl1 =
      req.protocol +
      "://" +
      req.get("host") +
      "api/ecom/user/resetpasswordtoken/" +
      passToken;

    const options = {};
    options.fullUrl = fullUrl1;
    options.email = user.email;

    user.url = fullUrl1;
    await new Email(user, fullUrl1).sendWelcome();

    // sendEmail(options);

    res.status(200).json({
      link: fullUrl1,
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

exports.reserPassword = async (req, res) => {
  const passwordToken = req.params.token;

  try {
    const reqTokenCheck = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: reqTokenCheck,
    });
    // passwordExpiredDate: { $gt: Date.now() }
    if (!user) {
      res.status(400).json({ message: "No user Exists" });
    }

    user.password = req.body.password;
    user.confirmpassword = req.body.confirmpassword;
    user.passwordResetToken = undefined;
    user.passwordExpiredDate = undefined;
    user.passwordChangedAt = Date.now();

    const updateUser = await user.save();

    const token = gentoken(updateUser._id, updateUser, res);
  } catch (error) {
    res.status(401).json({ error: error });
  }
};

exports.updatePassword = async (req, res) => {
  let user = await User.findById(req.user._id);
  if (!req.body.password) {
    res.status(400).json({ message: "Please Provide Valid Password" });
  }
  if (!user.correctPassword(req.body.confirmPassword, user.password)) {
    res.status(400).json({ message: "invalid password" });
  }

  user.confirmpassword = req.body.confirmPassword;
  user.password = req.body.password;
  await user.save({ validateBeforeSave: false });

  const token = gentoken(user._id, user, res);
};
