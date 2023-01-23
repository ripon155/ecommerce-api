const fs = require("fs");
const { findOneAndUpdate, findOneAndDelete } = require("../model/User");

exports.createDoc = (Model) => async (req, res) => {
  try {
    const doc = await Model.create(req.body);
    res.status(201).json({
      message: "successfully create Document",
      data: doc,
    });
  } catch (error) {
    res.status(400).json({
      status: "faild",
      error: error,
    });
  }
};

exports.getAllDoc = (Model) => async (req, res) => {
  try {
    let query = Model.find();

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    }
    if (req.query.select) {
      const select = req.query.select.split(",").join(" ");
      query = query.select(select);
    }

    const doc = await query.select("-__v");
    res.status(200).json({
      total: doc.length,
      data: doc,
    });
  } catch (error) {
    res.status(400).json({
      status: "Faild",
      error: error,
    });
  }
};

exports.getDocById = (Model, popOptions) => async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).json({
        message: "Brand id empty",
      });
    }
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query.select("-__v");
    if (!doc) {
      res.status(400).json({ message: "No Document Found" });
    }
    res.status(200).json({
      data: doc,
    });
  } catch (error) {
    res.status(400).json({
      status: "Faild",
      error: error,
    });
  }
};

exports.updateDoc = (Model) => async (req, res) => {
  try {
    if (req.body && req.params.id) {
      const doc = await Model.findOneAndUpdate(req.params.id, req.body, {
        upsert: true,
        new: true,
      }).select("-__v");
      res.status(200).json({
        message: "data successfully updated",
        data: doc,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "Faild",
      error: error,
    });
  }
};

exports.deleteDoc = (Model) => async (req, res) => {
  const doc = await Model.findOne({ _id: req.params.id });
  console.log(doc.image);
  if (doc.image) {
    doc.image.forEach(async (im) => {
      await fs.unlinkSync(`public/image/products/${im}`);
    });
  }

  if (!doc) {
    res.status(400).json({
      message: `Your document  not found`,
    });
  }

  if (req.params.id) {
    await Model.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({
      message: "Document deleted successfully",
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
