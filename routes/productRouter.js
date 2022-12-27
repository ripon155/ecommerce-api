const express = require('express');
const multer = require('multer');
const productController = require('./../controller/productController');



const router = express.Router();

const{ getAllProduct, createProduct, getProductById, updateProduct, deleteProduct } = productController;

    // image upload start 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/image/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,   uniqueSuffix + '-' + file.originalname)
    }
  })
const upload = multer({ storage: storage });

 // image upload end 

 
router.route('/').get( getAllProduct).post(upload.single('image'), createProduct);
router.route('/:id').get(getProductById).patch(updateProduct).delete(deleteProduct);

module.exports = router;