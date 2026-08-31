import React, { useEffect, useState } from "react";
import {
  FaIndianRupeeSign,
  FaMoneyBillTrendUp,
  FaBagShopping,
  FaCalendarDays,
  FaRotateRight,
  FaChartLine,
} from "react-icons/fa6";
import toast from "react-hot-toast";
import api from "../../config/Api";

const RestaurantEarnings = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async (showToast = false) => {
    try {
      if (showToast) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      // Change endpoint according to your backend
      const res = await api.get("/restaurant/orders");

      setOrders(res?.data?.data || []);

      if (showToast) {
        toast.success("Earnings updated");
      }
    } catch (error) {
      console.log("Fetch earnings error:", error);
      toast.error(error?.response?.data?.message || "Unable to fetch earnings");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Only delivered orders should count as earnings
  const completedOrders = orders.filter(
    (order) => order?.status?.toLowerCase() === "delivered",
  );

  const totalEarnings = completedOrders.reduce(
    (total, order) => total + Number(order?.orderValue?.total || 0),
    0,
  );

  const totalOrders = completedOrders.length;

  // Today's earnings
  const today = new Date().toDateString();

  const todayOrders = completedOrders.filter(
    (order) => new Date(order?.createdAt).toDateString() === today,
  );

  const todayEarnings = todayOrders.reduce(
    (total, order) => total + Number(order?.orderValue?.total || 0),
    0,
  );

  // This month's earnings
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthOrders = completedOrders.filter((order) => {
    const date = new Date(order?.createdAt);

    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  });

  const monthEarnings = monthOrders.reduce(
    (total, order) => total + Number(order?.orderValue?.total || 0),
    0,
  );

  const stats = [
    {
      title: "Total Earnings",
      value: `₹${totalEarnings.toLocaleString("en-IN")}`,
      icon: <FaIndianRupeeSign />,
      description: "From delivered orders",
      dark: true,
    },
    {
      title: "Today's Earnings",
      value: `₹${todayEarnings.toLocaleString("en-IN")}`,
      icon: <FaCalendarDays />,
      description: `${todayOrders.length} orders today`,
    },
    {
      title: "Monthly Earnings",
      value: `₹${monthEarnings.toLocaleString("en-IN")}`,
      icon: <FaMoneyBillTrendUp />,
      description: `${monthOrders.length} orders this month`,
    },
    {
      title: "Completed Orders",
      value: totalOrders,
      icon: <FaBagShopping />,
      description: "Successfully delivered",
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center">
          <span className="size-8 animate-spin rounded-full border-2 border-[#E8491D] border-t-transparent" />

          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[#8A7C6A]">
            Loading Earnings...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#FBF3E7]">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8491D]">
            Financial Overview
          </p>

          <h1 className="mt-1 font-[Archivo_Black] text-2xl uppercase text-[#1F1811] sm:text-3xl">
            Earnings
          </h1>

          <p className="mt-2 text-sm text-[#8A7C6A]">
            Track your restaurant revenue and completed order earnings.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchOrders(true)}
          disabled={refreshing}
          className="flex cursor-pointer items-center justify-center gap-2 bg-[#1F1811] px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-[#FBF3E7] transition hover:bg-[#E8491D] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FaRotateRight className={refreshing ? "animate-spin" : ""} />

          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={stat.dark ? "bg-[#1F1811] p-5" : "bg-white p-5"}
          >
            <div className="flex items-start justify-between">
              <div>
                <p
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    stat.dark ? "text-[#8A7C6A]" : "text-[#8A7C6A]"
                  }`}
                >
                  {stat.title}
                </p>

                <h2
                  className={`mt-3 text-2xl font-bold ${
                    stat.dark ? "text-[#FBF3E7]" : "text-[#1F1811]"
                  }`}
                >
                  {stat.value}
                </h2>
              </div>

              <div
                className={
                  stat.dark
                    ? "flex size-10 items-center justify-center bg-[#E8491D] text-[#FBF3E7]"
                    : "flex size-10 items-center justify-center bg-[#E8491D]/10 text-[#E8491D]"
                }
              >
                {stat.icon}
              </div>
            </div>

            <p className="mt-4 text-xs text-[#8A7C6A]">{stat.description}</p>
          </div>
        ))}
      </div>

      {/* Earnings Summary */}
      <div className="mt-6 bg-white">
        <div className="flex items-center justify-between border-b border-[#1F1811]/10 p-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
              Revenue Activity
            </p>

            <h2 className="mt-1 text-lg font-bold text-[#1F1811]">
              Recent Earnings
            </h2>
          </div>

          <div className="flex size-10 items-center justify-center bg-[#1F1811] text-[#FBF3E7]">
            <FaChartLine />
          </div>
        </div>

        {completedOrders.length === 0 ? (
          <div className="flex min-h-75 flex-col items-center justify-center px-6 text-center">
            <div className="flex size-16 items-center justify-center bg-[#E8491D]/10 text-[#E8491D]">
              <FaIndianRupeeSign className="text-2xl" />
            </div>

            <h3 className="mt-5 font-[Archivo_Black] text-lg uppercase text-[#1F1811]">
              No Earnings Yet
            </h3>

            <p className="mt-2 max-w-sm text-sm text-[#8A7C6A]">
              Your earnings will appear here once customer orders are
              successfully delivered.
            </p>
          </div>
        ) : (
          <div>
            {completedOrders.slice(0, 8).map((order, index) => (
              <div
                key={order?._id || index}
                className="flex flex-col justify-between gap-4 border-b border-[#1F1811]/10 p-5 transition hover:bg-[#FBF3E7] sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center bg-[#E8491D]/10 text-[#E8491D]">
                    <FaBagShopping />
                  </div>

                  <div>
                    <p className="font-bold text-[#1F1811]">
                      Order #
                      {order?.orderNumber ||
                        order?._id?.slice(-8)?.toUpperCase()}
                    </p>

                    <p className="mt-1 text-xs text-[#8A7C6A]">
                      {order?.userId?.fullName || "Customer"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-8 sm:justify-end">
                  <div className="text-left sm:text-right">
                    <p className="text-sm font-bold text-[#6B8E4E]">
                      + ₹
                      {Number(order?.orderValue?.total || 0).toLocaleString(
                        "en-IN",
                      )}
                    </p>

                    <p className="mt-1 text-[10px] font-medium text-[#8A7C6A]">
                      {order?.createdAt
                        ? new Date(order.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )
                        : "Date unavailable"}
                    </p>
                  </div>

                  <span className="bg-[#6B8E4E]/15 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-[#6B8E4E]">
                    Delivered
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-6 bg-[#1F1811] p-5">
        <div className="flex items-start gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center bg-[#E8491D] text-[#FBF3E7]">
            <FaMoneyBillTrendUp />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#FBF3E7]">
              Earnings Calculation
            </h3>

            <p className="mt-1 text-xs leading-relaxed text-[#8A7C6A]">
              Earnings are calculated from successfully delivered orders.
              Cancelled, rejected and pending orders are not included in your
              total revenue.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantEarnings;
