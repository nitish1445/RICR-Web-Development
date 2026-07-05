import React, { useState } from "react";
import transparentLogo from "../assets/transparentLogo1.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaRegCircleUser } from "react-icons/fa6";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const { user, isLogin, role } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = () => {
    switch (role) {
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
        break;
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-(--color-primary)">
      <div className="flex justify-between items-center px-4 py-2">
        {/* Logo */}
        <Link to="/">
          <img
            src={transparentLogo}
            alt=""
            className="h-10 w-16 object-cover"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex gap-4 border-r border-(--color-background) pr-4">
            <Link to="/" className="text-white hover:text-(--color-accent)">
              Home
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-(--color-accent)"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-(--color-accent)"
            >
              Contact
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex gap-4 items-center">
            {isLogin ? (
              <div className="flex items-center gap-3">
                <span className="text-(--color-secondary)">
                  Hey, {user.fullName}
                </span>
                <div onClick={handleNavigate}>
                  {user.photo?.url ? (
                    <img
                      src={user.photo.url}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <FaRegCircleUser className="w-6 h-6 text-white" />
                  )}
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-(--color-secondary) hover:underline"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/SignUp")}
                  className="text-(--color-secondary) hover:underline"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <FiX className="text-white w-6 h-6" />
            ) : (
              <FiMenu className="text-white w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-4 pb-4 bg-(--color-primary)">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-white"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="text-white"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="text-white"
          >
            Contact
          </Link>

          <div className="border-t border-(--color-background) pt-3">
            {isLogin ? (
              <div className="flex items-center justify-between gap-3">
                <span className="text-(--color-secondary)">
                  Hey, {user.fullName}
                </span>
                <div onClick={handleNavigate}>
                  {user.photo?.url ? (
                    <img
                      src={user.photo.url}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <FaRegCircleUser className="w-6 h-6 text-white" />
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-start gap-4">
                <button
                  onClick={() => {
                    navigate("/login");
                    setMenuOpen(false);
                  }}
                  className="text-(--color-secondary)"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/Signup");
                    setMenuOpen(false);
                  }}
                  className="text-(--color-secondary)"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
