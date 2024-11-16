/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import bannerImage from "../assets/banner.jpg";

export default function ViewCars() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/cars/viewCars"
        );
        setCars(response.data.cars); // Update state with fetched cars
      } catch (error) {
        alert("Error fetching cars");
      }
    };

    fetchCars();
  }, []);

  return (
    <StyledWrapper
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <h2 className="text-4xl font-bold text-center p-6 text-white">
        All Cars
      </h2>
      <div className="cars-grid grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16 w-full max-w-screen-xl max-lg:mx-16 gap-y-16 ">
        {cars.map((car) => (
          <div className="flip-card mb-5 " key={car._id}>
            <div className="flip-card-inner ">
              {/* Front Side of the Card */}
              <div className="flip-card-front ">
                <img
                  className="w-full h-full object-cover rounded-xl"
                  src={`http://localhost:5000/${car.imageUrl}`}
                  alt={`${car.brand} ${car.model}`}
                />
                <p className="title">
                  {car.brand} {car.model}
                </p>
                <p>Hover for details</p>
              </div>

              {/* Back Side of the Card */}
              <div className="flip-card-back">
                <p className="title">
                  {car.brand} {car.model}
                </p>
                <p>Title: {car.title}</p>
                <p>Description: {car.description}</p>
                <p>Year: {car.year}</p>
                <p>Price: Rs. {car.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .cars-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
    padding: 16px;
  }

  .flip-card {
    background-color: transparent;
    width: 100%;
    height: 280px;
    perspective: 1000px;
    font-family: sans-serif;
  }

  .title {
    font-size: 1.2em;
    font-weight: 900;
    text-align: center;
    margin: 0;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.2);
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border: 1px solid coral;
    border-radius: 1rem;
  }

  .flip-card-front {
    background: linear-gradient(
      120deg,
      bisque 60%,
      rgb(255, 231, 222) 88%,
      rgb(255, 211, 195) 40%,
      rgba(255, 127, 80, 0.603) 48%
    );
    color: coral;
    padding: 16px;
  }

  .flip-card-back {
    background: linear-gradient(
      120deg,
      rgb(255, 174, 145) 30%,
      coral 88%,
      bisque 40%,
      rgb(255, 185, 160) 78%
    );
    color: white;
    transform: rotateY(180deg);
    padding: 16px;
    text-align: center;
  }

  .flip-card img {
    border-radius: 1rem;
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }

  /* Mobile-first adjustments */
  @media (max-width: 767px) {
    .cars-grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .flip-card {
      height: 240px;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .cars-grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .flip-card {
      height: 280px;
    }
  }

  @media (min-width: 1025px) {
    .cars-grid {
      grid-template-columns: repeat(4, 1fr);
    }

    .flip-card {
      height: 320px;
    }
  }
`;
