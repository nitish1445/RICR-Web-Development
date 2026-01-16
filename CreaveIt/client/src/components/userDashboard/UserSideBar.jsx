import React from "react";
import {} from "react-icons/fi";
import {
  FiGrid,
  FiUser,
  FiShoppingBag,
  FiCreditCard,
  FiHelpCircle,
  FiMenu,
} from "react-icons/fi";

const SideBar = ({ active, setActive }) => {
  return (
    <div className="p-6">
      <div className="text-xl text-(--color-primary) font-bold flex justify-between items-center">
        <span>User Dashboard</span>{" "}
        <span className="cursor-pointer">
          <FiMenu />
        </span>
      </div>
      <hr />
      <div className="grid gap-3 py-6">
        <button
          className={`flex gap-6 items-center cursor-pointer text-[17px] p-3 rounded-xl ${
            active === "overview"
              ? "bg-(--color-secondary) text-white"
              : "hover:bg-gray-100"
          }`}
          onClick={() => setActive("overview")}
        >
          <FiGrid /> Overviews
        </button>
        <button
          className={`flex gap-6 items-center cursor-pointer text-[17px] p-3 rounded-xl ${
            active === "profile"
              ? "bg-(--color-secondary) text-white"
              : "hover:bg-gray-100"
          }`}
          onClick={() => setActive("profile")}
        >
          <FiUser />
          Profile
        </button>
        <button
          className={`flex gap-6 items-center cursor-pointer text-[17px] p-3 rounded-xl ${
            active === "order"
              ? "bg-(--color-secondary) text-white"
              : "hover:bg-gray-100 "
          }`}
          onClick={() => setActive("order")}
        >
          <FiShoppingBag /> Orders
        </button>
        <button
          className={`flex gap-6 items-center cursor-pointer text-[17px] p-3 rounded-xl ${
            active === "transaction"
              ? "bg-(--color-secondary) text-white"
              : "hover:bg-gray-100"
          }`}
          onClick={() => setActive("transaction")}
        >
          <FiCreditCard />
          Transations
        </button>
        <button
          className={`flex gap-6 items-center cursor-pointer text-[17px] p-3 rounded-xl ${
            active === "helpDesk"
              ? "bg-(--color-secondary) text-white"
              : "hover:bg-gray-100"
          }`}
          onClick={() => setActive("helpDesk")}
        >
          <FiHelpCircle />
          Help Desk
        </button>
      </div>
    </div>
  );
};

export default SideBar;
