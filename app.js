const express = require("express");
const app = express();
const morgan = require("morgan");

const productRouter = require("./routes/productRouter");
const brandrouter = require("./routes/brandeRouter");
// const productController = require('./routes/productRouter');

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/ecom/products", productRouter);
app.use("/api/ecom/brand", brandrouter);

module.exports = app;
