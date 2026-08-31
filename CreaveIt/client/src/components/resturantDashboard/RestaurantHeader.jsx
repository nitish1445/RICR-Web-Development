import React from "react"
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";

const RestaurantHeader = ({ onMenuClick }) => {
  const { user } = useAuth();
  const getInitial = () => {
    return user?.fullName?.charAt(0)?.toUpperCase() || "M";
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
            Restaurant Dashboard
          </p>

          <h1 className="font-[Archivo_Black] text-sm uppercase text-[#1F1811] sm:text-base">
            Welcome, {user?.fullName?.split(" ")[0] || "Manager"}
          </h1>
        </div>
      </div>

      {/* Right Profile */}
      <Link
        to="/restaurant-dashboard/profile"
        className="flex items-center gap-3"
      >
        {/* Name & Role */}
        <div className="hidden text-right sm:block">
          <p className="max-w-40 truncate text-sm font-bold text-[#1F1811]">
            {user?.fullName || "Restaurant Manager"}
          </p>

          <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-[#8A7C6A]">
            {user?.role || "Manager"}
          </p>
        </div>

        {/* Profile Image */}
        <div className="flex size-9 items-center justify-center overflow-hidden bg-[#1F1811] font-bold text-[#FBF3E7]">
          {user?.photo?.url ? (
            <img
              src={user.photo.url}
              alt={user?.fullName}
              className="h-full w-full object-cover"
            />
          ) : (
            getInitial()
          )}
        </div>
      </Link>
    </header>
  );
};

export default RestaurantHeader;
