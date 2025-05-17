const CategoryM = require("../models/category.model");
const ProductM = require("../models/product.model");

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

exports.CreateProduct = async (req, res) => {
  try {
    if (!req.body.data) {
      return res.status(400).json({
        status: "Failed",
        message: "Form data is missing",
      });
    }

    // Parse the form data from the 'data' field
    let formData = JSON.parse(req.body.data);
    const {
      name,
      description,
      price,
      discountedPrice,
      category_id,
      brand,
      stock,
      size,
    } = formData;

    // validate category
    const category = await CategoryM.findOne({
      category_id: Number(category_id),
    });

    if (!category) {
      console.log("Invalid category_id:", category_id);
      return res.status(400).json({
        status: "Failed",
        message: "Category Not Found",
      });
    }

    // Convert uploaded files to Base64
    const ImageUrls = req.files
      ? req.files.map((file) => {
          const base64 = file.buffer.toString("base64");
          return `data:${file.mimetype};base64,${base64}`;
        })
      : [];

    // create product
    const ProductData = {
      name,
      description,
      price,
      brand,
      discountedPrice: discountedPrice ? Number(discountedPrice) : undefined,
      stock,
      size,
      category_id: Number(category_id),
      image_urls: ImageUrls,
    };

    const product = await ProductM.create(ProductData);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
