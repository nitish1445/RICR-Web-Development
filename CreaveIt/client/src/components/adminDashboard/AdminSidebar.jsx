import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  FaChartPie,
  FaUsers,
  FaStore,
  FaMotorcycle,
  FaEnvelope,
  FaUserShield,
  FaArrowRightFromBracket,
  FaXmark,
} from "react-icons/fa6";
import { IoFastFood } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";

const menuItems = [
  {
    label: "Overview",
    path: "/admin-dashboard",
    icon: FaChartPie,
    end: true,
  },
  {
    label: "Orders",
    path: "/admin-dashboard/orders",
    icon: IoFastFood,
  },
  {
    label: "Customers",
    path: "/admin-dashboard/customers",
    icon: FaUsers,
  },
  {
    label: "Managers",
    path: "/admin-dashboard/managers",
    icon: FaStore,
  },
  {
    label: "Riders",
    path: "/admin-dashboard/riders",
    icon: FaMotorcycle,
  },,
  {
    label: "Contacts",
    path: "/admin-dashboard/messages",
    icon: FaEnvelope,
  },
  {
    label: "Admin Profile",
    path: "/admin-dashboard/profile",
    icon: FaUserShield,
  },
];

const AdminSidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    navigate("/", {
      replace: true,
    });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#1F1811] text-[#FBF3E7] transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex items-start justify-between border-b border-[#FBF3E7]/10 p-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8491D]">
              CraveIt
            </p>

            <h1 className="mt-1 font-[Archivo_Black] text-xl uppercase">
              Admin Panel
            </h1>
          </div>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-[#C9BEB0] transition hover:text-[#FBF3E7] lg:hidden"
          >
            <FaXmark />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 text-sm font-bold transition ${
                    isActive
                      ? "bg-[#E8491D] text-[#FBF3E7]"
                      : "text-[#C9BEB0] hover:bg-white/5 hover:text-[#FBF3E7]"
                  }`
                }
              >
                <Icon className="text-sm" />

                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-[#FBF3E7]/10 p-3">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-sm font-bold text-[#C9BEB0] transition hover:bg-white/5 hover:text-[#E8491D]"
          >
            <FaArrowRightFromBracket />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
