const express = require("express");
const brandController = require("./../controller/brandController");

const { createBrand, getAllBrand, getBrandById, updateBrand, deleteBrand } =
  brandController;
const router = express.Router();

router.route("/").post(createBrand).get(getAllBrand);
router.route("/:id").get(getBrandById).patch(updateBrand).delete(deleteBrand);

module.exports = router;
