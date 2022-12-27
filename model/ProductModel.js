const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Product must have a name']
    },
    price:{
        type: Number,
        required: [true, 'product must have a price']
    },
    ratting:{
        type: Number,
        default: 4.5
    },
    description:{
        type: String,
        // required: [true, 'product must have a description']
    },
    image:{
        type: String,
        required: [true, 'product must have a image']
    },
    imgUrl: {
        type: String
    },
    brandName:{
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;