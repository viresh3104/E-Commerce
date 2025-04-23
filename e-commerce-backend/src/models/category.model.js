const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  category_id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Category must have a name"],
  },
  description: {
    type: String,
  },
  created_At: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// Add index for category_id to optimize sorting queries
CategorySchema.index({ category_id: -1 });

// Pre-save middleware to set created_At
CategorySchema.pre("save", async function (next) {
  this.created_At = Date.now();
  next();
});

// Pre-save middleware for auto-incrementing category_id
CategorySchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next(); // Only for new documents
  }

  try {
    const lastCategory = await mongoose
      .model("Category")
      .findOne()
      .sort({ category_id: -1 });

    this.category_id =
      lastCategory && lastCategory.category_id
        ? lastCategory.category_id + 1
        : 1;
    next();
  } catch (error) {
    next(error);
  }
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
