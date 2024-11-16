/** @format */

// routes/carRoutes.js
const express = require("express");
const Car = require("../models/Car");
const router = express.Router();
const mongoose = require("mongoose");
const upload = require("../middlewares/CarMiddleware");
const app = express();
const path = require("path");
// routes/carRoutes.js (Add add route)
router.post("/addCar", upload.single("image"), async (req, res) => {
  const { brand, model, year, price, description, title } = req.body;
  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  try {
    if (!req.file) {
      throw new Error("Image file is required");
    }

    const car = new Car({
      title,
      description,
      brand,
      model,
      year,
      price,
      imageUrl: req.file.path,
    });

    await car.save();
    res.status(201).json({ message: "Car added successfully", car });
  } catch (err) {
    console.error("Error adding car:", err); // Log the error
    res.status(500).json({ message: "Failed to add car", error: err.message });
  }
});

// routes/carRoutes.js (Fix delete route)
router.delete("/deleteCar/:id", async (req, res) => {
  const { id } = req.params; // Extract the id from the URL params
  try {
    const deletedCar = await Car.findByIdAndDelete(id); // Use the id from params
    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json({ message: "Car deleted successfully!" });
  } catch (err) {
    console.error("Error deleting car:", err); // Log the error
    res.status(500).json({ message: "Failed to delete car", error: err });
  }
});

// Route to fetch all cars
router.get("/viewCars", async (req, res) => {
  try {
    const cars = await Car.find(); // Fetch all cars from the database
    res.status(200).json({ message: "Cars retrieved successfully", cars });
  } catch (err) {
    console.error("Error fetching cars:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch cars", error: err.message });
  }
});

// routes/carRoutes.js (Add edit route)
router.get("/viewCar/:id", async (req, res) => {
  try {
    const carId = req.params.id;

    // Validate and cast to ObjectId
    if (!mongoose.Types.ObjectId.isValid(carId)) {
      return res.status(400).json({ message: "Invalid car ID" });
    }

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({ car });
  } catch (error) {
    console.error("Error fetching car:", error);
    res
      .status(500)
      .json({ message: "Error fetching car", error: error.message });
  }
});

// PUT request to update car details
router.put("/editCar/:id", upload.single("image"), async (req, res) => {
  try {
    const carId = req.params.id;

    // Validate the car ID
    if (!mongoose.Types.ObjectId.isValid(carId)) {
      return res.status(400).json({ message: "Invalid car ID" });
    }

    const updatedCarData = req.body; // Text fields
    if (req.file) {
      updatedCarData.imageUrl = req.file.path; // If an image is uploaded, store the path
    }

    const updatedCar = await Car.findByIdAndUpdate(carId, updatedCarData, {
      new: true,
    });

    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({ message: "Car updated successfully", updatedCar });
  } catch (error) {
    console.error("Error updating car:", error);
    res
      .status(500)
      .json({ message: "Error updating car", error: error.message });
  }
});

// Route to search cars by query
// Route to search for cars based on query
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
router.get("/search", async (req, res) => {
  const { query } = req.query; // Get the search query
  try {
    const cars = await Car.find({
      $or: [
        { title: { $regex: query, $options: "i" } }, // Search by title
        { brand: { $regex: query, $options: "i" } }, // Search by brand
        { model: { $regex: query, $options: "i" } }, // Search by model
      ],
    });

    res.status(200).json({ cars }); // Send the list of matching cars
  } catch (err) {
    console.error("Error fetching cars:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch cars", error: err.message });
  }
});

module.exports = router;
module.exports = router;
