const { profile } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");

const productSchema = new mongoose.Schema({
  product_id: {
    type: Number,
    unique: true,
  },
  category_id: {
    type: Number,
    required: [true, "Product must belong to a category"],
  },
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    minlength: [5, "Product name must be at least 5 characters"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
    maxlength: [50, "Description cannot exceed 50 characters"],
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [1, "Price must be at least 1"],
  },
  discountedPrice: {
    type: Number,
  },
  image_urls: [{ type: String }],
  created_at: { type: Date, default: Date.now },
  is_active: { type: Boolean, default: true },
});

// pre - middleware for stroring the created at and the product id
productSchema.pre("save", async function (next) {
  this.created_at = Date.now();
  next();
});

productSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }

  try {
    const lastProduct = await mongoose
      .model("Product")
      .findOne()
      .sort({ product_id: -1 });

    this.product_id =
      lastProduct && lastProduct.product_id ? lastProduct.product_id + 1 : 1;

    next();
  } catch (error) {
    next(error);
  }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
