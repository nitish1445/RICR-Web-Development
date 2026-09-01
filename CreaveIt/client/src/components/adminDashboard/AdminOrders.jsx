import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  FaBagShopping,
  FaCheck,
  FaClock,
  FaLocationDot,
  FaMoneyBillWave,
  FaReceipt,
  FaXmark,
  FaArrowRotateRight,
  FaMotorcycle,
  FaUtensils,
  FaBoxOpen,
  FaCircleCheck,
  FaTriangleExclamation,
  FaEye,
  FaIndianRupeeSign,
} from "react-icons/fa6";
import api from "../../config/Api";
import ViewOrderModal from "./modal/ViewOrderModal";
import { useAuth } from "../../context/AuthContext";

const Orders = () => {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState("all");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [payingOrderId, setPayingOrderId] = useState(null);

  const fetchOrders = async (showToast = false) => {
    try {
      setLoading(true);
      const res = await api.get("/admin/orders");
      if (res.data?.success) {
        setOrders(res.data?.data || []);
        if (showToast) {
          toast.success("Orders refreshed successfully");
        }
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleRefresh = () => {
    fetchOrders(true);
  };

  const handlePayment = async (orderId) => {
    if (user.email === "admin@gmail.com") {
      return toast.error("Dummy Admin cannot perfom this action.");
    }

    try {
      setPayingOrderId(orderId);
      const res = await api.put(`/admin/payment/${orderId}`);
      if (res.data?.success) {
        toast.success(res.data?.message || "Payment marked as paid");
        fetchOrders();
      } else {
        toast.error(res.data?.message || "Failed to update payment");
      }
    } catch (error) {
      console.error("Payment update error:", error);
      toast.error(error?.response?.data?.message || "Failed to update payment");
    } finally {
      setPayingOrderId(null);
    }
  };

  const getOrderCategory = (status) => {
    const activeStatuses = [
      "pending",
      "accepted",
      "preparing",
      "ready",
      "pickedUp",
      "onTheWay",
    ];

    const cancelledStatuses = ["cancelled", "rejected", "damaged"];
    if (status === "delivered") return "delivered";
    if (cancelledStatuses.includes(status)) {
      return "cancelled";
    }

    if (activeStatuses.includes(status)) {
      return "active";
    }
    return "active";
  };

  const filters = [
    {
      id: "all",
      label: "All Orders",
    },
    {
      id: "active",
      label: "Active",
    },
    {
      id: "delivered",
      label: "Delivered",
    },
    {
      id: "cancelled",
      label: "Cancelled",
    },
  ];

  const filteredOrders = useMemo(() => {
    if (activeFilter === "all") return orders;
    return orders.filter(
      (order) => getOrderCategory(order.status) === activeFilter,
    );
  }, [activeFilter, orders]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return {
          label: "Pending",
          icon: FaClock,
          className: "bg-[#E8491D]/10 text-[#E8491D]",
        };

      case "accepted":
        return {
          label: "Accepted",
          icon: FaCheck,
          className: "bg-blue-100 text-blue-600",
        };

      case "preparing":
        return {
          label: "Preparing",
          icon: FaUtensils,
          className: "bg-orange-100 text-orange-600",
        };

      case "ready":
        return {
          label: "Ready",
          icon: FaBoxOpen,
          className: "bg-yellow-100 text-yellow-700",
        };

      case "pickedUp":
        return {
          label: "Picked Up",
          icon: FaMotorcycle,
          className: "bg-purple-100 text-purple-600",
        };

      case "onTheWay":
        return {
          label: "On The Way",
          icon: FaLocationDot,
          className: "bg-cyan-100 text-cyan-700",
        };

      case "delivered":
        return {
          label: "Delivered",
          icon: FaCircleCheck,
          className: "bg-[#6B8E4E]/15 text-[#6B8E4E]",
        };

      case "cancelled":
        return {
          label: "Cancelled",
          icon: FaXmark,
          className: "bg-red-100 text-red-600",
        };

      case "rejected":
        return {
          label: "Rejected",
          icon: FaXmark,
          className: "bg-red-100 text-red-600",
        };

      case "damaged":
        return {
          label: "Damaged",
          icon: FaTriangleExclamation,
          className: "bg-red-100 text-red-600",
        };

      default:
        return {
          label: status || "Unknown",
          icon: FaClock,
          className: "bg-[#1F1811]/10 text-[#1F1811]",
        };
    }
  };

  const getCount = (filter) => {
    if (filter === "all") return orders.length;
    return orders.filter((order) => getOrderCategory(order.status) === filter)
      .length;
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getPaymentStatusStyle = (status) => {
    const normalizedStatus = status?.toLowerCase();
    if (normalizedStatus === "paid") {
      return "bg-[#6B8E4E]/10 text-[#6B8E4E]";
    }

    if (normalizedStatus === "failed" || normalizedStatus === "cancelled") {
      return "bg-red-100 text-red-600";
    }
    return "bg-[#D9952B]/10 text-[#D9952B]";
  };

  return (
    <div>
      {/* Header */}

      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-dashed border-[#1F1811]/20 pb-5">
        <div>
          <h1 className="font-[Archivo_Black] text-2xl uppercase text-[#1F1811] sm:text-3xl">
            Orders
          </h1>

          <p className="mt-2 text-sm text-[#8A7C6A]">
            Track, manage and review all customer orders.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={loading}
          className="flex cursor-pointer items-center gap-2 bg-[#1F1811] px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-[#FBF3E7] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FaArrowRotateRight className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Stats */}

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="bg-white p-5 shadow-[0_10px_30px_-18px_rgba(31,24,17,0.3)]">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
            Total Orders
          </p>

          <p className="mt-2 font-[Archivo_Black] text-2xl text-[#1F1811]">
            {loading ? "..." : orders.length}
          </p>
        </div>

        <div className="bg-white p-5 shadow-[0_10px_30px_-18px_rgba(31,24,17,0.3)]">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
            Active
          </p>

          <p className="mt-2 font-[Archivo_Black] text-2xl text-[#E8491D]">
            {loading ? "..." : getCount("active")}
          </p>
        </div>

        <div className="bg-white p-5 shadow-[0_10px_30px_-18px_rgba(31,24,17,0.3)]">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
            Delivered
          </p>

          <p className="mt-2 font-[Archivo_Black] text-2xl text-[#6B8E4E]">
            {loading ? "..." : getCount("delivered")}
          </p>
        </div>

        <div className="bg-white p-5 shadow-[0_10px_30px_-18px_rgba(31,24,17,0.3)]">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
            Cancelled
          </p>

          <p className="mt-2 font-[Archivo_Black] text-2xl text-red-600">
            {loading ? "..." : getCount("cancelled")}
          </p>
        </div>
      </div>

      {/* Orders */}

      <section className="mt-6">
        {/* Section Header */}

        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <FaBagShopping className="text-[#E8491D]" />

              <h2 className="font-[Archivo_Black] text-lg uppercase text-[#1F1811]">
                Order List
              </h2>
            </div>

            <p className="mt-1 text-xs text-[#8A7C6A]">
              View all current and previous orders.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`cursor-pointer px-3 py-2 text-xs font-bold transition ${
                  activeFilter === filter.id
                    ? "bg-[#E8491D] text-[#FBF3E7]"
                    : "bg-white text-[#1F1811] hover:bg-[#1F1811]/10"
                }`}
              >
                {filter.label}

                <span className="ml-2 text-[10px] opacity-70">
                  {getCount(filter.id)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}

        {loading ? (
          <div className="bg-white py-20 text-center">
            <FaArrowRotateRight className="mx-auto animate-spin text-2xl text-[#E8491D]" />

            <p className="mt-4 text-sm font-bold text-[#8A7C6A]">
              Loading orders...
            </p>
          </div>
        ) : (
          <>
            {/* Order Cards */}

            <div className="grid gap-4">
              {filteredOrders.map((order) => {
                const status = getStatusStyle(order.status);
                const StatusIcon = status.icon;

                const isPaid = order.paymentStatus?.toLowerCase() === "paid";

                const isPaying = payingOrderId === order._id;

                return (
                  <div
                    key={order._id}
                    className="bg-white p-5 shadow-[0_10px_30px_-18px_rgba(31,24,17,0.3)] transition hover:shadow-[0_15px_35px_-18px_rgba(31,24,17,0.4)] sm:p-6"
                  >
                    {/* Card Header */}

                    <div className="flex items-start justify-between gap-4 border-b border-dashed border-[#1F1811]/10 pb-4">
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                          Order ID
                        </p>

                        <h3 className="mt-1 font-[Archivo_Black] text-lg text-[#1F1811]">
                          #{order.orderNumber}
                        </h3>

                        <p className="mt-1 text-xs text-[#8A7C6A]">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-2 text-[9px] font-bold uppercase tracking-wide ${status.className}`}
                      >
                        <StatusIcon />
                        {status.label}
                      </span>
                    </div>

                    {/* Details */}

                    <div className="grid grid-cols-2 gap-x-5 gap-y-5 py-5">
                      {/* Restaurant */}

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                          Restaurant
                        </p>

                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex size-8 shrink-0 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
                            <FaUtensils className="text-xs" />
                          </div>

                          <p className="truncate text-sm font-bold text-[#1F1811]">
                            {order.restaurantId?.restaurantName ||
                              order.restaurantId?.fullName ||
                              "Unknown Restaurant"}
                          </p>
                        </div>
                      </div>

                      {/* Rider */}

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                          Rider
                        </p>

                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex size-8 shrink-0 items-center justify-center bg-[#E8491D]/10 text-[#E8491D]">
                            <FaMotorcycle className="text-xs" />
                          </div>

                          <p className="truncate text-sm font-bold text-[#1F1811]">
                            {order.riderId?.fullName || "Not Assigned"}
                          </p>
                        </div>
                      </div>

                      {/* Items */}

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                          Items
                        </p>

                        <div className="mt-2 flex items-center gap-2 text-sm font-bold text-[#1F1811]">
                          <FaReceipt className="text-[#E8491D]" />
                          {order.items?.length || 0} Items
                        </div>
                      </div>

                      {/* Payment Type */}

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                          Payment Type
                        </p>

                        <div className="mt-2 flex items-center gap-2 text-sm font-bold text-[#1F1811]">
                          <FaMoneyBillWave className="text-[#6B8E4E]" />

                          {order.orderValue?.paymentMethod || "N/A"}
                        </div>
                      </div>

                      {/* Payment Status */}

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                          Payment Status
                        </p>

                        <span
                          className={`mt-2 inline-flex px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide ${getPaymentStatusStyle(
                            order.paymentStatus,
                          )}`}
                        >
                          {order.paymentStatus || "Pending"}
                        </span>
                      </div>

                      {/* Total */}

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                          Total Amount
                        </p>

                        <div className="mt-2 flex items-center font-[Archivo_Black] text-lg text-[#E8491D]">
                          <FaIndianRupeeSign className="text-sm" />

                          {order.orderValue?.total || 0}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}

                    <div className="flex flex-col gap-3 border-t border-dashed border-[#1F1811]/10 pt-4 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        className="flex flex-1 cursor-pointer items-center justify-center gap-2 bg-[#1F1811] px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-[#FBF3E7] transition hover:bg-[#E8491D]"
                      >
                        <FaEye />
                        View Order
                      </button>

                      {isPaid ? (
                        <div className="flex flex-1 items-center justify-center gap-2 bg-[#6B8E4E]/10 px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-[#6B8E4E]">
                          <FaCircleCheck />
                          Payment Paid
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handlePayment(order._id)}
                          disabled={isPaying}
                          className="flex flex-1 cursor-pointer items-center justify-center gap-2 bg-[#E8491D] px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-[#FBF3E7] transition hover:bg-[#C93B16] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isPaying ? (
                            <>
                              <FaArrowRotateRight className="animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <FaIndianRupeeSign />
                              Mark Paid
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty State */}

            {filteredOrders.length === 0 && (
              <div className="bg-white py-20 text-center">
                <FaBagShopping className="mx-auto text-4xl text-[#8A7C6A]/40" />

                <h3 className="mt-4 font-bold text-[#1F1811]">
                  No orders found
                </h3>

                <p className="mt-2 text-sm text-[#8A7C6A]">
                  There are no orders in this category.
                </p>
              </div>
            )}
          </>
        )}
      </section>

      {/* View Order Modal */}

      {selectedOrder && (
        <ViewOrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          formatDate={formatDate}
          getStatusStyle={getStatusStyle}
        />
      )}
    </div>
  );
};

export default Orders;
