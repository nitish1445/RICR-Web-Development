import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api";
// import image from "../assets/transparentLogo1.png";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [detail, setDetail] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      confirmPassword: "",
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
        !/^[\w.+-]+@(gmail|outlook|ricr|yahoo)\.(com|in|co\.in)$/.test(
          detail.email
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

    // Confirm Password

    if (detail.confirmPassword.length == 0) {
      Error.confirmPassword = "Please confirm your password";
    } else {
      if (detail.password != detail.confirmPassword) {
        Error.confirmPassword = "Please enter the same password";
      }
    }

    setValidError(Error);
    return Object.keys(Error).length > 0 ? false : true;
  };

  const submitRegister = async (e) => {
    e.preventDefault();

    // Checks Any missing fields
    if (!validate()) {
      toast.error("Fill the form correctly.");
      return;
    }
    try {
      const res = await api.post("/auth/register", detail);
      setIsLoading(true);
      toast.success(res.data.message);
      handleClear();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Unkown Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/*Registration Details */}

      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-6 px-4">
        <div className="max-w-xl mx-auto mt-12">
          {/* Registration Block */}

          <div className="bg-white rounded-xl shadow-2xl overflow-hidden px-8 pt-5">
            <form onSubmit={submitRegister} onReset={handleClear}>
              {/* Header */}

              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-(--color-text)">
                  Register Now
                </h1>
                <p className="text-xs text-gray-600">
                  You are one step away to be a CraveIt Lover!
                </p>
              </div>

              {/* Personal Information */}

              <div className="mb-8">
                <div className="space-y-4">
                  {/* Full Name */}

                  <div className="text-end">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={detail.fullName}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                      className="w-full h-fit px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                    />
                    {validError.fullName && (
                      <span className="text-xs text-red-500">
                        {validError.fullName}
                      </span>
                    )}
                  </div>

                  {/* Phone  */}

                  <div className="text-end">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter your mobile number"
                      maxLength="10"
                      value={detail.phone}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                    />
                    {validError.phone && (
                      <span className="text-xs text-red-500">
                        {validError.phone}
                      </span>
                    )}
                  </div>

                  {/* Email */}

                  <div className="text-end">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={detail.email}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                      className="w-full h-fit px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                    />
                    {validError.email && (
                      <span className="text-xs text-red-500">
                        {validError.email}
                      </span>
                    )}
                  </div>

                  {/* Password Block*/}

                  <div className="grid grid-cols-2 gap-5">
                    {/* Create Password */}

                    <div>
                      <input
                        type="password"
                        name="password"
                        value={detail.password}
                        placeholder="Create a Password"
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                      />
                      {validError.password && (
                        <span className="text-[11px] text-red-500">
                          {validError.password}
                        </span>
                      )}
                    </div>

                    {/* Confirm Password */}

                    <div>
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your Password"
                        value={detail.confirmPassword}
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                      />
                      {validError.confirmPassword && (
                        <span className="text-[11px] text-red-500">
                          {validError.confirmPassword}
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
                  {isLoading ? "Submitting" : "Submit Details"}
                </button>
              </div>
            </form>

            {/* Already have account */}

            <div className="border-t-2 border-gray-200 px-8 mt-8 text-center">
              <p className="py-5">
                Already have account?{" "}
                <button
                  type="submit"
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

export default Register;
