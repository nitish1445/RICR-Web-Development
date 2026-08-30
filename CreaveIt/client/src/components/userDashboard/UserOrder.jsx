import React, { useEffect, useState } from "react";
import {
  FaBagShopping,
  FaClock,
  FaLocationDot,
  FaRotateRight,
  FaUtensils,
} from "react-icons/fa6";
import toast from "react-hot-toast";
import api from "../../config/Api";

const UserOrders = () => {
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

      const res = await api.get("/user/placedorders");
      setOrders(res?.data?.data || []);
      if (showToast) {
        toast.success("Orders fetched successfully");
      }
    } catch (error) {
      console.log("Fetch orders error:", error);
      toast.error(error?.response?.data?.message || "Unable to fetch orders");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Only show Delivered, Cancelled and Rejected orders
  const completedOrders = orders.filter((order) => {
    const status = order?.status?.toLowerCase();
    return ["delivered", "cancelled", "rejected"].includes(status);
  });

  const getStatusStyle = (status) => {
    const currentStatus = status?.toLowerCase();
    if (currentStatus === "delivered") {
      return "bg-[#6B8E4E]/15 text-[#6B8E4E]";
    }

    if (currentStatus === "cancelled" || currentStatus === "rejected") {
      return "bg-[#E8491D]/10 text-[#E8491D]";
    }

    return "bg-[#1F1811]/10 text-[#5F5143]";
  };

  const formatStatus = (status) => {
    if (!status) return "Unknown";

    const statusMap = {
      delivered: "Delivered",
      cancelled: "Cancelled",
      rejected: "Rejected",
    };

    return statusMap[status?.toLowerCase()] || status;
  };

  const getRestaurantImage = (order) => {
    return (
      order?.restaurantId?.photo?.url ||
      order?.restaurantId?.image?.url ||
      order?.restaurantId?.images?.[0]?.url ||
      ""
    );
  };

  const getRestaurantName = (order) => {
    return (
      order?.restaurantId?.restaurantName ||
      order?.restaurantId?.fullName ||
      "Restaurant"
    );
  };

  const getFoodName = (order) => {
    if (order?.items?.length > 0) {
      return order.items
        .map(
          (item) =>
            item?.foodName ||
            item?.itemName ||
            item?.name ||
            item?.title ||
            "Food Item",
        )
        .join(", ");
    }

    return "Food details unavailable";
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center">
          <span className="size-8 animate-spin rounded-full border-2 border-[#E8491D] border-t-transparent" />

          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[#8A7C6A]">
            Loading Orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8491D]">
            Order History
          </p>

          <h1 className="mt-1 font-[Archivo_Black] text-2xl uppercase text-[#1F1811] sm:text-3xl">
            My Orders
          </h1>

          <p className="mt-2 text-sm text-[#8A7C6A]">
            View your delivered, cancelled and rejected orders.
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

      {/* Orders Count */}
      <div className="mb-5 flex items-center gap-3 bg-[#1F1811] px-5 py-4">
        <div className="flex size-10 items-center justify-center bg-[#E8491D] text-[#FBF3E7]">
          <FaBagShopping />
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
            Completed Orders
          </p>

          <p className="text-xl font-bold text-[#FBF3E7]">
            {completedOrders.length}
          </p>
        </div>
      </div>

      {/* Empty State */}
      {completedOrders.length === 0 ? (
        <div className="flex min-h-100 flex-col items-center justify-center bg-white px-6 text-center">
          <div className="flex size-16 items-center justify-center bg-[#E8491D]/10 text-[#E8491D]">
            <FaBagShopping className="text-2xl" />
          </div>

          <h2 className="mt-5 font-[Archivo_Black] text-xl uppercase text-[#1F1811]">
            No Orders Yet
          </h2>

          <p className="mt-2 max-w-sm text-sm text-[#8A7C6A]">
            Your delivered, cancelled or rejected orders will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {completedOrders.map((order, index) => {
            const restaurantImage = getRestaurantImage(order);
            const restaurantName = getRestaurantName(order);
            const foodName = getFoodName(order);

            return (
              <div
                key={order?._id || index}
                className="group bg-white transition-shadow hover:shadow-[0_12px_30px_rgba(31,24,17,0.08)]"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Restaurant Image */}
                  <div className="h-40 w-full shrink-0 overflow-hidden bg-[#FBF3E7] sm:h-auto sm:w-40">
                    {restaurantImage ? (
                      <img
                        src={restaurantImage}
                        alt={restaurantName}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.parentElement.querySelector(
                            ".image-fallback",
                          ).style.display = "flex";
                        }}
                      />
                    ) : null}

                    <div
                      className={`image-fallback h-full w-full items-center justify-center text-[#E8491D] ${restaurantImage ? "hidden" : "flex"}`}
                    >
                      <FaUtensils className="text-3xl" />
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="size-2 rounded-full bg-[#E8491D]" />

                          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                            Order #{order?.orderNumber || "UNKNOWN"}
                          </p>
                        </div>

                        <h2 className="mt-2 text-lg font-bold text-[#1F1811]">
                          {restaurantName}
                        </h2>

                        <div className="mt-2 flex items-center gap-2 text-sm text-[#5F5143]">
                          <FaUtensils className="shrink-0 text-xs text-[#E8491D]" />

                          <p className="line-clamp-1">{foodName}</p>
                        </div>
                      </div>

                      {/* Status */}
                      <span
                        className={`w-fit px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider ${getStatusStyle(order?.status)}`}
                      >
                        {formatStatus(order?.status)}
                      </span>
                    </div>

                    {/* Bottom Details */}
                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#1F1811]/10 pt-4">
                      <div className="flex items-center gap-2 text-[10px] font-semibold text-[#8A7C6A]">
                        <FaClock className="text-[#E8491D]" />

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
                      </div>

                      {order?.restaurantId?.city && (
                        <div className="flex items-center gap-2 text-[10px] font-semibold text-[#8A7C6A]">
                          <FaLocationDot className="text-[#E8491D]" />
                          {order.restaurantId.city}
                        </div>
                      )}

                      <div className="ml-auto text-sm font-bold text-[#1F1811]">
                        ₹{order?.orderValue?.total || 0}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default UserOrders;
