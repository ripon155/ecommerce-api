const User = require("./../model/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { findOne } = require("../model/ProductModel");

const gentoken = (id) => {
  return jwt.sign({ id: id }, "secrete", {
    expiresIn: "100h",
  });
};
exports.signup = async (req, res) => {
  try {
    const check = await User.find({ email: req.body.email });

    // if (check) {
    //   res.status(400).json({
    //     message: req.body.email + " already taken",
    //   });
    // }
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
      status: "login success",
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

exports.forgetpassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(400).json({
        message: "User not found !",
      });
    }
    const passToken = await user.passwordResetTokenGen(user);
    await user.save({ validateBeforeSave: false });

    const transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "1d419918c93f55",
        pass: "c6feaabd48bad1",
      },
    });

    const fullUrl =
      req.protocol +
      "://" +
      req.get("host") +
      "api/ecom/user/resetpasswordtoken/" +
      passToken;

    const url = ``;

    const mailOptions = {
      from: '"Example Team" <from@example.com>',
      to: "user1@example.com, user2@example.com",
      subject: "Nice Nodemailer test",
      text: fullUrl,
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    });

    res.status(200).json({
      token: fullUrl,
      user: user,
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

exports.reserPassword = async (req, res) => {
  const passwordToken = req.params.token;
  console.log(passwordToken);
  try {
    const reqTokenCheck = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    console.log(reqTokenCheck);

    const user = await User.findOne({
      passwordResetToken: reqTokenCheck,
    });
    // passwordExpiredDate: { $gt: Date.now() }
    if (!user) {
      res.status(400).json({ message: "No user Exists" });
    }
    console.log(user);
    user.password = req.body.password;
    user.confirmpassword = req.body.confirmpassword;
    user.passwordResetToken = undefined;
    user.passwordExpiredDate = undefined;
    user.passwordChangedAt = Date.now();

    const updateUser = await user.save();

    const token = gentoken(updateUser._id);

    res.status(201).json({
      message: "success",
      token: token,
      updateUser: {
        updateUser,
      },
    });
  } catch (error) {
    res.status(401).json({ error: error });
  }
};
