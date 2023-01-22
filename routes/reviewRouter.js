const express = require("express");
const reviewController = require("./../controller/reviewController");
const authController = require("./../controller/authController");

// protectRoute, restricTo("admin", "superadmin", "user")
const {
  createReview,
  addIds,
  getAllReview,
  updateReview,
  getReviewById,
  deleteReview,
} = reviewController;
const { protectRoute, restricTo } = authController;

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(protectRoute, addIds, createReview)
  .get(protectRoute, getAllReview);

router
  .route("/:id")
  .patch(updateReview)
  .get(getReviewById)
  .delete(deleteReview);

module.exports = router;
