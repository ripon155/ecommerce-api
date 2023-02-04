const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const productRouter = require("./routes/productRouter");
const brandrouter = require("./routes/brandeRouter");
const userRouter = require("./routes/userRouter");
const reviewRouter = require("./routes/reviewRouter");
const productBuyRouter = require("./routes/productBuyRouter");

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("/public"));
// app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/public", express.static("public"));

app.use("/api/ecom/products", productRouter);
app.use("/api/ecom/brand", brandrouter);
app.use("/api/ecom/user", userRouter);
app.use("/api/ecom/review", reviewRouter);
app.use("/api/ecom/productcheckout", productBuyRouter);

module.exports = app;
