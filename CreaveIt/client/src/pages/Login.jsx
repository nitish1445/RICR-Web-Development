import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../config/Api";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/craveIt-logo.png";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaKey,
  FaArrowRight,
  FaUtensils,
} from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setIsLogin, setRole, login } = useAuth();
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.post("/auth/login", formData);
      const user = response.data.data;

      setUser(user);
      setIsLogin(true);
      setRole(user.role);
      login(response.data.data);
      toast.success(response.data.message);

      switch (user.role) {
        case "manager":
          navigate("/restaurant-dashboard");
          break;
        case "partner":
          navigate("/rider-dashboard");
          break;
        case "customer":
          navigate("/user-dashboard", { state: { tab: "overview" } });
          break;
        case "admin":
          navigate("/admin-dashboard");
          break;
        default:
          navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.post("/auth/genOtp", { email: forgotEmail });
      toast.success(response.data.message);
      setMode("verify-otp");
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || "Unable to start password recovery.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.post("/auth/verifyOtp", {
        email: forgotEmail,
        otp,
      });
      toast.success(response.data.message);
      setMode("new-password");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      toast.error("Password should contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      const resetResponse = await api.post("/auth/forgetPassword", {
        newPassword,
      });
      const loginResponse = await api.post("/auth/login", {
        email: forgotEmail,
        password: newPassword,
      });
      const user = loginResponse.data.data;

      setUser(user);
      setIsLogin(true);
      setRole(user.role);
      sessionStorage.setItem("CraveItUser", JSON.stringify(user));
      toast.success(resetResponse.data.message);
      setForgotEmail("");
      setOtp("");
      setNewPassword("");

      switch (user.role) {
        case "manager":
          navigate("/restaurant-dashboard");
          break;
        case "partner":
          navigate("/rider-dashboard");
          break;
        case "customer":
          navigate("/user-dashboard", { state: { tab: "overview" } });
          break;
        case "admin":
          navigate("/admin-dashboard");
          break;
        default:
          navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Unable to reset your password.",
      );
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    setMode("login");
    setForgotEmail("");
    setOtp("");
    setNewPassword("");
  };

  const goToForgotPassword = () => {
    setMode("forgot-password");
  };

  const isForgotPassword = mode !== "login";

  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-[#FBF3E7]">
      {/* Left */}

      <div className="relative hidden h-full w-1/2 overflow-hidden bg-[#1F1811] lg:flex lg:w-[46%]">
        {/* Grain Background */}
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
              <span className="flex size-8 items-center justify-center">
                <img
                  src={Logo}
                  alt="CraveIt Logo"
                  className="h-full w-full object-contain"
                />
              </span>

              <span className="font-[Archivo_Black] text-lg tracking-wide text-[#FBF3E7]">
                CRAVE<span className="text-[#E8491D]">IT</span>
              </span>
            </button>
          </div>

          {/* Content */}
          <div className="max-w-md">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E8491D]">
              {isForgotPassword ? "ACCOUNT RECOVERY" : "WELCOME BACK"}
            </p>

            <h1 className="mt-3 font-[Archivo_Black] text-4xl leading-[0.95] text-[#FBF3E7] xl:text-5xl">
              {isForgotPassword ? (
                <>
                  LET'S GET YOU
                  <br />
                  <span className="text-[#E8491D]">BACK</span>
                  <br />
                  TO CRAVING.
                </>
              ) : (
                <>
                  YOUR NEXT
                  <br />
                  <span className="text-[#E8491D]">CRAVING</span>
                  <br />
                  IS WAITING.
                </>
              )}
            </h1>

            <p className="mt-5 max-w-sm text-sm leading-6 text-[#C9BEB0]">
              {isForgotPassword
                ? "Enter your email and we'll help you get back into your CraveIt account."
                : "Sign in to discover your favorite restaurants, explore great food, and pick up right where you left off."}
            </p>

            {/* Features */}
            <div className="mt-6 space-y-2.5">
              {[
                "Explore your favorite restaurants",
                "Access your orders and saved favorites",
                "Get back to ordering in just a few clicks",
              ].map((text) => (
                <div key={text} className="flex items-center gap-2.5">
                  <FiCheckCircle className="shrink-0 text-xs text-[#F2895A]" />

                  <p className="text-xs text-[#C9BEB0]">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Text */}
          <div className="absolute bottom-7 left-12 xl:left-16">
            <p className="font-[JetBrains_Mono] text-[10px] uppercase tracking-[0.15em] text-[#8A7C6A]">
              Discover. Order. Enjoy.
            </p>
          </div>
        </div>
      </div>

      {/* Right */}

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

          {/* Login */}

          {mode === "login" && (
            <>
              {/* Heading */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E8491D]">
                  LOGIN PAGE
                </p>

                <h2 className="mt-1.5 font-[Archivo_Black] text-2xl text-[#1F1811] sm:text-3xl">
                  WELCOME BACK
                </h2>

                <p className="mt-1.5 text-xs leading-5 text-[#8A7C6A] sm:text-sm">
                  Sign in to continue your food journey.
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="mt-6 space-y-4">
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
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#1F1811]">
                      Password
                    </label>

                    <button
                      type="button"
                      onClick={goToForgotPassword}
                      className="cursor-pointer text-[11px] font-semibold text-[#E8491D] transition-opacity hover:opacity-70"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="flex items-center gap-2.5 border-b border-[#1F1811]/20 py-2 transition-colors focus-within:border-[#E8491D]">
                    <FaLock className="text-xs text-[#8A7C6A]" />

                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      className="w-full bg-transparent text-sm text-[#1F1811] outline-none placeholder:text-[#8A7C6A]/60"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="cursor-pointer text-[#8A7C6A] transition-colors hover:text-[#E8491D]"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
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
                  className="group mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#E8491D] py-2.5 text-sm font-bold text-[#FBF3E7] transition-all hover:bg-[#d93f17] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "SIGNING IN..." : "SIGN IN"}

                  {!loading && (
                    <FaArrowRight className="text-[11px] transition-transform duration-200 group-hover:translate-x-1" />
                  )}
                </button>
              </form>

              {/* Signup */}
              <p className="mt-5 text-center text-xs text-[#8A7C6A]">
                New to CraveIt?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/customer-signup")}
                  className="cursor-pointer font-bold text-[#E8491D] transition-opacity hover:opacity-70"
                >
                  Create an account
                </button>
              </p>
            </>
          )}

          {/* Password recovery */}

          {mode !== "login" && (
            <>
              {/* Heading */}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E8491D]">
                  ACCOUNT RECOVERY
                </p>

                <h2 className="mt-1.5 font-[Archivo_Black] text-2xl text-[#1F1811] sm:text-3xl">
                  {mode === "forgot-password"
                    ? "RESET PASSWORD"
                    : mode === "verify-otp"
                      ? "VERIFY YOUR EMAIL"
                      : "CREATE NEW PASSWORD"}
                </h2>

                <p className="mt-1.5 max-w-sm text-xs leading-5 text-[#8A7C6A] sm:text-sm">
                  {mode === "forgot-password"
                    ? "Enter the email connected to your account and we'll send you instructions to reset your password."
                    : mode === "verify-otp"
                      ? `Enter the OTP sent to ${forgotEmail}.`
                      : "Your email is verified. Create a new password to continue."}
                </p>
              </div>

              {mode === "forgot-password" && (
                <form
                  onSubmit={handleForgotPassword}
                  className="mt-6 space-y-4"
                >
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#1F1811]">
                      Email Address
                    </label>

                    <div className="flex items-center gap-2.5 border-b border-[#1F1811]/20 py-2 transition-colors focus-within:border-[#E8491D]">
                      <FaEnvelope className="text-xs text-[#8A7C6A]" />

                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full bg-transparent text-sm text-[#1F1811] outline-none placeholder:text-[#8A7C6A]/60"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#E8491D] py-2.5 text-sm font-bold text-[#FBF3E7] transition-all hover:bg-[#d93f17] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? "SENDING..." : "SEND RESET INSTRUCTIONS"}
                    {!loading && (
                      <FaArrowRight className="text-[11px] transition-transform duration-200 group-hover:translate-x-1" />
                    )}
                  </button>
                </form>
              )}

              {mode === "verify-otp" && (
                <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#1F1811]">
                      One-Time Password
                    </label>

                    <div className="flex items-center gap-2.5 border-b border-[#1F1811]/20 py-2 transition-colors focus-within:border-[#E8491D]">
                      <FaKey className="text-xs text-[#8A7C6A]" />
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) =>
                          setOtp(e.target.value.replace(/\D/g, ""))
                        }
                        placeholder="Enter the OTP"
                        inputMode="numeric"
                        maxLength={6}
                        required
                        className="w-full bg-transparent text-sm tracking-[0.3em] text-[#1F1811] outline-none placeholder:tracking-normal placeholder:text-[#8A7C6A]/60"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#E8491D] py-2.5 text-sm font-bold text-[#FBF3E7] transition-all hover:bg-[#d93f17] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? "VERIFYING..." : "VERIFY OTP"}
                    {!loading && (
                      <FaArrowRight className="text-[11px] transition-transform duration-200 group-hover:translate-x-1" />
                    )}
                  </button>
                </form>
              )}

              {mode === "new-password" && (
                <form onSubmit={handleResetPassword} className="mt-6 space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#1F1811]">
                      New Password
                    </label>

                    <div className="flex items-center gap-2.5 border-b border-[#1F1811]/20 py-2 transition-colors focus-within:border-[#E8491D]">
                      <FaLock className="text-xs text-[#8A7C6A]" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter your new password"
                        minLength={6}
                        required
                        className="w-full bg-transparent text-sm text-[#1F1811] outline-none placeholder:text-[#8A7C6A]/60"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="cursor-pointer text-[#8A7C6A] transition-colors hover:text-[#E8491D]"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <FaEyeSlash className="text-sm" />
                        ) : (
                          <FaEye className="text-sm" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#E8491D] py-2.5 text-sm font-bold text-[#FBF3E7] transition-all hover:bg-[#d93f17] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? "UPDATING..." : "UPDATE PASSWORD"}
                    {!loading && (
                      <FaArrowRight className="text-[11px] transition-transform duration-200 group-hover:translate-x-1" />
                    )}
                  </button>
                </form>
              )}

              {/* Back to Login */}
              <p className="mt-5 text-center text-xs text-[#8A7C6A]">
                Remember your password?{" "}
                <button
                  type="button"
                  onClick={goToLogin}
                  className="cursor-pointer font-bold text-[#E8491D] transition-opacity hover:opacity-70"
                >
                  Back to sign in
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
