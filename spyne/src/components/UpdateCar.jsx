/** @format */

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bannerImage from "../assets/banner.jpg";

export default function UpdateCar() {
  const { id } = useParams(); // Get car ID from URL params
  const [car, setCar] = useState({
    title: "",
    description: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    image: null, // Change imageUrl to image to hold file
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/cars/viewCar/${id}`
        );
        setCar(response.data.car); // Populate form with fetched car details
      } catch (error) {
        toast.error("Error fetching car details: " + error.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    };

    fetchCarDetails();
  }, [id]);

  // Handle form submission to update car details
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", car.title);
    formData.append("description", car.description);
    formData.append("brand", car.brand);
    formData.append("model", car.model);
    formData.append("year", car.year);
    formData.append("price", car.price);

    // Only append the image if a file is selected
    if (car.image) {
      formData.append("image", car.image); // Attach the image file
    }

    try {
      await axios.put(
        `http://localhost:5000/api/cars/editCar/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important header for file uploads
          },
        }
      );
      toast.success("Car details updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
      navigate("/viewCar"); // Ensure you navigate to the correct page
    } catch (error) {
      toast.error("Error updating car details: " + error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  };

  // Handle image file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      setCar((prevCar) => ({
        ...prevCar,
        image: file, // Update image state with the file
      }));
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <div className="w-full sm:w-[350px] md:w-[400px] lg:w-[500px] bg-white p-6 rounded-lg shadow-lg space-y-6">
        <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">
          Edit Car Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-medium text-gray-700">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={car.title}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-xs text-black"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-medium text-gray-700">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={car.description}
              onChange={handleChange}
              required
              rows="2"
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-xs text-black"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-medium text-gray-700">Brand:</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={car.brand}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-xs text-black"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-medium text-gray-700">Model:</label>
            <input
              type="text"
              id="model"
              name="model"
              value={car.model}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-xs text-black"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-medium text-gray-700">Year:</label>
            <input
              type="number"
              id="year"
              name="year"
              value={car.year}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-xs text-black"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-medium text-gray-700">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={car.price}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-xs text-black"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-medium text-gray-700">Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-xs"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-xs">
              Update Car
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}
