const express = require("express");
const authController = require("./../controller/authController");

const { signup, login, forgetpassword } = authController;
const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").get(login);

router.route("/forgotpassword").post(forgetpassword);

module.exports = router;
