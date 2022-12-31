const express = require("express");
const authController = require("./../controller/authController");

const { signup, login } = authController;
const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").get(login);

module.exports = router;
