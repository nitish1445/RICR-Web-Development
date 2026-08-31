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

  // Order Status Styles
  const getStatusStyle = (status) => {
    const currentStatus = status?.toLowerCase();

    const statusStyles = {
      pending: "bg-[#D9952B]/15 text-[#B87514]",
      accepted: "bg-[#4C7A9F]/15 text-[#4C7A9F]",
      preparing: "bg-[#9B6B3D]/15 text-[#9B6B3D]",
      ready: "bg-[#7A5EA8]/15 text-[#7A5EA8]",
      partnerassigned: "bg-[#5B7DB1]/15 text-[#5B7DB1]",
      pickedup: "bg-[#356B8C]/15 text-[#356B8C]",
      ontheway: "bg-[#3F8A65]/15 text-[#3F8A65]",
      delivered: "bg-[#6B8E4E]/15 text-[#6B8E4E]",
      rejected: "bg-[#E8491D]/10 text-[#E8491D]",
      damaged: "bg-[#A13D3D]/10 text-[#A13D3D]",
      cancelled: "bg-[#E8491D]/10 text-[#E8491D]",
    };

    return statusStyles[currentStatus] || "bg-[#1F1811]/10 text-[#5F5143]";
  };

  // Format Order Status
  const formatStatus = (status) => {
    if (!status) return "Unknown";

    const statusMap = {
      pending: "Pending",
      accepted: "Accepted",
      preparing: "Preparing",
      ready: "Ready",
      partnerassigned: "Partner Assigned",
      pickedup: "Picked Up",
      ontheway: "On The Way",
      delivered: "Delivered",
      rejected: "Rejected",
      damaged: "Damaged",
      cancelled: "Cancelled",
    };

    return statusMap[status?.toLowerCase()] || status;
  };

  // Restaurant Image
  const getRestaurantImage = (order) => {
    return (
      order?.restaurantId?.photo?.url ||
      order?.restaurantId?.image?.url ||
      order?.restaurantId?.images?.[0]?.url ||
      order?.restaurantId?.restaurantImage?.url ||
      ""
    );
  };

  // Restaurant Name
  const getRestaurantName = (order) => {
    return (
      order?.restaurantId?.restaurantName ||
      order?.restaurantId?.fullName ||
      "Restaurant"
    );
  };

  // Food Names
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

  // Loading State
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
            Track all your food orders and delivery status.
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
            Total Orders
          </p>

          <p className="text-xl font-bold text-[#FBF3E7]">{orders.length}</p>
        </div>
      </div>

      {/* Empty State */}
      {orders.length === 0 ? (
        <div className="flex min-h-100 flex-col items-center justify-center bg-white px-6 text-center">
          <div className="flex size-16 items-center justify-center bg-[#E8491D]/10 text-[#E8491D]">
            <FaBagShopping className="text-2xl" />
          </div>

          <h2 className="mt-5 font-[Archivo_Black] text-xl uppercase text-[#1F1811]">
            No Orders Yet
          </h2>

          <p className="mt-2 max-w-sm text-sm text-[#8A7C6A]">
            Your food orders will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order, index) => {
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

                          const fallback =
                            e.currentTarget.parentElement.querySelector(
                              ".image-fallback",
                            );

                          if (fallback) {
                            fallback.style.display = "flex";
                          }
                        }}
                      />
                    ) : null}

                    <div
                      className={`image-fallback h-full w-full items-center justify-center text-[#E8491D] ${
                        restaurantImage ? "hidden" : "flex"
                      }`}
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
                        className={`w-fit px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider ${getStatusStyle(
                          order?.status,
                        )}`}
                      >
                        {formatStatus(order?.status)}
                      </span>
                    </div>

                    {/* Bottom Details */}
                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#1F1811]/10 pt-4">
                      {/* Date */}
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

                      {/* Location */}
                      {order?.restaurantId?.city && (
                        <div className="flex items-center gap-2 text-[10px] font-semibold text-[#8A7C6A]">
                          <FaLocationDot className="text-[#E8491D]" />
                          {order.restaurantId.city}
                        </div>
                      )}

                      {/* Total */}
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
