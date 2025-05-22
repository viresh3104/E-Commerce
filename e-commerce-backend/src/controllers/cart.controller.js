const ProductM = require("../models/product.model");
const UserM = require("../models/user.model");

exports.getCart = async (req, res) => {
  try {
    const user = await UserM.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "USer not found" });
    }
    // Extract productIds from cart
    const productIds = user.cart.map((item) => item.productId);

    // Fetch products
    const products = await ProductM.find({
      product_id: { $in: productIds },
    });

    // Map cart items to include product details
    const cartWithProducts = user.cart.map((cartItem) => {
      const product = products.find((p) => p.product_id === cartItem.productId);
      return {
        productId: cartItem.productId,
        size: cartItem.size,
        quantity: cartItem.quantity,
        product: product || null, // Include product details or null if not found
      };
    });

    res.status(200).json(cartWithProducts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart" });
    console.log(err);
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, size, quantity = 1 } = req.body;

    const product = await ProductM.findOne({ product_id: productId });
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    const user = await UserM.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "USer not found" });
    }

    const cartItem = user.cart.findIndex(
      (item) => item.productId == productId && item.size == size
    );

    if (cartItem > -1) {
      user.cart[cartItem].quantity += 1;
    } else {
      user.cart.push({ productId, size, quantity });
    }
    await user.save();
    res.status(200).json({ message: "Product added to cart" });
  } catch (err) {
    console.log(err);
  }
};

exports.updateCartQuantity = async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;
    const user = await UserM.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const cartItemIndex = user.cart.findIndex(
      (item) => item.productId === productId && item.size === size
    );

    if (cartItemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    user.cart[cartItemIndex].quantity = quantity;
    await user.save();

    res.status(200).json({ message: "Cart quantity updated" });
  } catch (err) {
    console.log(err);
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId, size } = req.body;
    console.log(productId, size);
    const user = await UserM.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const cartItemIndex = user.cart.findIndex(
      (item) => item.productId === productId && item.size === size
    );
    user.cart.splice(cartItemIndex, 1);
    await user.save();
    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    console.log(err);
  }
};
