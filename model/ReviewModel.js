const mongoose = require("mongoose");
const Product = require("./ProductModel");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  });
  next();
});

reviewSchema.statics.calcAverage = async function (productId) {
  const stass = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: "$product",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  await Product.findByIdAndUpdate(productId, {
    rating: stass[0].avgRating,
    numRating: stass[0].nRating,
  });
};

//execute when create document
reviewSchema.post("save", function () {
  this.constructor.calcAverage(this.product);
});

// reviewSchema.pre(/^find/, async function (next) {
//   this.ripon = await this.findOne();
//   next();
// });

// reviewSchema.post(/^find/, async function () {
//   await this.ripon.constructor.calcAverage(this.ripon.product);
// });

// reviewSchema.index({ product: 1, user: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
