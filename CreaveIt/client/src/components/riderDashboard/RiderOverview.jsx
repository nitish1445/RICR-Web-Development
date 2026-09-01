import React, { useEffect, useState } from "react";
import {
  FaBagShopping,
  FaClock,
  FaIndianRupeeSign,
  FaMotorcycle,
  FaArrowRight,
  FaLocationDot,
  FaUtensils,
  FaCircleCheck,
  FaChartLine,
  FaUser,
  FaSpinner,
  FaMapLocationDot,
  FaRotateRight,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import api from "../../config/Api";
import toast from "react-hot-toast";

const RiderOverview = () => {
  const navigate = useNavigate();
  const [overviewData, setOverviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRiderOverview = async (showToast = false) => {
    try {
      if (showToast) {
        setRefreshing(true);
      } else {
        setIsLoading(true);
      }
      const response = await api.get("/rider/overview");
      setOverviewData(response?.data?.data || {});
      if (showToast) {
        toast.success(
          response?.data?.message || "Overview refreshed successfully",
        );
      }
    } catch (error) {
      console.error("Error fetching rider overview:", error);
      toast.error(
        error?.response?.data?.message || "Unable to fetch rider overview",
      );
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRiderOverview();
    const interval = setInterval(() => {
      fetchRiderOverview();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount = 0) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    const orderDate = new Date(date);
    const today = new Date();

    const isToday =
      orderDate.getDate() === today.getDate() &&
      orderDate.getMonth() === today.getMonth() &&
      orderDate.getFullYear() === today.getFullYear();

    const time = orderDate.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    if (isToday) {
      return `Today, ${time}`;
    }

    return orderDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusLabel = (status = "") => {
    const statusMap = {
      pending: "Pending",
      accepted: "Accepted",
      preparing: "Preparing",
      ready: "Ready for Pickup",
      partnerAssigned: "Partner Assigned",
      pickedUp: "Picked Up",
      onTheWay: "On The Way",
      delivered: "Delivered",
      rejected: "Rejected",
      damaged: "Damaged",
      cancelled: "Cancelled",
    };

    return statusMap[status] || status || "Unknown";
  };

  const getStatusColor = (status = "") => {
    if (status === "delivered") {
      return "text-[#6B8E4E]";
    }

    if (["cancelled", "rejected", "damaged"].includes(status)) {
      return "text-[#E8491D]";
    }

    return "text-[#D9952B]";
  };

  const getCustomerLocation = (order) => {
    return (
      order?.deliveryAddress?.geolocation ||
      order?.deliveryAddress?.location ||
      order?.userId?.geolocation ||
      null
    );
  };

  const handleNavigate = (order) => {
    const location = getCustomerLocation(order);
    const lat = location?.lat || location?.latitude;
    const lon = location?.lon || location?.lng || location?.longitude;

    if (lat && lon) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`,
        "_blank",
      );
    } else {
      toast.error("Customer location not available");
    }
  };

  const handleViewOrder = (order) => {
    navigate("/rider-dashboard/current-order", {
      state: {
        orderId: order?._id,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <FaSpinner className="animate-spin text-3xl text-[#E8491D]" />

          <p className="text-xs font-bold uppercase tracking-widest text-[#8A7C6A]">
            Loading Dashboard
          </p>
        </div>
      </div>
    );
  }

  const data = overviewData || {};

  const currentOrder = data?.currentOrder || null;
  const recentActivity = data?.recentOrders || [];
  const pendingOrders = data?.pendingOrders || 0;
  const completedToday = data?.completedToday || 0;
  const todayEarnings = data?.todayEarnings || 0;
  const totalEarnings = data?.totalEarnings || 0;
  const totalDelivered = data?.totalDelivered || 0;

  const stats = [
    {
      label: "Active Deliveries",
      value: pendingOrders,
      icon: FaMotorcycle,
      color: "bg-[#E8491D]",
    },
    {
      label: "Completed Today",
      value: completedToday,
      icon: FaCircleCheck,
      color: "bg-[#6B8E4E]",
    },
    {
      label: "Today's Earnings",
      value: formatCurrency(todayEarnings),
      icon: FaIndianRupeeSign,
      color: "bg-[#D9952B]",
    },
    {
      label: "Total Earnings",
      value: formatCurrency(totalEarnings),
      icon: FaChartLine,
      color: "bg-[#1F1811]",
    },
  ];

  const restaurantName =
    currentOrder?.restaurantId?.restaurantName ||
    currentOrder?.restaurantId?.fullName ||
    "Restaurant";

  const customerName = currentOrder?.userId?.fullName || "Customer";

  const restaurantAddress =
    currentOrder?.restaurantId?.address ||
    currentOrder?.restaurantId?.city ||
    "Restaurant address not available";

  const customerAddress =
    currentOrder?.deliveryAddress?.address ||
    currentOrder?.userId?.address ||
    currentOrder?.userId?.city ||
    "Delivery address not available";

  const orderValue = currentOrder?.orderValue?.total || 0;

  const hasCustomerLocation = (() => {
    if (!currentOrder) return false;
    const location = getCustomerLocation(currentOrder);
    const lat = location?.lat || location?.latitude;
    const lon = location?.lon || location?.lng || location?.longitude;
    return Boolean(lat && lon);
  })();

  return (
    <main className="pb-10">
      {/* Welcome Section */}

      <section className="bg-[#1F1811] p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8491D]">
              Rider Dashboard
            </p>

            <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <h1 className="font-[Archivo_Black] text-3xl uppercase text-[#FBF3E7] sm:text-4xl">
                  Ready to Ride!
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-[#C9BEB0]">
                  Here's a quick overview of your deliveries and earnings today.
                  Keep delivering and keep earning.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => fetchRiderOverview(true)}
            disabled={refreshing}
            className="flex shrink-0 cursor-pointer items-center gap-2 bg-[#E8491D] px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-white transition hover:bg-[#C93B16] disabled:opacity-60"
          >
            <FaRotateRight className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        <div className="mt-6 flex items-center gap-3 bg-[#FBF3E7]/5 px-4 py-3">
          <div className="flex size-10 items-center justify-center bg-[#E8491D] text-white">
            <FaMotorcycle />
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-[#8A7C6A]">
              Current Status
            </p>

            <p className="mt-1 text-xs font-bold text-[#FBF3E7]">
              {currentOrder ? "Delivery In Progress" : "Available for Delivery"}
            </p>
          </div>
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
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center text-white ${item.color}`}
                  >
                    <Icon className="text-sm" />
                  </div>

                  <span className="text-right font-[Archivo_Black] text-lg text-[#1F1811] sm:text-2xl">
                    {item.value}
                  </span>
                </div>

                <p className="mt-5 text-[9px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Content */}

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Current Delivery */}

        <div className="bg-white lg:col-span-2">
          <div className="flex items-center justify-between border-b border-[#1F1811]/10 p-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
                Active Delivery
              </p>

              <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase text-[#1F1811]">
                Current Delivery
              </h2>
            </div>

            {currentOrder && (
              <span className="bg-[#E8491D]/10 px-3 py-2 text-[9px] font-bold uppercase tracking-wider text-[#E8491D]">
                {getStatusLabel(currentOrder.status)}
              </span>
            )}
          </div>

          {currentOrder ? (
            <div className="p-5 sm:p-6">
              {/* Order Header */}

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
                    <FaBagShopping />
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                      Order Number
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#1F1811]">
                      #
                      {currentOrder?.orderNumber ||
                        currentOrder?._id?.slice(-8)}
                    </p>
                  </div>
                </div>

                <p className="text-sm font-bold text-[#1F1811]">
                  {formatCurrency(orderValue)} Order Value
                </p>
              </div>

              {/* Restaurant */}

              <div className="mt-6 border-l-2 border-[#E8491D] pl-4">
                <div className="flex items-center gap-2">
                  <FaUtensils className="text-sm text-[#E8491D]" />

                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                    Pickup From
                  </p>
                </div>

                <h3 className="mt-2 text-base font-bold text-[#1F1811]">
                  {restaurantName}
                </h3>

                <p className="mt-1 text-xs text-[#8A7C6A]">
                  {restaurantAddress}
                </p>
              </div>

              {/* Customer */}

              <div className="mt-5 border-l-2 border-[#6B8E4E] pl-4">
                <div className="flex items-center gap-2">
                  <FaUser className="text-sm text-[#6B8E4E]" />

                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                    Deliver To
                  </p>
                </div>

                <h3 className="mt-2 text-base font-bold text-[#1F1811]">
                  {customerName}
                </h3>

                <p className="mt-1 flex items-center gap-2 text-xs text-[#8A7C6A]">
                  <FaLocationDot className="shrink-0 text-[#E8491D]" />

                  <span>{customerAddress}</span>
                </p>
              </div>

              {/* Footer */}

              <div className="mt-6 flex flex-col justify-between gap-4 border-t border-dashed border-[#1F1811]/10 pt-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2 text-[10px] font-bold text-[#8A7C6A]">
                  <FaClock className="text-[#E8491D]" />
                  Assigned{" "}
                  {currentOrder?.updatedAt
                    ? formatDate(currentOrder.updatedAt)
                    : "recently"}
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  {hasCustomerLocation && (
                    <button
                      type="button"
                      onClick={() => handleNavigate(currentOrder)}
                      className="flex cursor-pointer items-center justify-center gap-2 bg-[#1F1811] px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-[#FBF3E7] transition hover:bg-[#333]"
                    >
                      <FaMapLocationDot />
                      Navigate
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleViewOrder(currentOrder)}
                    className="flex cursor-pointer items-center justify-center gap-2 bg-[#E8491D] px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-[#FBF3E7] transition hover:bg-[#C93B16]"
                  >
                    View Order
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex min-h-80 flex-col items-center justify-center p-6 text-center">
              <div className="flex size-16 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
                <FaMotorcycle className="text-2xl" />
              </div>

              <h3 className="mt-5 font-[Archivo_Black] text-lg uppercase text-[#1F1811]">
                No Active Delivery
              </h3>

              <p className="mt-2 max-w-sm text-sm text-[#8A7C6A]">
                You don't have any active delivery right now. Check available
                orders to start delivering.
              </p>

              <button
                type="button"
                onClick={() => navigate("/rider-dashboard/current-order")}
                className="mt-5 flex items-center gap-2 bg-[#E8491D] px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-[#FBF3E7]"
              >
                Check Orders
                <FaArrowRight />
              </button>
            </div>
          )}
        </div>

        {/* Performance */}

        <div className="bg-[#1F1811] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
            Performance
          </p>

          <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase text-[#FBF3E7]">
            Your Progress
          </h2>

          <div className="mt-7">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                  Total Completed
                </p>

                <p className="mt-1 font-[Archivo_Black] text-4xl text-[#FBF3E7]">
                  {totalDelivered}
                </p>
              </div>

              <FaChartLine className="text-2xl text-[#E8491D]" />
            </div>
          </div>

          <div className="mt-7 space-y-4 border-t border-white/10 pt-5">
            <PerformanceItem
              label="Active Orders"
              value={`${pendingOrders} Deliveries`}
            />

            <PerformanceItem
              label="Completed Today"
              value={`${completedToday} Deliveries`}
            />

            <PerformanceItem
              label="Today's Earnings"
              value={formatCurrency(todayEarnings)}
            />
          </div>

          <div className="mt-7 bg-[#E8491D] p-4">
            <p className="text-[9px] font-bold uppercase tracking-wider text-white/70">
              Keep Going!
            </p>

            <p className="mt-1 text-sm font-bold leading-5 text-white">
              Every successful delivery adds 15% of the order value to your
              earnings.
            </p>
          </div>
        </div>
      </section>

      {/* Recent Activity */}

      <section className="mt-6 bg-white">
        <div className="flex items-center justify-between border-b border-[#1F1811]/10 p-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
              Latest Updates
            </p>

            <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase text-[#1F1811]">
              Recent Activity
            </h2>
          </div>

          <button
            type="button"
            onClick={() => navigate("/rider-dashboard/order-history")}
            className="flex cursor-pointer items-center gap-2 text-[10px] font-bold uppercase tracking-wide text-[#E8491D]"
          >
            View History
            <FaArrowRight />
          </button>
        </div>

        {recentActivity.length > 0 ? (
          <div className="divide-y divide-dashed divide-[#1F1811]/10">
            {recentActivity.map((activity, index) => {
              const isDelivered = activity?.status === "delivered";

              const activityRestaurant =
                activity?.restaurantId?.restaurantName ||
                activity?.restaurantId?.fullName ||
                "Restaurant";

              const orderAmount = activity?.orderValue?.total || 0;

              const earning = isDelivered ? Number(orderAmount) * 0.15 : 0;

              return (
                <div
                  key={activity?._id || index}
                  className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center ${
                        isDelivered
                          ? "bg-[#6B8E4E]/10 text-[#6B8E4E]"
                          : "bg-[#E8491D]/10 text-[#E8491D]"
                      }`}
                    >
                      {isDelivered ? <FaCircleCheck /> : <FaBagShopping />}
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[#1F1811]">
                        {activityRestaurant}
                      </p>

                      <p className="mt-1 text-[10px] text-[#8A7C6A]">
                        #{activity?.orderNumber || activity?._id?.slice(-8)}
                        {" • "}
                        {formatDate(activity?.updatedAt || activity?.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-5 sm:justify-end">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wide ${getStatusColor(
                        activity?.status,
                      )}`}
                    >
                      {getStatusLabel(activity?.status)}
                    </span>

                    <span className="min-w-16 text-right text-sm font-bold text-[#1F1811]">
                      {isDelivered ? formatCurrency(earning) : "-"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center">
            <FaBagShopping className="mx-auto text-3xl text-[#C9BEB0]" />

            <p className="mt-4 text-sm font-bold text-[#1F1811]">
              No recent activity
            </p>

            <p className="mt-1 text-xs text-[#8A7C6A]">
              Your completed deliveries will appear here.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

const PerformanceItem = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
        {label}
      </p>

      <p className="text-xs font-bold text-[#FBF3E7]">{value}</p>
    </div>
  );
};

export default RiderOverview;
