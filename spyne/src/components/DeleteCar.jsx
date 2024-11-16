/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bannerImage from "../assets/banner.jpg";

export default function ViewCars() {
  const [cars, setCars] = useState([]);

  // Fetch the cars from the backend when the component mounts
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/cars/viewCars"
        );
        setCars(response.data.cars); // Update state with fetched cars
      } catch (error) {
        toast.error("Error fetching cars", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    };

    fetchCars();
  }, []);

  // Function to handle car deletion
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/cars/deleteCar/${id}`
      );
      toast.success("Car deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });

      // Update the state to remove the deleted car from the UI
      setCars(cars.filter((car) => car._id !== id));
    } catch (error) {
      toast.error("Error deleting car", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <h2 className="text-4xl font-bold text-center mb-10 text-white">
        Manage Cars
      </h2>
      <div className="cars-grid grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-12 w-full max-w-screen-xl">
        {cars.map((car) => (
          <div
            className="relative flex flex-col rounded-xl bg-white text-gray-700 max-w-sm mx-auto shadow-md hover:shadow-lg transition-shadow duration-300"
            key={car._id}>
            {/* Car Image Section */}
            <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 text-white shadow-lg bg-gradient-to-r from-blue-500 to-blue-600">
              <img
                className="w-full h-full object-cover transition-all duration-300 hover:scale-110"
                src={`http://localhost:5000/${car.imageUrl}`}
                alt={`${car.brand} ${car.model}`}
              />
            </div>

            {/* Car Details Section */}
            <div className="p-6">
              <h5 className="mb-2 text-xl font-semibold text-blue-gray-900">
                {car.brand} {car.model}
              </h5>
              <p className="text-base font-light">Year: {car.year}</p>
              <p className="text-base font-light">Price: Rs. {car.price}</p>
            </div>

            {/* Delete Button Section */}
            <div className="p-6 pt-0">
              <button
                className="rounded-lg bg-red-500 py-3 px-6 text-xs font-bold uppercase text-white shadow-md hover:shadow-lg transition-all"
                onClick={() => handleDelete(car._id)} // Call the handleDelete function with the car ID
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}
