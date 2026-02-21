import React from "react";
import transparentLogo from "../assets/transparentLogo1.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaRegCircleUser } from "react-icons/fa6";

const Header = () => {
  const { user, isLogin, role } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = () => {
    switch (role) {
      case "manager": {
        navigate("/restaurant-dashboard");
        break;
      }
      case "partner": {
        navigate("/rider-dashboard");
        break;
      }
      case "customer": {
        navigate("/user-dashboard", { state: { tab: "overview" } });
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
      <div className="sticky top-0 z-100 flex justify-between items-center bg-(--color-primary) px-4 py-1.5">
        {/* Logo */}

        <Link to={"/"}>
          <img
            src={transparentLogo}
            alt=""
            className="h-12 w-20 object-cover"
          />
        </Link>

        <div className="flex gap-4 items-center">
          {/* Pages  */}

          <div className="flex gap-4 border-r border-(--color-background) px-4">
            <Link to={"/"} className=" text-white hover:text-(--color-accent)">
              Home
            </Link>
            <Link
              to={"/about"}
              className=" text-white hover:text-(--color-accent)"
            >
              About
            </Link>
            <Link
              to={"/contact"}
              className=" text-white hover:text-(--color-accent)"
            >
              Contact
            </Link>
          </div>

          {/* Login/signup/userDisplay button */}

          <div className="flex gap-4">
            {isLogin ? (
              <div className="flex justify-between gap-3 items-center">
                <div className="text-(--color-secondary) font-bold">
                  Hey, {user.fullName}
                </div>
                <div onClick={handleNavigate} className="cursor-pointer">
                  {user.photo.url ? (
                    <img
                      src={user?.photo?.url}
                      className="w-8 h-8 rounded-full object-cover border-2 border-(--color-background)"
                    />
                  ) : (
                    <FaRegCircleUser className="w-6 h-6 text-white" />
                  )}
                  {/* */}
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="text-(--color-secondary) hover:underline cursor-pointer text-lg"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/SignUp");
                  }}
                  className="text-(--color-secondary) hover:underline cursor-pointer text-lg"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
