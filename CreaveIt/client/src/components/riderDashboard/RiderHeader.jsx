import React from "react";
import { FaBars, FaMotorcycle } from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";

const RiderHeader = ({ onMenuClick }) => {
  const { user } = useAuth();
  const getFirstName = () => {
    return user?.fullName?.split(" ")[0] || "Rider";
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#1F1811]/10 bg-[#FBF3E7]">
      <div className="flex h-18 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left */}

        <div className="flex items-center gap-3">
          {/* Mobile Menu */}

          <button
            type="button"
            onClick={onMenuClick}
            className="flex size-10 cursor-pointer items-center justify-center bg-[#1F1811] text-[#FBF3E7] lg:hidden"
            aria-label="Open menu"
          >
            <FaBars />
          </button>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#E8491D]">
              Delivery Dashboard
            </p>

            <h1 className="mt-0.5 font-[Archivo_Black] text-lg uppercase text-[#1F1811] sm:text-xl">
              Welcome, {getFirstName()}
            </h1>
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <p className="max-w-30 truncate text-base font-bold text-[#1F1811]">
              {user?.fullName || "Delivery Partner"}
            </p>

            <p className="mt-0.5 text-end text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
              Rider
            </p>
          </div>

          {/* Profile Image */}

          <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden bg-[#E8491D] text-sm font-bold text-[#FBF3E7]">
            {user?.photo?.url ? (
              <img
                src={user.photo.url}
                alt={user?.fullName || "Rider"}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";

                  const fallback = e.currentTarget.nextElementSibling;
                  if (fallback) {
                    fallback.style.display = "flex";
                  }
                }}
              />
            ) : null}

            {/* Fallback */}

            <div
              className={`h-full w-full items-center justify-center ${
                user?.photo?.url ? "hidden" : "flex"
              }`}
            >
              {user?.fullName?.charAt(0)?.toUpperCase() || <FaMotorcycle />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default RiderHeader;
