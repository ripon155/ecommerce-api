const mongoose = require("mongoose");
// const config = require("config");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const db = process.env.DATABASE;

mongoose.set("strictQuery", false);

const connectDB = () => {
  mongoose
    .connect(db, {
        useNewUrlParser: true,
        // useFindAndModify: false,
        useNewUrlParser: true,

      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connect"))
    .catch((err) => {
      console.error(err.message);
      //   process.exit(1);
    });
};

module.exports = connectDB;