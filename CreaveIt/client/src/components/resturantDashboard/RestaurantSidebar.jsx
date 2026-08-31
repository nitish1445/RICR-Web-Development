import React from "react";
import {
  FaChartPie,
  FaBoxOpen,
  FaUtensils,
  FaIndianRupeeSign,
  FaUser,
  FaCircleQuestion,
  FaRightFromBracket,
  FaXmark,
} from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import Logo from "../../assets/craveIt-logo.png";

const RestaurantSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      name: "Overview",
      icon: FaChartPie,
      path: "/restaurant-dashboard",
      end: true,
    },
    {
      name: "Orders",
      icon: FaBoxOpen,
      path: "/restaurant-dashboard/orders",
    },
    {
      name: "Menu",
      icon: FaUtensils,
      path: "/restaurant-dashboard/menu",
    },
    {
      name: "Earnings",
      icon: FaIndianRupeeSign,
      path: "/restaurant-dashboard/earnings",
    },
  ];

  const bottomItems = [
    {
      name: "Profile",
      icon: FaUser,
      path: "/restaurant-dashboard/profile",
    },
    {
      name: "Help & Support",
      icon: FaCircleQuestion,
      path: "/restaurant-dashboard/help",
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Unable to logout");
    }
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
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#1F1811] transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between px-6">
          <NavLink to="/" onClick={onClose} className="flex items-center gap-2">
            <img src={Logo} alt="CraveIt" className="h-9 w-9 object-contain" />

            <span className="font-[Archivo_Black] text-lg tracking-tight text-[#FBF3E7]">
              CRAVE<span className="text-[#E8491D]">IT</span>
            </span>
          </NavLink>

          <button onClick={onClose} className="text-[#FBF3E7] lg:hidden">
            <FaXmark className="text-xl" />
          </button>
        </div>

        {/* Restaurant Info */}
        <div className="mx-4 bg-[#FBF3E7]/5 p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden bg-[#E8491D]">
              {user?.photo?.url ? (
                <img
                  src={user.photo.url}
                  alt={user?.restaurantName || "Restaurant"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <FaUtensils className="text-sm text-[#FBF3E7]" />
              )}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[#FBF3E7]">
                {user?.restaurantName || "My Restaurant"}
              </p>

              <p className="mt-1 truncate text-[10px] text-[#C9BEB0]">
                {user?.city || "Restaurant Partner"}
              </p>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="mt-6 flex-1 px-3">
          <p className="px-3 text-[9px] font-bold uppercase tracking-[0.2em] text-[#8A7C6A]">
            Management
          </p>

          <div className="mt-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-[#E8491D] text-[#FBF3E7]"
                        : "text-[#C9BEB0] hover:bg-[#FBF3E7]/5 hover:text-[#FBF3E7]"
                    }`
                  }
                >
                  <Icon className="text-sm" />
                  {item.name}
                </NavLink>
              );
            })}
          </div>

          <p className="mt-8 px-3 text-[9px] font-bold uppercase tracking-[0.2em] text-[#8A7C6A]">
            Account
          </p>

          <div className="mt-3 space-y-1">
            {bottomItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-[#E8491D] text-[#FBF3E7]"
                        : "text-[#C9BEB0] hover:bg-[#FBF3E7]/5 hover:text-[#FBF3E7]"
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

        {/* Logout */}
        <div className="p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full cursor-pointer items-center gap-3 bg-[#E8491D]/10 px-4 py-3 text-sm font-bold text-[#E8491D] transition hover:bg-[#E8491D] hover:text-[#FBF3E7]"
          >
            <FaRightFromBracket />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default RestaurantSidebar;
