const Product = require("./../model/ProductModel");
const Review = require("./../model/ReviewModel");
const fs = require("fs");
const factoey = require("./handlerfactory");

const { createDoc, getAllDoc, getDocById, updateDoc, deleteDoc } = factoey;

exports.createProduct = async (req, res) => {
  try {
    // console.log(req.file);
    // console.log(req.file);
    // http://127.0.0.1:5000/public/image/1672216273188-736195259-n8.jpg
    // if (req.file) {
    //   req.body.image = req.file.filename;
    //   req.body.imgUrl =
    //     "http://127.0.0.1:5000/public/image/" + req.file.filename;
    // }

    //    console.log(req.file.path);
    const product = await Product.create(req.body);
    res.status(201).json({
      status: "Successfully added product",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: "Faild",
      message: error,
    });
  }
};

exports.getAllProduct = getAllDoc(Product);
exports.getProductById = getDocById(Product, { path: "reviews" });
exports.updateProduct = updateDoc(Product);
exports.deleteProduct = deleteDoc(Product);

// exports.getAllProduct = async (req, res) => {
//   console.log(req.query.sort);
//   try {
//     // console.log(req.query.sort.split(",").join(" "));

//     let query = Product.find();

//     if (req.query.sort) {
//       const sortBy = req.query.sort.split(",").join(" ");
//       query = query.sort(sortBy);
//     }

//     // query.exec(function (err, person) {
//     //   if (err) {
//     //     res.status(200).json({
//     //       data: err,
//     //     });
//     //   }
//     //   if (person) {
//     //     res.status(200).json({
//     //       total: person.length,
//     //       data: person,
//     //     });
//     //   }
//     // });

//     if (req.query.select) {
//       const select = req.query.select.split(",").join(" ");
//       query = query.select(select);
//     }

//     const allProduct = await query.select("-__v");

//     res.status(200).json({
//       total: allProduct.length,
//       data: allProduct,
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "faild",
//       message: error,
//     });
//   }
// };

// exports.getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id).populate("reviews");
//     // const review = await Review.find({ product: product.id });
//     if (product.length == 0) {
//       res.status(400).json({
//         status: "product not available",
//         data: product,
//       });
//     }
//     res.status(200).json({
//       status: "successfull find data",
//       data: {
//         product: product,
//       },
//     });
//   } catch (error) {
//     res.status(404).json({
//       satatus: "faild",
//       message: "product not available",
//     });
//   }
// };

// exports.updateProduct = async (req, res) => {
//   try {
//     if (req.body && req.params.id) {
//       const updateProduct = await Product.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         { upsert: true, new: true }
//       );
//       res.status(200).json({
//         message: "data successfully updated",
//         data: updateProduct,
//       });
//     }
//   } catch (error) {
//     res.status(400).json({
//       status: "faild",
//       message: error,
//     });
//   }
// };

// exports.deleteProduct = async (req, res) => {
//   try {
//     const deletePro = await Product.findByIdAndDelete(req.params.id);
//     await fs.unlinkSync(`public/image/${deletePro.image}`);
//     res.status(200).json({
//       message: "Successfully data deleted",
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "faild",
//       message: error,
//     });
//   }
// };
