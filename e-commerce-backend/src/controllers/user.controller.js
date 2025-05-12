const CategoryM = require("../models/category.model");
const ProductM = require("../models/product.model");

// 1) Get all categories
exports.GetCategories = async (req, res) => {
  try {
    const categories = await CategoryM.find();
    res.status(201).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2) Get all Products
exports.GetProducts = async (req, res) => {
  try {
    const { category_id } = req.query;
    if (!category_id) {
      return res.status(400).json({
        status: "Failed",
        message: "Product's Category Not Found",
      });
    }
    const products = await ProductM.find({ category_id: Number(category_id) });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3)Get category by ID
exports.GetCategory = async (req, res) => {
  try {
    const { category_id } = req.query;
    if (!category_id) {
      res.status(500).json({
        status: "Failed",
        message: "Error in Fetching Category",
      });
    }
    const category = await CategoryM.findOne({ category_id });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: "Error in Fetching Category",
    });
  }
};
