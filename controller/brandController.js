const Brand = require("./../model/BrandModel");
const Product = require("./../model/ProductModel");
const factoey = require("./handlerfactory");

const { createDoc, getAllDoc, getDocById, updateDoc, deleteDoc } = factoey;

exports.createBrand = createDoc(Brand);
exports.getAllBrand = getAllDoc(Brand);
exports.getBrandById = getDocById(Brand);
exports.updateBrand = updateDoc(Brand);
exports.deleteBrand = deleteDoc(Brand);

// const brand = await Brand.aggregate([
//     //   {
//     //     $lookup: {
//     //       from: "products",
//     //       localField: "_id",
//     //       foreignField: "brandId",
//     //       as: "product",
//     //     },
//     //   },
//     // ]);
