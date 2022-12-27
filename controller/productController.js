const Product = require('./../model/ProductModel');



exports.createProduct = async (req, res) => {
    try {


    //    console.log(req.file);
       req.body.image =  req.file.filename;
       req.body.imgUrl = 'http://127.0.0.1:5000/'  + req.file.path;

    //    console.log(req.file.path);
        const product = await Product.create(req.body);
        res.status(200).json({
            status: 'Successfully added product',
            data: product
        });
        
    } catch (error) {
        res.status(400).json({
            status: 'Faild',
            message: error
        })
    }
}



exports.getAllProduct = async (req,res) => {
    try {

        console.log(req.query.sort.split(',').join(' '));
        let query =  Product.find();

        const sortBy = req.query.sort.split(',').join(' ');

        query = query.sort(sortBy);

        const allProduct = await query;
        res.status(200).json({
            total: allProduct.length,
            data: allProduct
            
        })
    } catch (error) {
        res.status(400).json({
            status:'faild',
            message:error
        })
    }
}

exports.getProductById = async (req,res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(product.length == 0){
            res.status(400).json({
                status: 'product not available',
                data: product
            })
        }
        res.status(200).json({
            status: 'successfull find data',
            data: product
        })
    } catch (error) {
        res.status(404).json({
            satatus: 'faild',
            message: 'product not available'
        })
    }
}

exports.updateProduct = async (req, res) => {
    try {

        if(req.body && req.params.id){
            console.log(req.params.id);
            console.log(req.body);
            const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {upsert:true, new: true });
            res.status(200).json({
                message: 'data successfully updated',
                data: updateProduct
                
            })

        }

    } catch (error) {
        res.status(400).json({
            status:'faild',
            message:error
        })
        
    }
  
}

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: 'Successfully data deleted'
        })
        
    } catch (error) {
        res.status(400).json({
            status:'faild',
            message:error
        })
    }
}