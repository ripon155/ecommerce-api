const Brand = require("./../model/BrandModel");
const Product = require("./../model/ProductModel");
exports.createBrand = async (req, res) => {
  try {
    const brand = await Brand.create(req.body);
    res.status(200).json({
      message: "successfully create brand",
      brand: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "faild",
      error: error,
    });
  }
};

exports.getAllBrand = async (req, res) => {
  try {
    const brand = await Brand.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "brandId",
          as: "product",
        },
      },
    ]);
    res.status(200).json({
      brand: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "Faild",
      error: error,
    });
  }
};

exports.getBrandById = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({
        message: "Brand id empty",
      });
    }
    const brand = await Brand.findById(req.params.id).select("-__v");
    res.status(200).json({
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "Faild",
      error: error,
    });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    if (req.body && req.params.id) {
      console.log(req.params.id);
      console.log(req.body);
      const updateBrand = await Brand.findByIdAndUpdate(
        req.params.id,
        req.body,
        { upsert: true, new: true }
      );
      res.status(200).json({
        message: "data successfully updated",
        data: updateBrand,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "Faild",
      error: error,
    });
  }
};

exports.deleteBrand = async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    res.status(400).json({
      message: `Your data already deleted or not found`,
    });
  }
  if (req.params.id) {
    await Brand.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Brand deleted successfully",
    });
  }
  try {
  } catch (error) {
    res.status(400).json({
      status: "Faild",
      error: error,
    });
  }
};
