const express = require("express");
const authController = require("./../controller/authController");

const {
  signup,
  login,
  forgetpassword,
  reserPassword,
  updatePassword,
  protectRoute,
} = authController;
const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").get(login);

router.route("/forgotpassword").post(forgetpassword);
router.route("/resetpasswordtoken/:token").get(reserPassword);
router.route("/updatePassword").post(protectRoute, updatePassword);

module.exports = router;
