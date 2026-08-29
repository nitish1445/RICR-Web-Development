import React from "react";

import {
  FaBagShopping,
  FaClock,
  FaCheck,
  FaHeart,
  FaArrowRight,
  FaLocationDot,
  FaUtensils,
} from "react-icons/fa6";

import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const UserOverview = () => {
  const { user } = useAuth();

  const getFirstName = () => {
    return user?.fullName?.split(" ")[0] || "Customer";
  };

  // Dummy data for now
  const stats = [
    {
      label: "Total Orders",
      value: "12",
      icon: FaBagShopping,
      color: "bg-[#E8491D]",
    },
    {
      label: "Delivered",
      value: "9",
      icon: FaCheck,
      color: "bg-[#6B8E4E]",
    },
    {
      label: "Pending",
      value: "2",
      icon: FaClock,
      color: "bg-[#D9952B]",
    },
    {
      label: "Favorites",
      value: "6",
      icon: FaHeart,
      color: "bg-[#1F1811]",
    },
  ];

  const recentOrders = [
    {
      id: "#CRV-1024",
      restaurant: "Burger House",
      items: "2 Items",
      amount: "₹420",
      status: "Delivered",
      date: "Today",
    },
    {
      id: "#CRV-1023",
      restaurant: "Pizza Corner",
      items: "3 Items",
      amount: "₹680",
      status: "On The Way",
      date: "Yesterday",
    },
    {
      id: "#CRV-1022",
      restaurant: "Spice Kitchen",
      items: "1 Item",
      amount: "₹250",
      status: "Delivered",
      date: "Aug 20, 2026",
    },
  ];

  return (
    <main>
      {/* Welcome Section */}
      <section className="bg-[#1F1811] p-6 sm:p-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8491D]">
          Customer Dashboard
        </p>

        <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-[Archivo_Black] text-3xl uppercase text-[#FBF3E7] sm:text-4xl">
              Hello, {getFirstName()}!
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#C9BEB0]">
              Welcome back to CraveIt. Track your orders, manage your account
              and discover something delicious.
            </p>
          </div>

          <Link
            to="/restaurants"
            className="inline-flex shrink-0 items-center justify-center gap-2 bg-[#E8491D] px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#FBF3E7] transition-colors hover:bg-[#C93B16]"
          >
            Explore Food
            <FaArrowRight className="text-[10px]" />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-6">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="bg-white p-5 shadow-[0_10px_25px_-20px_rgba(31,24,17,0.4)]"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex size-10 items-center justify-center text-white ${item.color}`}
                  >
                    <Icon className="text-sm" />
                  </div>

                  <span className="font-[Archivo_Black] text-2xl text-[#1F1811]">
                    {item.value}
                  </span>
                </div>

                <p className="mt-5 text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Content */}
      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <div className="bg-white lg:col-span-2">
          <div className="flex items-center justify-between border-b border-[#1F1811]/10 p-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
                Order History
              </p>

              <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase text-[#1F1811]">
                Recent Orders
              </h2>
            </div>

            <Link
              to="/user-dashboard/orders"
              className="flex items-center gap-2 text-xs font-bold text-[#E8491D] transition hover:text-[#C93B16]"
            >
              View All
              <FaArrowRight />
            </Link>
          </div>

          <div>
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col gap-4 border-b border-dashed border-[#1F1811]/10 p-5 last:border-none sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
                    <FaUtensils />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#1F1811]">
                      {order.restaurant}
                    </p>

                    <p className="mt-1 text-xs text-[#8A7C6A]">
                      {order.id} • {order.items}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-5 sm:block sm:text-right">
                  <div>
                    <p className="text-sm font-bold text-[#1F1811]">
                      {order.amount}
                    </p>

                    <p className="mt-1 text-[10px] text-[#8A7C6A]">
                      {order.date}
                    </p>
                  </div>

                  <span
                    className={`text-[10px] font-bold uppercase tracking-wide ${
                      order.status === "Delivered"
                        ? "text-[#6B8E4E]"
                        : "text-[#D9952B]"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
              Quick Access
            </p>

            <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase text-[#1F1811]">
              Quick Actions
            </h2>

            <div className="mt-5 space-y-2">
              <Link
                to="/restaurants"
                className="flex items-center justify-between bg-[#FBF3E7] px-4 py-3 text-sm font-bold text-[#1F1811] transition hover:bg-[#E8491D] hover:text-[#FBF3E7]"
              >
                Order Food
                <FaArrowRight className="text-xs" />
              </Link>

              <Link
                to="/user-dashboard/orders"
                className="flex items-center justify-between bg-[#FBF3E7] px-4 py-3 text-sm font-bold text-[#1F1811] transition hover:bg-[#1F1811] hover:text-[#FBF3E7]"
              >
                Track Orders
                <FaArrowRight className="text-xs" />
              </Link>

              <Link
                to="/user-dashboard/profile"
                className="flex items-center justify-between bg-[#FBF3E7] px-4 py-3 text-sm font-bold text-[#1F1811] transition hover:bg-[#1F1811] hover:text-[#FBF3E7]"
              >
                Manage Address
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>

          {/* Address Summary */}
          <div className="bg-[#E8491D] p-5 text-[#FBF3E7]">
            <div className="flex size-10 items-center justify-center bg-[#1F1811]">
              <FaLocationDot />
            </div>

            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
              Delivery Location
            </p>

            <p className="mt-2 text-sm font-bold leading-6">
              {user?.address
                ? `${user.address}, ${user.city || ""} ${user.pin || ""}`
                : "No delivery address added"}
            </p>

            <Link
              to="/user-dashboard/profile"
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold underline underline-offset-4"
            >
              Manage Address
              <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default UserOverview;
