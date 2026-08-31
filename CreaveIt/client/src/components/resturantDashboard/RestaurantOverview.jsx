import React, { useEffect, useState } from "react";

import {
  FaBagShopping,
  FaClock,
  FaIndianRupeeSign,
  FaStar,
  FaArrowRight,
  FaUtensils,
  FaClipboardList,
} from "react-icons/fa6";

import { Link } from "react-router-dom";
import api from "../../config/Api";
import toast from "react-hot-toast";

const RestaurantOverview = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);

      const res = await api.get("/restaurant/placedOrders");

      setOrders(res?.data?.data || []);
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Failed to fetch orders",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Top 3 recent orders
  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime(),
    )
    .slice(0, 3);

  // Active orders
  const activeOrders = orders.filter((order) =>
    ["pending", "accepted", "preparing", "ready", "pickedUp", "onTheWay"].includes(
      order.status,
    ),
  );

  // Total earnings from delivered orders
  const totalEarnings = orders
    .filter((order) => order.status === "delivered")
    .reduce(
      (total, order) => total + Number(order?.orderValue?.total || 0),
      0,
    );

  // Rating calculation
  const ratedOrders = orders.filter(
    (order) => order?.review?.rating,
  );

  const averageRating =
    ratedOrders.length > 0
      ? (
          ratedOrders.reduce(
            (total, order) =>
              total + Number(order.review.rating || 0),
            0,
          ) / ratedOrders.length
        ).toFixed(1)
      : "0.0";

  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: FaBagShopping,
      color: "bg-[#E8491D]",
    },
    {
      label: "Active Orders",
      value: activeOrders.length,
      icon: FaClock,
      color: "bg-[#D9952B]",
    },
    {
      label: "Total Earnings",
      value: `₹${totalEarnings}`,
      icon: FaIndianRupeeSign,
      color: "bg-[#6B8E4E]",
    },
    {
      label: "Rating",
      value: averageRating,
      icon: FaStar,
      color: "bg-[#1F1811]",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-[#FFF3CD] text-[#8A6200]";

      case "accepted":
        return "bg-blue-100 text-blue-700";

      case "preparing":
        return "bg-orange-100 text-orange-700";

      case "ready":
        return "bg-green-100 text-green-700";

      case "pickedUp":
        return "bg-purple-100 text-purple-700";

      case "onTheWay":
        return "bg-indigo-100 text-indigo-700";

      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
      case "rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <main>
      {/* Welcome Section */}
      <section className="bg-[#1F1811] p-6 sm:p-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8491D]">
          Restaurant Dashboard
        </p>

        <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-[Archivo_Black] text-3xl uppercase text-[#FBF3E7] sm:text-4xl">
              Restaurant Overview
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#C9BEB0]">
              Manage your restaurant orders, menu, earnings and performance from
              one place.
            </p>
          </div>

          <Link
            to="/restaurant-dashboard/orders"
            className="inline-flex shrink-0 items-center justify-center gap-2 bg-[#E8491D] px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#FBF3E7] transition-colors hover:bg-[#C93B16]"
          >
            View Orders
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
                    {isLoading ? "..." : item.value}
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
                Order Management
              </p>

              <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase text-[#1F1811]">
                Recent Orders
              </h2>
            </div>

            <Link
              to="/restaurant-dashboard/orders"
              className="flex items-center gap-2 text-xs font-bold text-[#E8491D] transition hover:text-[#C93B16]"
            >
              View All
              <FaArrowRight />
            </Link>
          </div>

          {isLoading ? (
            <div className="flex min-h-72 items-center justify-center">
              <p className="text-sm font-medium text-[#8A7C6A]">
                Loading orders...
              </p>
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="flex min-h-72 flex-col items-center justify-center px-5 text-center">
              <div className="flex size-14 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
                <FaClipboardList className="text-xl" />
              </div>

              <h3 className="mt-4 font-[Archivo_Black] text-lg uppercase text-[#1F1811]">
                No Recent Orders
              </h3>

              <p className="mt-2 text-sm text-[#8A7C6A]">
                New customer orders will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#1F1811]/10">
              {recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-bold text-[#1F1811]">
                        {order.orderNumber ||
                          `#${order._id?.slice(-8).toUpperCase()}`}
                      </h3>

                      <span
                        className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${getStatusStyle(
                          order.status,
                        )}`}
                      >
                        {order.status || "pending"}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-[#8A7C6A]">
                      {order.userId?.fullName || "Customer"} •{" "}
                      {order.items?.length || 0} Item
                      {order.items?.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-5 sm:block sm:text-right">
                    <div>
                      <p className="font-[Archivo_Black] text-lg text-[#1F1811]">
                        ₹{order?.orderValue?.total || 0}
                      </p>

                      <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-[#8A7C6A]">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )
                          : "N/A"}
                      </p>
                    </div>

                    <Link
                      to="/restaurant-dashboard/orders"
                      className="text-[#E8491D] transition hover:text-[#C93B16] sm:hidden"
                    >
                      <FaArrowRight />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
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
                to="/restaurant-dashboard/orders"
                className="flex items-center justify-between bg-[#FBF3E7] px-4 py-3 text-sm font-bold text-[#1F1811] transition hover:bg-[#E8491D] hover:text-[#FBF3E7]"
              >
                Manage Orders
                <FaArrowRight className="text-xs" />
              </Link>

              <Link
                to="/restaurant-dashboard/menu"
                className="flex items-center justify-between bg-[#FBF3E7] px-4 py-3 text-sm font-bold text-[#1F1811] transition hover:bg-[#1F1811] hover:text-[#FBF3E7]"
              >
                Manage Menu
                <FaArrowRight className="text-xs" />
              </Link>

              <Link
                to="/restaurant-dashboard/earnings"
                className="flex items-center justify-between bg-[#FBF3E7] px-4 py-3 text-sm font-bold text-[#1F1811] transition hover:bg-[#1F1811] hover:text-[#FBF3E7]"
              >
                View Earnings
                <FaArrowRight className="text-xs" />
              </Link>

              <Link
                to="/restaurant-dashboard/profile"
                className="flex items-center justify-between bg-[#FBF3E7] px-4 py-3 text-sm font-bold text-[#1F1811] transition hover:bg-[#1F1811] hover:text-[#FBF3E7]"
              >
                Restaurant Profile
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>

          {/* Menu Summary */}
          <div className="bg-[#E8491D] p-5 text-[#FBF3E7]">
            <div className="flex size-10 items-center justify-center bg-[#1F1811]">
              <FaUtensils />
            </div>

            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
              Menu Management
            </p>

            <h3 className="mt-2 font-[Archivo_Black] text-2xl uppercase">
              Manage Your Menu
            </h3>

            <p className="mt-2 text-sm leading-6 text-white/80">
              Add new dishes, update prices and manage item availability.
            </p>

            <Link
              to="/restaurant-dashboard/menu"
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold underline underline-offset-4"
            >
              Manage Menu
              <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RestaurantOverview;