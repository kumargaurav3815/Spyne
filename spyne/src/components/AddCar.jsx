/** @format */

import { useState } from "react";
import axios from "axios";
import bannerImage from "../assets/banner.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddCar() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("model", model);
    formData.append("year", year);
    formData.append("price", price);
    formData.append("image", image); // Append the image file

    try {
      const response = await axios.post(
        "http://localhost:5000/api/cars/addCar",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Car added successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
      });
    } catch (error) {
      toast.error("Error adding car", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
      });
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
      <div className="w-[350px] bg-white p-4 rounded-lg shadow-lg space-y-4">
        <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">
          Add a New Car
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-medium text-gray-700">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-xs text-black"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-medium text-gray-700">
              Description:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="2"
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-xs text-black"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-medium text-gray-700">Brand:</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-xs text-black"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-medium text-gray-700">Model:</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-xs text-black"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-medium text-gray-700">Year:</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-xs text-black"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-medium text-gray-700">Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-xs text-black"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="text-xs font-medium text-gray-700">Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
              className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-xs"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-xs">
              Add Car
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}
