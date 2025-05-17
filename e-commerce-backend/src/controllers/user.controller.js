const CategoryM = require("../models/category.model");
const ProductM = require("../models/product.model");
const UserM = require("../models/user.model");

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

// 4) Get User Profile
exports.GetUserProfile = async (req, res) => {
  try {
    const user = await UserM.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 5) Update User Profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, phoneNumber, gender, address, dateOfBirth } = req.body;
    const updates = { name, phoneNumber, gender, address, dateOfBirth };

    const user = await UserM.findByIdAndUpdate(
      req.user.id,
      updates,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: err.message });
  }
};

// 6) get products by Id for product detail page
exports.GetProduct = async (req, res) => {
  try {
    const { product_id } = req.query;
    if (!product_id) {
      return res.status(400).json({
        status: "Failed",
        message: "Product's Category Not Found",
      });
    }
    const product = await ProductM.find({ product_id: Number(product_id) });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error("Error getting product:", err);
  }
};
