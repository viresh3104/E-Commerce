const express = require("express");

const AuthRouter = express.Router();
const authController = require("../controllers/auth.controller");

// api for signup = /api/auth/signup
AuthRouter.post("/signup", authController.signup);
AuthRouter.post("/login", authController.login);
AuthRouter.post("/fpass", authController.fpass);
module.exports = AuthRouter;
