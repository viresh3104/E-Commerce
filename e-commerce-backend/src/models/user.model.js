const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have a name"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validator: [validator.isEmail, "Entered Email is Not Valid"],
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
    minLength: 8,
    select: false,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  profile_photo: {
    type: String,
    default: "/",
  }, //path of photo
  cart: {},
  wishlist: [{ type: Number }],
});

// pre middlewares

// 1. encryption for password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12); // 12 is the cost or random string used
  next();
});

// methods

// 1) to check the encrypted pass and user entered password
userSchema.methods.comparePassword = async function (
  enteredPassword,
  storedPass
) {
  return await bcrypt.compare(enteredPassword, storedPass);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
