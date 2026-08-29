import React, { useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import RiderDashboard from "./pages/dashboards/RiderDashboard";
import RestaurantDashboard from "./pages/dashboards/RestaurantDashboard";
import OrderNow from "./pages/Restaurants";
import RestaurantDisplayMenu from "./pages/RestaurantMenu";
import CheckoutPage from "./pages/CheckoutPage";
import AppLayout from "./Layout/AppLayout";
import AuthPageLayout from "./Layout/AuthPageLayout";
import Privacy from "./pages/Privacy";
import DashboardOverview from "./components/adminDashboard/AdminOverview";
import Customers from "./components/adminDashboard/Customers";
import Managers from "./components/adminDashboard/Managers";
import Riders from "./components/adminDashboard/Riders";
import ContactMessages from "./components/adminDashboard/ContactMessages";
import AdminProfile from "./components/adminDashboard/AdminProfile";
import Orders from "./components/adminDashboard/AdminOrders";
import AdminAddData from "./components/adminDashboard/AdminAddData";
import CustomerRoute from "./Layout/AuthCheckout";
import DummyLogin from "./pages/DummyLogin";
import AuthAdminLayout from "./Layout/AuthAdmin";
import AuthManagerLayout from "./Layout/AuthManager";
import AuthUserLayout from "./Layout/AuthCustomer";
import AuthRiderLayout from "./Layout/AuthRider";
import UserOverview from "./components/userDashboard/UserOverview";
import UserHelp from "./components/userDashboard/UserHelp";
import UserProfile from "./components/userDashboard/UserProfile";
import UserOrder from "./components/userDashboard/UserOrder";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 2000,
            style: {
              background: "#1F1811",
              color: "#FBF3E7",
              fontSize: "13px",
              fontWeight: "600",
              borderRadius: "0px",
              padding: "14px 18px",
            },
            success: {
              iconTheme: {
                primary: "#6B8E4E",
                secondary: "#FBF3E7",
              },
            },
            error: {
              iconTheme: {
                primary: "#E8491D",
                secondary: "#FBF3E7",
              },
            },
          }}
        />

        <Routes>
          {/*AuthPage: No Header and Footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/customer-signup" element={<SignUp />} />
          <Route path="/restaurant-signup" element={<SignUp />} />
          <Route path="/partner-signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />

          {/* Auth Protected Page  */}
          <Route element={<AuthPageLayout />}>
            {/* Customer Protected Route */}
            <Route path="/user-dashboard" element={<AuthUserLayout />}>
              <Route index element={<UserOverview />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="orders" element={<UserOrder />} />
              <Route path="help" element={<UserHelp />} />
            </Route>

            {/* Rider Protected Route */}
            <Route path="/rider-dashboard" element={<AuthRiderLayout />}>
              <Route index element={<RiderDashboard />} />
            </Route>

            {/* Manager Proteted Route */}
            <Route path="/restaurant-dashboard" element={<AuthManagerLayout />}>
              <Route index element={<RestaurantDashboard />} />
            </Route>

            {/* Admin Protected Route */}
            <Route path="/admin-dashboard" element={<AuthAdminLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="orders" element={<Orders />} />
              <Route path="customers" element={<Customers />} />
              <Route path="managers" element={<Managers />} />
              <Route path="riders" element={<Riders />} />
              <Route path="messages" element={<ContactMessages />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="add-user" element={<AdminAddData />} />
            </Route>

            {/* ONLY CUSTOMER CAN ACCESS CHECKOUT */}
            <Route element={<CustomerRoute />}>
              <Route path="/checkout" element={<CheckoutPage />} />
            </Route>
          </Route>

          {/* MainPage: With Header and Footer  */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="restaurants" element={<OrderNow />} />
            <Route path="dummy-login" element={<DummyLogin />} />
            <Route
              path="restaurants/:restaurantId"
              element={<RestaurantDisplayMenu />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
};
