import React, { useEffect, useState } from "react";

import {
  FaUsers,
  FaStore,
  FaMotorcycle,
  FaUtensils,
  FaEnvelope,
  FaBagShopping,
  FaArrowRotateRight,
} from "react-icons/fa6";

import api from "../../config/Api";
import toast from "react-hot-toast";

const DashboardOverview = () => {
  const [overview, setOverview] = useState({
    customers: 0,
    managers: 0,
    riders: 0,
    menuItems: 0,
    messages: 0,
    activeOrders: 0,
    totalOrders: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchOverview = async (showToast = false) => {
    try {
      setLoading(true);

      const res = await api.get("/admin/overview");

      if (res.data.success) {
        setOverview(res.data.data);
      }

      if (showToast) {
        toast.success("Admin overview refreshed");
      }
    } catch (error) {
      console.error(
        "Failed to fetch admin overview:",
        error?.response?.data || error.message,
      );

      if (showToast) {
        toast.error(
          error?.response?.data?.message || "Failed to refresh admin overview",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const handleRefresh = () => {
    fetchOverview(true);
  };

  const stats = [
    {
      title: "Customers",
      value: overview.customers,
      icon: FaUsers,
    },
    {
      title: "Restaurants",
      value: overview.managers,
      icon: FaStore,
    },
    {
      title: "Delivery Partners",
      value: overview.riders,
      icon: FaMotorcycle,
    },
    {
      title: "Menu Items",
      value: overview.menuItems,
      icon: FaUtensils,
    },
    {
      title: "Messages",
      value: overview.messages,
      icon: FaEnvelope,
    },
    {
      title: "Active Orders",
      value: overview.activeOrders,
      icon: FaBagShopping,
    },
  ];

  return (
    <section>
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-dashed border-[#1F1811]/20 pb-2">
        <div>
          <h1 className="font-[Archivo_Black] text-2xl uppercase text-[#1F1811] sm:text-3xl">
            Dashboard Overview
          </h1>

          <p className="mt-2 text-sm text-[#8A7C6A]">
            Monitor customers, restaurants, delivery partners, menu items,
            orders and customer messages.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={loading}
          className="flex cursor-pointer items-center gap-2 bg-[#1F1811] px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-[#FBF3E7] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FaArrowRotateRight className={loading ? "animate-spin" : ""} />

          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white p-5 shadow-[0_12px_30px_-18px_rgba(31,24,17,0.3)]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                    {item.title}
                  </p>

                  <p className="mt-2 font-[Archivo_Black] text-4xl text-[#1F1811]">
                    {loading ? "..." : item.value}
                  </p>
                </div>

                <div className="flex size-11 items-center justify-center bg-[#E8491D]/10 text-[#E8491D]">
                  <Icon />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Control */}
      <div className="mt-6 bg-[#1F1811] p-6 text-[#FBF3E7]">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8491D]">
          Quick Control
        </p>

        <h2 className="mt-2 font-[Archivo_Black] text-2xl uppercase">
          Everything in one place
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#C9BEB0]">
          Use the sidebar to manage customers, restaurants, delivery partners,
          menu items, orders and customer messages.
        </p>
      </div>
    </section>
  );
};

export default DashboardOverview;
