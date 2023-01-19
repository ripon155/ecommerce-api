const express = require("express");
const reviewController = require("./../controller/reviewController");

const { createReview } = reviewController;
const router = express.Router();

router.route("/").post(createReview);

module.exports = router;
