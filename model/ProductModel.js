const mongoose = require("mongoose");
const User = require("./User");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product must have a name"],
      index: true,
    },
    price: {
      type: Number,
      required: [true, "product must have a price"],
    },
    rating: {
      type: Number,
      // default: 4.5,
    },
    numRating: {
      type: Number,
    },
    description: {
      type: String,
      // required: [true, 'product must have a description']
    },
    image: [String],
    imgUrl: [String],
    brandName: {
      type: String,
    },
    createdAT: {
      type: Date,
      default: Date.now(),
    },
    brandId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Model",
      },
    ],
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// users: Array
// embedding
// productSchema.pre("save", async function (next) {
//   const user = this.users.map(async (id) => await User.findById(id));
//   this.users = await Promise.all(user);
//   next();
// });

//populate

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "users",
    select: "-__v -password -confirmpassword",
  });
  next();
});
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "brandId",
    select: "-__v ",
  });
  next();
});

//virtual populate
productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
