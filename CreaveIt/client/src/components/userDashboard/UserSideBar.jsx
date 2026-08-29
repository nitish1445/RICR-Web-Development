import React from "react";

import { NavLink } from "react-router-dom";

import {
  FaHouse,
  FaLocationDot,
  FaUser,
  FaArrowRightFromBracket,
  FaXmark,
  FaBagShopping,
  FaHeadset,
} from "react-icons/fa6";

import { useAuth } from "../../context/AuthContext";

import Logo from "../../assets/craveIt-logo.png";

const UserSidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const navigation = [
    {
      name: "Overview",
      path: "/user-dashboard",
      icon: FaHouse,
      end: true,
    },
    {
      name: "My Orders",
      path: "/user-dashboard/orders",
      icon: FaBagShopping,
    },
    {
      name: "Profile",
      path: "/user-dashboard/profile",
      icon: FaUser,
    },
    {
      name: "Help Desk",
      path: "/user-dashboard/help",
      icon: FaHeadset,
    },
  ];

  const getInitial = () => {
    return user?.fullName?.charAt(0)?.toUpperCase() || "U";
  };

  const handleLogout = async () => {
    await logout();
    onClose?.();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-[#1F1811]/50 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-64 flex-col
          bg-[#1F1811] transition-transform duration-300
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand */}
        <div className="flex h-16 items-center justify-between px-5">
          <NavLink to="/" onClick={onClose} className="flex items-center gap-2">
            <img src={Logo} alt="CraveIt" className="h-9 w-9 object-contain" />

            <span className="font-[Archivo_Black] text-lg tracking-tight text-[#FBF3E7]">
              CRAVE<span className="text-[#E8491D]">IT</span>
            </span>
          </NavLink>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-[#FBF3E7] lg:hidden"
          >
            <FaXmark className="text-lg" />
          </button>
        </div>

        {/* User Info */}
        <div className="mx-4 border-y border-white/10 py-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden bg-[#E8491D] font-bold text-[#FBF3E7]">
              {user?.photo?.url ? (
                <img
                  src={user.photo.url}
                  alt={user.fullName}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                getInitial()
              )}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[#FBF3E7]">
                {user?.fullName || "Customer"}
              </p>

              <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-[#E8491D]">
                Customer Account
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-5">
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A7C6A]">
            Main Menu
          </p>

          <div className="mt-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-[#E8491D] text-[#FBF3E7]"
                        : "text-[#C9BEB0] hover:bg-white/5 hover:text-[#FBF3E7]"
                    }`
                  }
                >
                  <Icon className="text-sm" />
                  {item.name}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Bottom */}
        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full cursor-pointer items-center gap-3 px-3 py-3 text-sm font-semibold text-[#C9BEB0] transition-colors hover:bg-[#E8491D]/10 hover:text-[#E8491D]"
          >
            <FaArrowRightFromBracket />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default UserSidebar;
