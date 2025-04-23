const CategoryM = require("../models/category.model");

exports.CreateCategory = async (req, res) => {
  try {
    console.log("Received body:", req.body); // Log to debug
    const category = await CategoryM.create({
      name: req.body.name,
      description: req.body.description,
    });
    res.status(201).json({
      status: "Success",
      message: "Category Created Successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Category Creation Failed",
      data: error,
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await CategoryM.find();
    res.status(201).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
