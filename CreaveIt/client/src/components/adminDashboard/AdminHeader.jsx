import React from "react";
import { useAuth } from "../../context/AuthContext";

import { FaBars, FaRegCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

const AdminHeader = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-[#1F1811]/10 bg-[#FBF3E7] px-4 sm:px-6 lg:px-8">
      {/* Mobile Menu */}
      <button
        type="button"
        onClick={onMenuClick}
        className="flex size-10 cursor-pointer items-center justify-center text-[#1F1811] lg:hidden"
      >
        <FaBars />
      </button>

      {/* Desktop Title */}
      <div className="hidden lg:block">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#E8491D]">
          CraveIt Administration
        </p>

        <h2 className="mt-0.5 font-[Archivo_Black] text-sm uppercase text-[#1F1811]">
          Admin Dashboard
        </h2>
      </div>

      {/* Mobile Title */}
      <div className="lg:hidden">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#E8491D]">
          CraveIt
        </p>

        <h2 className="font-[Archivo_Black] text-sm uppercase text-[#1F1811]">
          Admin Panel
        </h2>
      </div>

      {/* Admin */}
      <Link to={"/admin-dashboard/profile"} className="flex items-center gap-3">
        {user?.photo?.url ? (
          <img
            src={user.photo.url}
            alt={user?.fullName || "Admin"}
            className="size-9 object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="flex size-9 items-center justify-center bg-[#1F1811] text-[#FBF3E7]">
            <FaRegCircleUser />
          </div>
        )}

        <div className="hidden sm:block">
          <p className="text-sm font-bold text-[#1F1811]">
            {user?.fullName || "Admin"}
          </p>

          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#8A7C6A]">
            Admin
          </p>
        </div>
      </Link>
    </header>
  );
};

export default AdminHeader;
