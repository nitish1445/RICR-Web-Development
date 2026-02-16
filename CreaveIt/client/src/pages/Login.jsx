import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ForgetPasswordModal from "../components/publicModal/ForgetPasswordModal";
import { FiLogIn } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import { VscLock } from "react-icons/vsc";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineSafety,
} from "react-icons/ai";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isForgetPasswordModalOpen, setIsForgetPasswordModalOpen] =
    useState(false);
  const { setUser, setIsLogin, setRole } = useAuth();
  const [detail, setDetail] = useState({
    email: "",
    password: "",
  });

  const handleClear = () => {
    setDetail({
      email: "",
      password: "",
    });
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => ({ ...prev, [name]: value }));
  };
  // navigate defined here
  const navigate = useNavigate();

  const submitLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post("/auth/login", detail);
      toast.success(res.data.message);
      setUser(res.data.data);
      setIsLogin(true);
      sessionStorage.setItem("CraveItUser", JSON.stringify(res.data.data));
      handleClear();
      switch (res.data.data.role) {
        case "manager": {
          setRole("manager");
          navigate("/restaurant-dashboard");
          break;
        }
        case "partner": {
          setRole("partner");
          navigate("/rider-dashboard");
          break;
        }
        case "customer": {
          setRole("customer");
          navigate("/user-dashboard");
          break;
        }
        case "admin": {
          setRole("admin");
          navigate("/admin-dashboard");
          break;
        }

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unkown Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/*Login Details */}

      <div className="max-h-full bg-linear-to-br from-blue-50 to-indigo-100 py-5 px-4">
        <div className="max-w-110 mx-auto mt-5">
          {/* Header */}

          <div className="flex flex-col items-center space-y-2 pb-5">
            <div className="text-4xl p-5 rounded-full bg-white text-(--color-primary)">
              <AiOutlineSafety />
            </div>
            <div className="text-3xl font-bold text-(--color-secondary)">
              Login
            </div>
            <div className="text-sm text-(--color-secondary)">
              Sign in to end your cravings
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <form onSubmit={submitLogin} onReset={handleClear} className="p-8">
              <div className="mb-5">
                {/* User Information */}

                <div className="space-y-3">
                  {/* Login Email */}

                  <div className="">
                    <div className="block text-sm font-medium text-gray-700 mb-2 ">
                      Email Address <span className="text-red-500">*</span>{" "}
                    </div>
                    <div className="relative">
                      <LuUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                      <input
                        type="text"
                        name="email"
                        placeholder="Enter you registered email "
                        value={detail.email}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                        className="w-full h-fit px-10 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                      />
                    </div>
                  </div>

                  {/* Login Password */}

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
                        placeholder="Enter your Password"
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
                          <AiOutlineEyeInvisible className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                        ) : (
                          <AiOutlineEye className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Login Button */}

              <div className=" ">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center bg-(--color-secondary) font-bold py-3 px-6 rounded-lg hover:bg-(--color-secondary-hover) transition duration-300 transform hover:scale-105 shadow-lg cursor-pointer w-full disabled:cursor-not-allowed disabled:scale-100 disabled:bg-(--color-secondary) text-white"
                >
                  {isLoading ? (
                    "Loading..!"
                  ) : (
                    <span className="flex items-center gap-2">
                      <FiLogIn /> Sign In
                    </span>
                  )}
                </button>
              </div>

              {/* Difficulity in Login process*/}

              <div>
                {/* Forgotten Password */}

                <div className="border-b-2 border-gray-200 text-end py-3">
                  <button
                    type="submit"
                    className="text-(--color-text) cursor-pointer hover:text-blue-700 hover:underline"
                    onClick={(e) => {
                      console.log(isForgetPasswordModalOpen);
                      e.preventDefault();
                      setIsForgetPasswordModalOpen(true);
                    }}
                  >
                    Forgotten Password?
                  </button>
                </div>

                {/* Don't have Account */}

                <div className=" text-center pt-5">
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/SignUp");
                    }}
                    disabled={isLoading}
                    className="flex-1 bg-(--color-background) text-(--color-primary) font-bold py-3 px-6 rounded-lg shadow-lg cursor-pointer disabled:cursor-not-allowed"
                  >
                    Didn't have account?
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="text-xs pt-5 text-center text-gray-600">
            By signing in you agree to the event terms & conditions.
          </div>
        </div>
      </div>
      {isForgetPasswordModalOpen && (
        <ForgetPasswordModal
          onClose={() => setIsForgetPasswordModalOpen(false)}
        />
      )}
    </>
  );
};

export default Login;
