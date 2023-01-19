const mongoose = require("mongoose");
const User = require("./User");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product must have a name"],
    },
    price: {
      type: Number,
      required: [true, "product must have a price"],
    },
    ratting: {
      type: Number,
      default: 4.5,
    },
    description: {
      type: String,
      // required: [true, 'product must have a description']
    },
    image: {
      type: String,
      // required: [true, "product must have a image"],
    },
    imgUrl: {
      type: String,
    },
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

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
