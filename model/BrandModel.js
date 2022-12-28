const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "brand must have a brand name"],
  },
});

const Model = mongoose.model("Model", brandSchema);
module.exports = Model;
