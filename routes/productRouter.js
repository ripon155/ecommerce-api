const express = require("express");
const multer = require("multer");
const productController = require("./../controller/productController");
const authController = require("./../controller/authController");
const reviewRouter = require("./../routes/reviewRouter");
const imgesConf = require("./../utils/imageUpload");

const { protectRoute, restricTo } = authController;
// const { createReview } = reviewController;
const router = express.Router();

const {
  getAllProduct,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  imageResize,
} = productController;

const { imageUpload, resizeImage } = imgesConf;

// image upload end
//protectRoute,

// nestedroute
// router.route("/:productId/reviews").post(protectRoute, createReview);
router.use("/:productId/reviews", reviewRouter);

router
  .route("/")
  .get(protectRoute, restricTo("admin", "superadmin", "user"), getAllProduct)
  .post(protectRoute, imageUpload, resizeImage, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
