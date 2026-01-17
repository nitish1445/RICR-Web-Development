import React from "react";
import {
  FiGrid,
  FiUser,
  FiShoppingBag,
  FiCreditCard,
  FiHelpCircle,
  FiMenu,
} from "react-icons/fi";

const SideBar = ({ active, setActive, isCollapsed, setIsCollapsed }) => {
  const menuItems = [
    { key: "overview", title: "OverView", icon: <FiGrid /> },
    { key: "profile", title: "Profile", icon: <FiUser /> },
    { key: "order", title: "Orders", icon: <FiShoppingBag /> },
    { key: "transaction", title: "Transactions", icon: <FiCreditCard /> },
    { key: "helpDesk", title: "Help Desk", icon: <FiHelpCircle /> },
  ];

  return (
    <>
      <div className="p-3">
        <div className="h-10 text-xl text-(--color-primary) font-bold flex gap-3 mb-1 items-center">
          {!isCollapsed && (
            <span className="overflow-hidden text-nowrap">User Dashboard</span>
          )}
          <button
            className="cursor-pointer px-3 hover:scale-125 hover:duration-200"
            onClick={() => {
              setIsCollapsed(!isCollapsed);
            }}
          >
            <FiMenu />
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
            >
              {item.icon}
              {!isCollapsed && item.title}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default SideBar;
