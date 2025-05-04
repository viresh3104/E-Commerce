const express = require("express");
const upload = require("multer")();

// for admin
const UserRouter = express.Router();
const AdminController = require("../controllers/admin.controller");

// for categories
UserRouter.post("/createcategory", AdminController.CreateCategory);
UserRouter.get("/getcategories", AdminController.getCategories);

// for
UserRouter.get("/getproducts", AdminController.GetProducts);
UserRouter.post(
  "/createproduct",
  upload.array("images", 7),
  AdminController.CreateProduct
);

module.exports = UserRouter;
// for User
