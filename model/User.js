const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
// validate: [validator.isEmail, "please provide a valid email"],
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tall us your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: 8,
  },
  confirmpassword: {
    type: String,
    required: [true, "please provide a confirm-password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "password are not same",
    },
  },
  role: {
    type: String,
    enum: ["admin", "superadmin", "user"],
    default: "user",
  },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmpassword = undefined;
  next();
});

2;
3;

userSchema.methods.correctPassword = async (canPass, userPass) => {
  return await bcrypt.compare(canPass, userPass);
};
const User = mongoose.model("User", userSchema);

module.exports = User;
