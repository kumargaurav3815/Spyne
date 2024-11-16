/** @format */

// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const carRoutes = require("./routes/carRoutes");
const userRoutes = require("./routes/auth");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://kumargaurv1510:GZXfs64HnKyjMkS8@cluster0.sb75j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Routes
app.use("/api/cars", carRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/auth", userRoutes);

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
