const express = require("express");
const upload = require("multer")();
const UserRouter = express.Router();
const { protect } = require("../auth");

// for admin
const AdminController = require("../controllers/admin.controller");
UserRouter.post("/createcategory", AdminController.CreateCategory);
UserRouter.post(
  "/createproduct",
  upload.array("images", 7),
  AdminController.CreateProduct
);

// for All User
const UserController = require("../controllers/user.controller");
UserRouter.get("/getcategories", protect, UserController.GetCategories);
UserRouter.get("/getproducts", UserController.GetProducts);
UserRouter.get("/getcategory", UserController.GetCategory);
UserRouter.get("/getproduct", UserController.GetProduct);

// user specific like wishlist , profile ,etc
// 1)wihslist
const WishlistController = require("../controllers/wishlist.controller");
UserRouter.get("/wishlist", protect, WishlistController.getWishlist);
UserRouter.post("/wishlist/add", protect, WishlistController.addToWishlist);
UserRouter.delete(
  "/wishlist/remove/:productId",
  protect,
  WishlistController.removeFromWishlist
);

// 3)Cart
const CartController = require("../controllers/cart.controller");
UserRouter.get("/cart", protect, CartController.getCart);
UserRouter.post("/cart/add", protect, CartController.addToCart);
UserRouter.delete("/cart/remove", protect, CartController.removeFromCart);
UserRouter.patch("/cart/update", protect, CartController.updateCartQuantity);

// 2)Profile
UserRouter.get("/profile", protect, UserController.GetUserProfile);
UserRouter.patch("/profile", protect, UserController.updateUserProfile);

module.exports = UserRouter;
