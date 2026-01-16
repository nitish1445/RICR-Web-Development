import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
      handleClear();
      navigate("/user-dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Unkown Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/*Login Details */}

      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-5 px-4">
        <div className="max-w-110 mx-auto mt-12">
          {/* Header */}

          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <form
              onSubmit={submitLogin}
              onReset={handleClear}
              className="pt-5 px-5"
            >
              <h1 className="text-2xl font-bold text-gray-900 mb-5">
                Login Now
              </h1>

              <div className="mb-5">
                {/* User Information */}

                <div className="space-y-3">
                  {/* Login Email */}

                  <div className="">
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter registered email to login"
                      value={detail.email}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                      className="w-full h-fit px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                    />
                  </div>

                  {/* Login Password */}

                  <div className="">
                    <input
                      type="password"
                      name="password"
                      value={detail.password}
                      placeholder="Enter your Password"
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                    />
                  </div>
                </div>
              </div>

              {/* Login Button */}

              <div className=" text-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-(--color-secondary) text-black font-bold py-3 px-6 rounded-lg hover:bg-(--color-secondary-hover) transition duration-300 transform hover:scale-105 shadow-lg cursor-pointer w-full disabled:cursor-not-allowed disabled:scale-100 disabled:bg-(--color-secondary)"
                >
                  {isLoading ? "Loading..!" : "Login Now"}
                </button>
              </div>
            </form>

            {/* Difficulity in Login process*/}

            <div className=" pb-5 px-8">
              {/* Forgotten Password */}

              <div className="border-b-2 border-gray-200 text-center py-3">
                <button className="text-(--color-text) cursor-pointer hover:text-blue-700 hover:underline">
                  Forgotten Password?
                </button>
              </div>

              {/* Don't have Account */}

              <div className=" text-center pt-5">
                <button
                  type="submit"
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
