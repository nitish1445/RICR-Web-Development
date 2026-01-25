import React from "react";
import transparentLogo from "../assets/transparentLogo1.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, isLogin, role  } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = () => {
    switch (role) {
      case "manager": {
        navigate("/resturant-dashboard");
        break;
      }
      case "partner": {
        navigate("/rider-dashboard");
        break;
      }
      case "customer": {
        navigate("/user-dashboard");
        break;
      }
      case "admin": {
        navigate("/admin-dashboard");
        break;
      }
      default:
        break;
    }
  };
  return (
    <>
      <div className="sticky top-0 flex justify-between items-center bg-(--color-primary) px-4 py-2">
        <Link to={"/"}>
          <img
            src={transparentLogo}
            alt=""
            className="h-12 w-20 object-cover"
          />
        </Link>
        <div className="flex gap-4">
          <Link
            to={"/"}
            className="text-decoration-none text-white hover:text-(--color-accent)"
          >
            Home
          </Link>
          <Link
            to={"/about"}
            className="text-decoration-none text-white hover:text-(--color-accent)"
          >
            About
          </Link>
          <Link
            to={"/contact"}
            className="text-decoration-none text-white hover:text-(--color-accent)"
          >
            Contact
          </Link>
        </div>
        <div className="flex gap-4">
          {isLogin ? (
            <div className="text-(--color-secondary) font-bold" onClick={handleNavigate}>{user.fullName}</div>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="bg-(--color-secondary) py-1.5 px-5 font-bold hover:bg-(--color-secondary-hover) hover:text-white rounded cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/SignUp");
                }}
                className="bg-(--color-secondary) py-1.5 px-5 font-bold hover:bg-(--color-secondary-hover) hover:text-white rounded cursor-pointer"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
