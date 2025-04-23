const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

dotenv.config();
const app = express();

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:4200", // Allow Angular frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

app.use(express.json()); // Middleware to parse JSON bodies (Parses incoming JSON requests)

// routes based on query params
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
