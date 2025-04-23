const express = require("express");

// for admin
const UserRouter = express.Router();
const AdminController = require("../controllers/admin.controller");

UserRouter.post("/createcategory", AdminController.CreateCategory);
UserRouter.get("/getcategories", AdminController.getCategories);

module.exports = UserRouter;
// for User
