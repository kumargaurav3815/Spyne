/** @format */

import { useState } from "react";
import { Menus } from "../utils";
import Logo from "../assets/logo.png";
import DesktopMenu from "../components/DesktopMenu";
import MobMenu from "../components/MobMenu";
import { Link } from "react-router-dom";
import bannerImage from "../assets/banner.jpg";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigateTo = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // Store search query
  const [searchResults, setSearchResults] = useState([]); // Store search results
  const [searchPerformed, setSearchPerformed] = useState(false); // Track if a search was performed

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("username");
  // Handle search submit
  const handleSignout = async () => {
    await localStorage.removeItem("token");
    await localStorage.removeItem("username");
    await navigateTo("/signIn");
  };
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (searchQuery.trim() === "") return;

    try {
      // Make the API call to fetch cars based on the search query
      const response = await fetch(
        `http://localhost:5000/api/cars/search?query=${searchQuery}`
      );
      const data = await response.json();

      if (data.cars) {
        setSearchResults(data.cars); // Update the searchResults state
      } else {
        setSearchResults([]); // Clear results if no cars are found
      }

      setSearchPerformed(true); // Mark that a search has been performed
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]); // Clear results on error
      setSearchPerformed(true); // Mark that a search has been performed
    }
  };

  return (
    <>
      <div
        className="h-screen  flex items-center justify-center px-4 py-8 relative"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}>
        <header className="h-16 text-[15px] fixed inset-0 flex-center bg-[#18181A] z-20">
          <nav className="px-3.5 flex-center-between w-full max-w-7xl mx-auto relative z-[9999]">
            <div className="flex-center gap-x-3 z-[999] relative">
              <img src={Logo} alt="Logo" className="size-8" />
              <h3 className="text-lg font-semibold text-white">AutoMotive</h3>
            </div>

            <div className="relative w-full lg:w-1/3 hidden lg:block">
              <form onSubmit={handleSearchSubmit} className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  className="w-full px-4 py-2 rounded-l-lg bg-[#2A2A2A] text-white placeholder:text-gray-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-r-lg shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300">
                  <i className="fa fa-search"></i> Search
                </button>
              </form>
            </div>

            <ul className="gap-x-1 lg:flex-center hidden lg:flex">
              {Menus.map((menu) => (
                <DesktopMenu menu={menu} key={menu.name} />
              ))}
            </ul>

            <div className="flex-center gap-x-5">
              <Link to={token ? "" : "/signIn"}>
                <button
                  onClick={handleSignout}
                  aria-label={token ? "user profile" : "sign-in"}
                  className="bg-white/5 z-[999] relative px-3 py-1.5 shadow rounded-xl flex-center text-white">
                  {token ? "Sign Out" : "Sign In"}
                </button>
              </Link>

              <div className="lg:hidden">
                <MobMenu Menus={Menus} />
              </div>
            </div>
          </nav>
        </header>
      </div>

      {/* Search Results Section */}
      <div
        className="search-results w-full px-10 mt-16 flex justify-center items-center relative z-[0] top-0"
        style={{
          position: "absolute", // To layer the search results on top of the background
        }}>
        <div className="w-full max-w-screen-xl px-4 py-8   bg-opacity-80 rounded-lg shadow-lg">
          {searchPerformed && searchResults.length === 0 && (
            <div className="text-center">
              <h3>No cars found for &quot;{searchQuery}&quot;.</h3>
            </div>
          )}

          {searchResults.length > 0 && (
            <div>
              <h3 className="text-center mb-8 text-xl ">Search Results:</h3>
              <div className="cars-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-10 cursor-pointer justify-center">
                {searchResults.map((car) => (
                  <div
                    className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md max-w-sm mx-auto h-auto transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400"
                    key={car._id}>
                    {/* Image Section */}
                    <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                      <img
                        className="w-full h-full object-cover transition-all duration-300 hover:scale-110"
                        src={`http://localhost:5000/${car.imageUrl}`}
                        alt={`${car.brand} ${car.model}`}
                      />
                    </div>

                    {/* Car Details Section */}
                    <div className="p-6">
                      <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                        {car.brand} {car.model}
                      </h5>
                      <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                        Year: {car.year}
                      </p>
                      <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                        Price: Rs. {car.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
