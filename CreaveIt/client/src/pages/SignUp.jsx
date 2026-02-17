import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api";
import { useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import { VscLock } from "react-icons/vsc";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineSafety,
} from "react-icons/ai";
import { MdOutlineMail } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [detail, setDetail] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // navigage declared
  const navigate = useNavigate();

  const handleClear = () => {
    setDetail({
      fullName: "",
      phone: "",
      email: "",
      password: "",
      role: "",
    });
  };

  const [validError, setValidError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let Error = {};

    // Name error validation

    if (detail.fullName.length == 0) {
      Error.fullName = "Please Enter your name here";
    } else {
      if (detail.fullName.length < 3) {
        Error.fullName = "Name should contain atleast three letters.";
      } else {
        if (!/^[A-z ]+$/.test(detail.fullName)) {
          Error.fullName = "Name should contains only A-Z, a-z and space.";
        }
      }
    }

    // Phone error validation

    if (detail.phone.length == 0) {
      Error.phone = "Please enter your phone number";
    } else {
      if (!/^[6-9]\d{9}$/.test(detail.phone)) {
        Error.phone = "Please enter an Indian Number";
      }
    }

    // Email error validation

    if (detail.email.length === 0) {
      Error.email = "Please enter your email here";
    } else {
      if (
        !/^[\w.+-]+@(gmail|outlook|ricr|yahoo|zohomail)\.(com|in|co\.in)$/.test(
          detail.email,
        )
      ) {
        Error.email = "Use proper email format.";
      }
    }
    // Password create

    if (detail.password.length == 0) {
      Error.password = "Please create a password";
    } else {
      if (detail.password.length < 6) {
        Error.password = "Password should contain atleast 6 digits";
      }
    }

    // role validation

    if (!detail.role) {
      Error.role = "Please choose any one";
    }

    setValidError(Error);
    return Object.keys(Error).length > 0 ? false : true;
  };

  const submitSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Checks Any missing fields
    if (!validate()) {
      toast.error("Fill the form correctly.");
      return;
    }
    try {
      const res = await api.post("/auth/register", detail);
      toast.success(res.data.message);
      handleClear();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unkown Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/*Registration Details */}

      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-6 px-4">
        <div className="max-w-lg mx-auto mt-5">
          {/* Hero Section */}

          <div className="flex flex-col items-center space-y-2 pb-5">
            <div className="text-4xl p-5 rounded-full bg-white text-(--color-primary)">
              <AiOutlineSafety />
            </div>
            <div className="text-3xl font-bold text-(--color-secondary)">
              Sign Up
            </div>
            <div className="text-sm text-(--color-secondary)">
              Start your journery to end cravings here
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-2xl overflow-hidden p-8">
            <form onSubmit={submitSignUp} onReset={handleClear}>
              {/* Personal Information */}

              <div className="mb-8">
                <div className="space-y-4">
                  {/* Role */}

                  <div>
                    <div className="flex items-center justify-between">
                      <label>I am </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="role"
                          id="manager"
                          checked={detail.role === "manager"}
                          value={"manager"}
                          onChange={handleChange}
                          className="cursor-pointer"
                        />
                        <label htmlFor="manager">Resturant Manager</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="role"
                          id="partner"
                          checked={detail.role === "partner"}
                          value={"partner"}
                          onChange={handleChange}
                          className="cursor-pointer"
                        />
                        <label htmlFor="partner">Delivery Partner</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="role"
                          id="customer"
                          checked={detail.role === "customer"}
                          value={"customer"}
                          onChange={handleChange}
                          className="cursor-pointer"
                        />
                        <label htmlFor="customer">Customer</label>
                      </div>
                    </div>
                    {validError.role && (
                      <span className="text-xs text-red-500">
                        {validError.role}
                      </span>
                    )}
                  </div>

                  {/* Full Name */}

                  <div className="">
                    <div className="block text-sm font-medium text-gray-700 mb-2 ">
                      Full Name <span className="text-red-500">*</span>{" "}
                    </div>
                    <div className="relative">
                      <LuUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Enter you full name"
                        value={detail.fullName}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                        className="w-full h-fit px-10 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                      />
                      {validError.fullName && (
                        <span className="text-[11px] text-red-500">
                          {validError.fullName}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Email */}

                  <div className="">
                    <div className="block text-sm font-medium text-gray-700 mb-2 ">
                      Email Address <span className="text-red-500">*</span>{" "}
                    </div>
                    <div className="relative">
                      <MdOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                      <input
                        type="text"
                        name="email"
                        placeholder="Enter you email to register"
                        value={detail.email}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                        className="w-full h-fit px-10 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                      />
                      {validError.email && (
                        <span className="text-[11px] text-red-500">
                          {validError.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Phone  */}

                  <div className="">
                    <div className="block text-sm font-medium text-gray-700 mb-2 ">
                      Mobile Number <span className="text-red-500">*</span>{" "}
                    </div>
                    <div className="relative">
                      <FaPhoneFlip className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-md" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Enter you mobile number "
                        value={detail.phone}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                        className="w-full h-fit px-10 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                      />
                      {validError.phone && (
                        <span className="text-[11px] text-red-500">
                          {validError.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Create Password */}

                  <div className="">
                    <div className="block text-sm font-medium text-gray-700 mb-2">
                      Password <span className="text-red-500">*</span>{" "}
                    </div>
                    <div className="relative">
                      <VscLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={detail.password}
                        placeholder="Create your password"
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                        className="w-full px-10 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                      />
                      <button
                        type="button"
                        className="cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <AiOutlineEyeInvisible className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                        ) : (
                          <AiOutlineEye className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                        )}
                      </button>
                      {validError.password && (
                        <span className="text-[11px] text-red-500">
                          {validError.password}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-(--color-secondary) text-(--color-primary) font-bold py-3 rounded-lg hover:bg-(--color-secondary-hover) transition duration-300 transform hover:scale-105 shadow-lg cursor-pointer disabled:cursor-not-allowed disabled:scale-100 disabled:bg-(--color-secondary) w-full"
                >
                  {isLoading ? "Submitting" : "Create Account"}
                </button>
              </div>
            </form>

            {/* Already have account */}

            <div className="border-t-2 border-gray-200 px-8 mt-8 text-center">
              <p className="pt-5">
                Already have account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="text-blue-700 cursor-pointer hover:text-blue-700 hover:underline"
                >
                  Login Now
                </button>
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-center text-gray-600 mt-5 text-sm">
            All fields marked are mandatory. We respect your privacy.
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
