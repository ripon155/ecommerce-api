const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const productRouter = require("./routes/productRouter");
const brandrouter = require("./routes/brandeRouter");
const userRouter = require("./routes/userRouter");
const reviewRouter = require("./routes/reviewRouter");

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/ecom/products", productRouter);
app.use("/api/ecom/brand", brandrouter);
app.use("/api/ecom/user", userRouter);
app.use("/api/ecom/review", reviewRouter);

module.exports = app;
