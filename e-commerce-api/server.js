const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
var authRoutes = require('./routes/auth.routes');

app.use(express.json());



const cors = require('cors');
app.use(cors());
app.use(cors({
    origin: 'http://localhost:4200' // Allow requests from this origin
}));

app.use('/api/auth', authRoutes);
app.listen(5000, function check(err) {
  if (err) {
    console.log("error");
  } else {
    console.log("started");
  }
});

async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Movie-Rating");
    console.log("Connected to Database");
  } catch (error) {
    console.log("Error connecting to database:", error);
  }
}

connectToDatabase();
