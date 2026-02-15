import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserDashBoard from "./pages/dashboards/UserDashBoard";
import RiderDashboard from "./pages/dashboards/RiderDashboard";
import RestaurantDashboard from "./pages/dashboards/RestaurantDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import OrderNow from "./pages/OrderNow";
import RestaurantDisplayMenu from "./pages/RestaurantDisplayMenu";
// import Loading from "./components/Loading";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/user-dashboard" element={<UserDashBoard />} />
          <Route path="/rider-dashboard" element={<RiderDashboard />} />
          <Route
            path="/restaurant-dashboard"
            element={<RestaurantDashboard />}
          />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/order" element={<OrderNow />} />
          <Route path="/restaurant/:id" element={<RestaurantDisplayMenu />} />
          <Route path="*" element={<NotFound />} />
          {/* <Route path="/loading" element={<Loading />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
