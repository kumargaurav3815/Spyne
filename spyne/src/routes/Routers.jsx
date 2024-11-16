/** @format */

// Routers.js
import Home from "../pages/Home.jsx";
import SignIn from "../pages/SignIn.jsx";
import Signup from "../pages/SignUp.jsx";
import Help from "../pages/Help.jsx";
import AddCar from "../components/AddCar.jsx";
import DeleteCar from "../components/DeleteCar.jsx";
import EditCar from "../components/EditCar.jsx";
import UpdateCar from "../components/UpdateCar.jsx";
import ViewCar from "../components/CarView.jsx";
import { Routes, Route } from "react-router-dom";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/help" element={<Help />} />
      <Route path="/signUp" element={<Signup />} />
      <Route path="/addCar" element={<AddCar />} />
      <Route path="/deleteCar" element={<DeleteCar />} />
      <Route path="/editCar" element={<EditCar />} />
      <Route path="/updateCar/:id" element={<UpdateCar />} />
      <Route path="/viewCar" element={<ViewCar />} />
    </Routes>
  );
};

export default Routers;
