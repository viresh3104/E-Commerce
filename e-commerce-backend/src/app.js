const express = require("express");
const multer = require("multer");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

dotenv.config();
const app = express();

// Configure multer to use memory storage for image uploads
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:4200", // Allow Angular frontend
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

app.use(express.json()); // Middleware to parse JSON bodies (Parses incoming JSON requests)

// routes based on query params
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
