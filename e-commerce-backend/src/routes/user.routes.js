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

// for User
const UserController = require("../controllers/user.controller");
UserRouter.get("/getcategories", protect, UserController.GetCategories);
UserRouter.get("/getproducts", UserController.GetProducts);
UserRouter.get("/getcategory", UserController.GetCategory);

// user wishlist
const WishlistController = require("../controllers/wishlist.controller");
UserRouter.get("/wishlist", protect, WishlistController.getWishlist);
UserRouter.post("/wishlist/add", protect, WishlistController.addToWishlist);
UserRouter.delete(
  "/wishlist/remove/:productId",
  protect,
  WishlistController.removeFromWishlist
);

UserRouter;

module.exports = UserRouter;
