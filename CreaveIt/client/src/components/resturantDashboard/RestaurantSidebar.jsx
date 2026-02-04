import React from "react";
import {
  FaUtensils,
  FaClipboardList,
  FaUser,
  FaSignOutAlt,
  FaWallet,
} from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { IoMdHelpCircle } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import api from "../../config/Api";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SideBar = ({ active, setActive, isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();
  const { setUser, setIsLogin } = useAuth();
  const menuItems = [
    { key: "overview", title: "Overview", icon: <IoGrid /> },
    { key: "menu", title: "Menu", icon: <FaUtensils /> },
    { key: "order", title: "Orders", icon: <FaClipboardList /> },
    { key: "profile", title: "Profile", icon: <FaUser /> },
    { key: "earnings", title: "Earnings", icon: <FaWallet /> },
    { key: "help", title: "Help", icon: <IoMdHelpCircle /> },
  ];
  const handleLogout = async () => {
    try {
      const res = await api.get("/auth/logout");
      toast.success(res.data.message);
      setUser("");
      setIsLogin(false);
      sessionStorage.removeItem("CraveItUser");
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    }
  };
  return (
    <>
      <div className="p-3 flex flex-col gap-15">
        <div>
          <div className="h-10 text-md text-(--color-primary) font-bold flex justify-between items-center">
            <button
              className="cursor-pointer ps-3 hover:scale-125 hover:duration-200"
              onClick={() => {
                setIsCollapsed(!isCollapsed);
              }}
            >
              <GiHamburgerMenu />
            </button>
            {!isCollapsed && (
              <span className="overflow-hidden text-nowrap">
                Restaurant Dashboard
              </span>
            )}
          </div>

          <hr />

          <div className="grid gap-3 py-6">
            {menuItems.map((item, idx) => (
              <button
                className={`flex gap-6 items-center cursor-pointer text-nowrap h-12 px-3 rounded-xl text-base ${
                  active === item.key
                    ? "bg-(--color-secondary) text-white"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setActive(item.key)}
                key={idx}
              >
                {item.icon}
                {!isCollapsed && item.title}
              </button>
            ))}
          </div>
        </div>
        <div>
          <button
            className={`flex gap-6 items-center cursor-pointer text-nowrap h-12 px-3 rounded-xl text-base text-red-700 
                  `}
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            {!isCollapsed && "Logout"}
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
