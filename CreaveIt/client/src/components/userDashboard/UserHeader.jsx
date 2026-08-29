import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaArrowRight, FaUtensils } from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";

const UserHeader = ({ onMenuClick }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getInitial = () => {
    return user?.fullName?.charAt(0)?.toUpperCase() || "U";
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#1F1811]/10 bg-[#FBF3E7] px-4 sm:px-6 lg:px-8">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex size-10 cursor-pointer items-center justify-center text-[#1F1811] transition-colors hover:bg-[#1F1811] hover:text-[#FBF3E7] lg:hidden"
        >
          <FaBars />
        </button>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
            Customer Dashboard
          </p>

          <h1 className="font-[Archivo_Black] text-sm uppercase text-[#1F1811] sm:text-base">
            Welcome, {user?.fullName?.split(" ")[0] || "Customer"}
          </h1>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Explore */}
        <button
          type="button"
          onClick={() => navigate("/restaurants")}
          className="hidden cursor-pointer items-center gap-2 bg-[#E8491D] px-4 py-2.5 text-xs font-bold text-[#FBF3E7] transition-colors hover:bg-[#C93B16] sm:flex"
        >
          <FaUtensils />
          Explore Food
          <FaArrowRight className="text-[10px]" />
        </button>

        {/* Profile */}
        <Link
          to="/user-dashboard/profile"
          className="flex size-10 items-center justify-center overflow-hidden bg-[#1F1811] font-bold text-[#FBF3E7]"
        >
          {user?.photo?.url ? (
            <img
              src={user.photo.url}
              alt={user.fullName}
              className="h-full w-full object-cover"
            />
          ) : (
            getInitial()
          )}
        </Link>
      </div>
    </header>
  );
};

export default UserHeader;
