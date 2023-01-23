const express = require("express");
const productController = require("./../controller/productController");
const authController = require("./../controller/authController");
const reviewRouter = require("./../routes/reviewRouter");
const imgesConf = require("./../utils/imageUpload");
const productImageUpload = require("./../utils/producitImageUpload");

const { protectRoute, restricTo } = authController;
// const { createReview } = reviewController;
const router = express.Router();

const {
  getAllProduct,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = productController;

const { imageUpload, resizeImage } = imgesConf;

// image upload end
//protectRoute,

// nestedroute
// router.route("/:productId/reviews").post(protectRoute, createReview);
router.use("/:productId/reviews", reviewRouter);

const { uploadProductImage, uploadProductImageResize } = productImageUpload;

router
  .route("/")
  .get(protectRoute, restricTo("admin", "superadmin", "user"), getAllProduct)
  .post(
    protectRoute,
    uploadProductImage,
    uploadProductImageResize,
    createProduct
  );
// .post(protectRoute, imageUpload, resizeImage, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
