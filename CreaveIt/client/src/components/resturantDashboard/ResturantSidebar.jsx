import React from "react";
import {
  FaUtensils,
  FaClipboardList,
  FaDollarSign,
  FaBoxes,
  FaUsers,
  FaUser
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSignOutAlt } from "react-icons/fa";
import api from "../../config/Api";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SideBar = ({ active, setActive, isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();
  const { setUser, setIsLogin } = useAuth();
  const menuItems = [
    { key: "manager", title: "Manager", icon: <FaUser /> },
    { key: "menu", title: "Menu", icon: <FaUtensils /> },
    { key: "order", title: "Orders", icon: <FaClipboardList /> },
    { key: "sales", title: "Total Sale", icon: <FaDollarSign /> },
    { key: "stock", title: "Stock", icon: <FaBoxes /> },
    { key: "customer", title: "Customer", icon: <FaUsers /> },
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
          <div className="h-10 text-md text-(--color-primary) font-bold flex gap-1 items-center">
            {!isCollapsed && (
              <span className="overflow-hidden text-nowrap">
                Resturant Dashboard
              </span>
            )}
            <button
              className="cursor-pointer px-3 hover:scale-125 hover:duration-200"
              onClick={() => {
                setIsCollapsed(!isCollapsed);
              }}
            >
              <GiHamburgerMenu />
            </button>
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
