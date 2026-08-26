import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../config/Api";

import {
  FaEye,
  FaEyeSlash,
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaArrowRight,
  FaUtensils,
} from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getSignupType = () => {
    if (location.pathname === "/restaurant-signup") {
      return {
        role: "manager",
        title: "List your restaurant",
        description: "Join CraveIt and grow your restaurant business.",
        buttonText: "Register Restaurant",
      };
    }

    if (location.pathname === "/partner-signup") {
      return {
        role: "partner",
        title: "Become a delivery partner",
        description: "Deliver with CraveIt and earn on your schedule.",
        buttonText: "Become a Partner",
      };
    }

    return {
      role: "customer",
      title: "Create your account",
      description: "Join CraveIt and start discovering great food.",
      buttonText: "Create Account",
    };
  };

  const signupType = getSignupType();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (formData.name.trim().length < 3) {
      toast.error("Name should contain at least 3 letters.");
      return false;
    }

    if (!/^[A-Za-z ]+$/.test(formData.name.trim())) {
      toast.error("Name should contain only letters and spaces.");
      return false;
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit Indian phone number.");
      return false;
    }

    if (
      !/^[\w.+-]+@(gmail|outlook|ricr|yahoo|zohomail)\.(com|in|co\.in)$/.test(
        formData.email,
      )
    ) {
      toast.error("Use proper email format.");
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password should contain at least 6 characters.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const payload = {
        fullName: formData.name.trim(),
        phone: formData.phone,
        email: formData.email.trim(),
        password: formData.password,
        role: signupType.role,
      };

      const res = await api.post("/auth/register", payload);
      toast.success(res?.data?.message || "Registration Successful");

      setFormData({
        name: "",
        phone: "",
        email: "",
        password: "",
      });

      navigate("/login");
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-[#FBF3E7]">
      {/* Left Section */}
      <div className="relative hidden h-full w-1/2 overflow-hidden bg-[#1F1811] lg:flex lg:w-[46%]">
        {/* Grain */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative flex h-full w-full flex-col justify-center px-12 xl:px-16">
          {/* Brand */}
          <div className="absolute left-12 top-7 xl:left-16">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="inline-flex cursor-pointer items-center gap-2"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-[#E8491D] text-[#FBF3E7]">
                <FaUtensils className="text-sm" />
              </span>

              <span className="font-[Archivo_Black] text-lg tracking-wide text-[#FBF3E7]">
                CRAVE<span className="text-[#E8491D]">IT</span>
              </span>
            </button>
          </div>

          {/* Content */}
          <div className="max-w-md">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E8491D]">
              JOIN THE TABLE
            </p>

            <h1 className="mt-3 font-[Archivo_Black] text-4xl leading-[0.95] text-[#FBF3E7] xl:text-5xl">
              GOOD FOOD
              <br />
              STARTS WITH A
              <br />
              <span className="text-[#E8491D]">GOOD CRAVING.</span>
            </h1>

            <p className="mt-5 max-w-sm text-sm leading-6 text-[#C9BEB0]">
              Discover restaurants, explore delicious dishes, and get your
              favorite food delivered to your doorstep.
            </p>

            {/* Features */}
            <div className="mt-6 space-y-2.5">
              {[
                "Discover restaurants near you",
                "Order your favorite meals easily",
                "Track every order from kitchen to doorstep",
              ].map((text) => (
                <div key={text} className="flex items-center gap-2.5">
                  <FiCheckCircle className="shrink-0 text-xs text-[#F2895A]" />

                  <p className="text-xs text-[#C9BEB0]">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div className="absolute bottom-7 left-12 xl:left-16">
            <p className="font-[JetBrains_Mono] text-[10px] uppercase tracking-[0.15em] text-[#8A7C6A]">
              Discover. Order. Enjoy.
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex h-full flex-1 items-center justify-center px-4 py-4 sm:px-6 lg:px-10">
        <div className="w-full max-w-md">
          {/* Mobile Brand */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mb-5 inline-flex cursor-pointer items-center gap-2 lg:hidden"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-[#E8491D] text-[#FBF3E7]">
              <FaUtensils className="text-sm" />
            </span>

            <span className="font-[Archivo_Black] text-lg tracking-wide text-[#1F1811]">
              CRAVE<span className="text-[#E8491D]">IT</span>
            </span>
          </button>

          {/* Heading */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E8491D]">
              {signupType.role === "manager"
                ? "Restaurant"
                : signupType.role === "partner"
                  ? "Delivery Partner"
                  : "Customer"}{" "}
              ACCOUNT
            </p>

            <h2 className="mt-1.5 font-[Archivo_Black] text-2xl text-[#1F1811] sm:text-3xl">
              {signupType.title}
            </h2>

            <p className="mt-1.5 text-xs leading-5 text-[#8A7C6A] sm:text-sm">
              {signupType.description}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-5 space-y-3">
            {/* Name */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#1F1811]">
                Full Name
              </label>

              <div className="flex items-center gap-2.5 border-b border-[#1F1811]/20 py-2 transition-colors focus-within:border-[#E8491D]">
                <FaUser className="text-xs text-[#8A7C6A]" />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full bg-transparent text-sm text-[#1F1811] outline-none placeholder:text-[#8A7C6A]/60"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#1F1811]">
                Mobile Number
              </label>

              <div className="flex items-center gap-2.5 border-b border-[#1F1811]/20 py-2 transition-colors focus-within:border-[#E8491D]">
                <FaPhone className="text-xs text-[#8A7C6A]" />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your 10-digit mobile number"
                  inputMode="numeric"
                  maxLength={10}
                  required
                  className="w-full bg-transparent text-sm text-[#1F1811] outline-none placeholder:text-[#8A7C6A]/60"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#1F1811]">
                Email Address
              </label>

              <div className="flex items-center gap-2.5 border-b border-[#1F1811]/20 py-2 transition-colors focus-within:border-[#E8491D]">
                <FaEnvelope className="text-xs text-[#8A7C6A]" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-transparent text-sm text-[#1F1811] outline-none placeholder:text-[#8A7C6A]/60"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-[#1F1811]">
                Password
              </label>

              <div className="flex items-center gap-2.5 border-b border-[#1F1811]/20 py-2 transition-colors focus-within:border-[#E8491D]">
                <FaLock className="text-xs text-[#8A7C6A]" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  className="w-full bg-transparent text-sm text-[#1F1811] outline-none placeholder:text-[#8A7C6A]/60"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer text-[#8A7C6A] transition-colors hover:text-[#E8491D]"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-sm" />
                  ) : (
                    <FaEye className="text-sm" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#E8491D] py-2.5 text-sm font-bold text-[#FBF3E7] transition-all hover:bg-[#d93f17] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "CREATING ACCOUNT..." : signupType.buttonText}

              {!loading && (
                <FaArrowRight className="text-[11px] transition-transform duration-200 group-hover:translate-x-1" />
              )}
            </button>
          </form>

          {/* Login */}
          <p className="mt-4 text-center text-xs text-[#8A7C6A]">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="cursor-pointer font-bold text-[#E8491D] transition-opacity hover:opacity-70"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
