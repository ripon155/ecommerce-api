const Review = require("./../model/ReviewModel");
const factoey = require("./handlerfactory");

const { createDoc, getAllDoc, getDocById, updateDoc, deleteDoc } = factoey;

exports.addIds = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;
  if (!req.body.product) req.body.product = req.params.productId;
  next();
};

exports.createReview = createDoc(Review);
exports.getAllReview = getAllDoc(Review);
exports.getReviewById = getDocById(Review);
exports.updateReview = updateDoc(Review);
exports.deleteReview = deleteDoc(Review);
