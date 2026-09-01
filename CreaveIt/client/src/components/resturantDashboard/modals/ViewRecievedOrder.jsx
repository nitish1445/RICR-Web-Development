import React, { useState } from "react";
import {
  FaXmark,
  FaUser,
  FaReceipt,
  FaClock,
  FaCheck,
  FaUtensils,
  FaIndianRupeeSign,
  FaCircleCheck,
  FaCircleXmark,
} from "react-icons/fa6";

import api from "../../../config/Api";
import toast from "react-hot-toast";
const ViewReceivedOrder = ({ order, onClose }) => {
  const [status, setStatus] = useState(order?.status || "pending");
  const [loading, setLoading] = useState(false);
  if (!order) return null;
  const handleStatusChange = async (newStatus) => {
    try {
      setLoading(true);
      const res = await api.patch(
        `/restaurant/orders/${order._id}/updateorderstatus?status=${newStatus}`,
      );
      toast.success(res.data.message);
      setStatus(newStatus);
      if (newStatus === "ready" || newStatus === "rejected") {
        setTimeout(() => {
          onClose();
        }, 500);
      }
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast.error(
        error?.response?.data?.message || "Failed to update order status",
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (currentStatus) => {
    const styles = {
      pending: "bg-amber-100 text-amber-700",
      accepted: "bg-blue-100 text-blue-700",
      preparing: "bg-orange-100 text-orange-700",
      ready: "bg-green-100 text-green-700",
      pickedUp: "bg-purple-100 text-purple-700",
      onTheWay: "bg-indigo-100 text-indigo-700",
      delivered: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
      cancelled: "bg-red-100 text-red-700",
    };

    return styles[currentStatus] || "bg-gray-100 text-gray-700";
  };

  const getNextAction = () => {
    switch (status) {
      case "pending":
        return {
          label: "Accept Order",
          nextStatus: "accepted",
        };

      case "accepted":
        return {
          label: "Start Preparing",
          nextStatus: "preparing",
        };

      case "preparing":
        return {
          label: "Mark Ready",
          nextStatus: "ready",
        };

      default:
        return null;
    }
  };

  const nextAction = getNextAction();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden bg-[#FBF3E7] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1F1811]/10 px-5 py-4 sm:px-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
              Order Details
            </p>

            <h2 className="mt-1 font-[Archivo_Black] text-lg uppercase text-[#1F1811] sm:text-xl">
              {order.orderNumber || `Order #${order._id?.substring(0, 8)}`}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex size-9 cursor-pointer items-center justify-center bg-[#1F1811] text-[#FBF3E7] transition hover:bg-[#E8491D]"
          >
            <FaXmark />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          {/* Order Summary */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Customer */}
            <div className="bg-white p-4">
              <div className="mb-2 flex items-center gap-2 text-[#8A7C6A]">
                <FaUser className="text-xs" />

                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Customer
                </span>
              </div>

              <p className="font-bold text-[#1F1811]">
                {order.userId?.fullName || "Unknown Customer"}
              </p>

              {order.userId?.phone && (
                <p className="mt-1 text-xs text-[#8A7C6A]">
                  {order.userId.phone}
                </p>
              )}
            </div>

            {/* Order Status */}
            <div className="bg-white p-4">
              <div className="mb-2 flex items-center gap-2 text-[#8A7C6A]">
                <FaClock className="text-xs" />

                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Current Status
                </span>
              </div>

              <span
                className={`inline-flex px-3 py-1.5 text-xs font-bold uppercase ${getStatusStyle(
                  status,
                )}`}
              >
                {status}
              </span>
            </div>

            {/* Order Date */}
            <div className="bg-white p-4">
              <div className="mb-2 flex items-center gap-2 text-[#8A7C6A]">
                <FaReceipt className="text-xs" />

                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Order Date
                </span>
              </div>

              <p className="font-bold text-sm text-[#1F1811]">
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>

            {/* Total */}
            <div className="bg-[#E8491D] p-4 text-[#FBF3E7]">
              <div className="mb-2 flex items-center gap-2 opacity-80">
                <FaIndianRupeeSign className="text-xs" />

                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Total Amount
                </span>
              </div>

              <p className="font-[Archivo_Black] text-2xl">
                ₹{order.orderValue?.total || 0}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2">
              <FaUtensils className="text-[#E8491D]" />

              <h3 className="font-[Archivo_Black] text-sm uppercase text-[#1F1811]">
                Ordered Items ({order.items?.length || 0})
              </h3>
            </div>

            <div className="overflow-hidden bg-white">
              {order.items && order.items.length > 0 ? (
                order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border-b border-[#1F1811]/10 p-4 last:border-0"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center bg-[#1F1811] text-xs font-bold text-[#FBF3E7]">
                        {idx + 1}
                      </div>

                      <div>
                        <p className="truncate font-bold text-sm text-[#1F1811]">
                          {item.name || item.itemName || "Menu Item"}
                        </p>

                        <p className="mt-1 text-xs text-[#8A7C6A]">
                          Quantity: {item.quantity || 1}
                        </p>
                      </div>
                    </div>

                    {item.price && (
                      <p className="ml-4 font-bold text-sm text-[#1F1811]">
                        ₹{item.price}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="py-10 text-center text-sm text-[#8A7C6A]">
                  No items found in this order.
                </div>
              )}
            </div>
          </div>

          {/* Payment Details */}
          <div className="mt-6 bg-white p-4">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
              Payment Details
            </p>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <p className="text-[10px] uppercase text-[#8A7C6A]">Subtotal</p>

                <p className="mt-1 font-bold text-sm text-[#1F1811]">
                  ₹{order.orderValue?.subtotal || 0}
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase text-[#8A7C6A]">Tax</p>

                <p className="mt-1 font-bold text-sm text-[#1F1811]">
                  ₹{order.orderValue?.tax || 0}
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase text-[#8A7C6A]">Delivery</p>

                <p className="mt-1 font-bold text-sm text-[#1F1811]">
                  ₹{order.orderValue?.deliveryFee || 0}
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase text-[#8A7C6A]">Payment</p>

                <p className="mt-1 font-bold capitalize text-sm text-[#1F1811]">
                  {order.orderValue?.paymentMethod || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        {order.status !== "delivered" && (
          <div className="flex flex-col-reverse gap-3 border-t border-[#1F1811]/10 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <button
              type="button"
              disabled={
                loading ||
                ["rejected", "cancelled", "ready", "delivered"].includes(status)
              }
              onClick={() => handleStatusChange("rejected")}
              className="flex cursor-pointer items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#E8491D] transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaCircleXmark />
              Reject Order
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#1F1811] transition hover:bg-[#FBF3E7]"
              >
                Close
              </button>

              {nextAction && (
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleStatusChange(nextAction.nextStatus)}
                  className="flex cursor-pointer items-center justify-center gap-2 bg-[#E8491D] px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#FBF3E7] transition hover:bg-[#C93B16] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Updating
                    </>
                  ) : (
                    <>
                      <FaCircleCheck />
                      {nextAction.label}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewReceivedOrder;
