const Razorpay = require("razorpay");
const UserM = require("../models/user.model");
const OrderM = require("../models/order.model");

const razorpay = new Razorpay({
  key_id: "rzp_test_4EaYDRKRmVoz3f",
  key_secret: "IYFybkW9wHp7pFWjxYZDatGY",
});

exports.createOrder = async (req, res) => {
  try {
    const { amount, cartItems } = req.body;
    // validate req
    if (!amount || !cartItems || !Array.isArray(cartItems)) {
      return res
        .status(400)
        .json({ message: "Amount and cartItems are required" });
    }
    // validate the user , dono jaruri hai ismian
    const user = await UserM.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if address is present
    if (!user.address || user.address.trim() === "") {
      return res
        .status(400)
        .json({ message: "Please add address in the user profile" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `order_${new Date().getTime()}`,
    });

    res.status(200).json({
      orderId: order.id,
      amount: amount * 100,
      currency: "INR",
      key: process.env.RAZORPAY_KEY_ID,
      user: {
        name: user.name,
        email: user.email,
        contact: user.phoneNumber || "",
      },
    });
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
  }
};

exports.confirmOrder = async (req, res) => {
  const { orderId, paymentId, totalAmount, cartItems } = req.body;

  // Validate request
  if (
    !orderId ||
    !paymentId ||
    !totalAmount ||
    !cartItems ||
    !Array.isArray(cartItems)
  ) {
    return res.status(400).json({
      message: "orderId, paymentId, totalAmount, and cartItems are required",
    });
  }

  const user = await UserM.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const order = await OrderM.create({
    orderId,
    userId: req.user.id,
    items: cartItems.map((item) => ({
      productId: item.productId,
      size: item.size,
      quantity: item.quantity,
    })),
    totalAmount,
    paymentStatus: "completed",
  });
  await order.save();

  // Clear the user's cart
  user.cart = [];
  await user.save();

  res.status(200).json({ message: "Order confirmed and cart cleared" });
};
