const ProductM = require("../models/product.model");
const UserM = require("../models/user.model");

exports.getWishlist = async (req, res) => {
  try {
    const user = await UserM.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const products = await ProductM.find({
      product_id: { $in: user.wishlist },
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const user = await UserM.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }
    res.status(200).json({ message: "Product added to wishlist" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await UserM.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.wishlist = user.wishlist.filter((id) => id !== Number(productId));
    await user.save();

    res.status(200).json({ message: "Product removed from wishlist" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
