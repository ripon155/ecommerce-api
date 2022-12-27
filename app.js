const express = require('express');
const app = express();
const morgan = require('morgan');


const productRouter = require('./routes/productRouter');
// const productController = require('./routes/productRouter');


app.use(morgan('dev'));
app.use(express.json());

app.use('/api/ecom/products', productRouter);




module.exports = app;