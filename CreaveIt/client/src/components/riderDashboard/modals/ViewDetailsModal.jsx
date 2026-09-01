import React, { useMemo, useState } from "react";
import {
  FaXmark,
  FaBagShopping,
  FaStore,
  FaUser,
  FaPhone,
  FaIndianRupeeSign,
  FaUtensils,
  FaCircleCheck,
  FaTruckFast,
  FaBoxOpen,
  FaArrowRight,
  FaSpinner,
  FaBan,
  FaTriangleExclamation,
} from "react-icons/fa6";
import toast from "react-hot-toast";
import api from "../../../config/Api";

const ViewDetailsModal = ({ order, onClose, onOrderUpdated }) => {
  const [loading, setLoading] = useState(false);
  const restaurantName =
    order?.restaurantId?.restaurantName ||
    order?.restaurantId?.fullName ||
    "Restaurant";

  const customerName = order?.userId?.fullName || "Customer";

  const restaurantAddress =
    order?.restaurantId?.address ||
    order?.restaurantId?.location?.address ||
    "Restaurant address not available";

  const customerAddress =
    order?.deliveryAddress?.address ||
    order?.userId?.address ||
    order?.address ||
    "Delivery address not available";

  const customerPhone =
    order?.userId?.phone || order?.deliveryAddress?.phone || "Not available";

  const totalAmount = order?.orderValue?.total || 0;
  const status = order?.status || "pending";

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

  const currentStep = useMemo(() => {
    const steps = ["partnerAssigned", "pickedUp", "onTheWay", "delivered"];
    if (status === "partnerAssigned") return 0;
    if (status === "pickedUp") return 1;
    if (status === "onTheWay") return 2;
    if (status === "delivered") return 3;

    return -1;
  }, [status]);

  const updateOrderStatus = async (newStatus) => {
    try {
      setLoading(true);
      const response = await api.patch(`/rider/order/${order._id}/status`, {
        status: newStatus,
      });

      toast.success(
        response?.data?.message ||
          `Order status updated to ${statusMap[newStatus]}`,
      );
      if (onOrderUpdated) {
        await onOrderUpdated();
      }

      if (
        ["delivered", "cancelled", "rejected", "damaged"].includes(newStatus)
      ) {
        onClose();
      }
    } catch (error) {
      console.error("Status update error:", error);
      toast.error(
        error?.response?.data?.message || "Unable to update order status",
      );
    } finally {
      setLoading(false);
    }
  };

  const getNextAction = () => {
    switch (status) {
      case "pending":
      case "ready":
        return {
          label: "Accept Delivery",
          status: "partnerAssigned",
          icon: FaCircleCheck,
        };

      case "partnerAssigned":
        return {
          label: "Mark as Picked Up",
          status: "pickedUp",
          icon: FaBoxOpen,
        };

      case "pickedUp":
        return {
          label: "Start Delivery",
          status: "onTheWay",
          icon: FaTruckFast,
        };

      case "onTheWay":
        return {
          label: "Mark as Delivered",
          status: "delivered",
          icon: FaCircleCheck,
        };

      default:
        return null;
    }
  };

  const nextAction = getNextAction();

  const isCompleted = [
    "delivered",
    "cancelled",
    "rejected",
    "damaged",
  ].includes(status);

  return (
    <div className="fixed inset-0 z-100 flex items-end justify-center bg-black/60 sm:items-center sm:p-6">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto bg-[#FBF3E7] shadow-2xl">
        {/* Header */}

        <div className="sticky top-0 z-20 flex items-center justify-between bg-[#1F1811] p-5 sm:p-6">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
              Delivery Details
            </p>

            <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase text-[#FBF3E7] sm:text-2xl">
              #{order?.orderNumber || order?._id?.slice(-8)}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex size-10 cursor-pointer items-center justify-center bg-white/10 text-[#FBF3E7] transition hover:bg-[#E8491D]"
          >
            <FaXmark />
          </button>
        </div>

        {/* Status Progress */}

        {!isCompleted && (
          <div className="border-b border-[#1F1811]/10 bg-white p-5 sm:p-6">
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
              Delivery Progress
            </p>

            <div className="mt-5 grid grid-cols-4">
              {[
                {
                  label: "Assigned",
                  icon: FaCircleCheck,
                },
                {
                  label: "Picked Up",
                  icon: FaBoxOpen,
                },
                {
                  label: "On The Way",
                  icon: FaTruckFast,
                },
                {
                  label: "Delivered",
                  icon: FaCircleCheck,
                },
              ].map((step, index) => {
                const Icon = step.icon;

                const active = currentStep >= index;
                const current = currentStep === index;

                return (
                  <div
                    key={step.label}
                    className="relative flex flex-col items-center text-center"
                  >
                    {index !== 3 && (
                      <div
                        className={`absolute left-1/2 top-5 h-0.5 w-full ${
                          currentStep > index
                            ? "bg-[#6B8E4E]"
                            : "bg-[#1F1811]/10"
                        }`}
                      />
                    )}

                    <div
                      className={`relative z-10 flex size-10 items-center justify-center ${
                        active
                          ? current
                            ? "bg-[#E8491D] text-white"
                            : "bg-[#6B8E4E] text-white"
                          : "bg-[#FBF3E7] text-[#8A7C6A]"
                      }`}
                    >
                      <Icon className="text-sm" />
                    </div>

                    <p
                      className={`mt-3 text-[8px] font-bold uppercase tracking-wide sm:text-[9px] ${
                        active ? "text-[#1F1811]" : "text-[#8A7C6A]"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Terminal Status */}

        {isCompleted && (
          <div
            className={`p-5 text-center ${
              status === "delivered" ? "bg-[#6B8E4E]/10" : "bg-[#E8491D]/10"
            }`}
          >
            <p
              className={`font-[Archivo_Black] text-lg uppercase ${
                status === "delivered" ? "text-[#6B8E4E]" : "text-[#E8491D]"
              }`}
            >
              {statusMap[status]}
            </p>

            <p className="mt-1 text-xs text-[#8A7C6A]">
              This order is no longer active.
            </p>
          </div>
        )}

        <div className="p-5 sm:p-6">
          {/* Amount */}

          <div className="flex flex-col justify-between gap-5 bg-[#1F1811] p-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex size-12 items-center justify-center bg-[#E8491D] text-white">
                <FaBagShopping />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                  Total Order Value
                </p>

                <p className="mt-1 font-[Archivo_Black] text-2xl text-[#FBF3E7]">
                  ₹{totalAmount}
                </p>
              </div>
            </div>

            <span className="w-fit bg-[#E8491D]/15 px-4 py-2 text-[9px] font-bold uppercase tracking-wider text-[#E8491D]">
              {statusMap[status]}
            </span>
          </div>

          {/* Pickup & Delivery */}

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {/* Restaurant */}

            <div className="bg-white p-5">
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center bg-[#E8491D]/10 text-[#E8491D]">
                  <FaStore />
                </div>

                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                    Pickup From
                  </p>

                  <h3 className="mt-2 text-base font-bold text-[#1F1811]">
                    {restaurantName}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-[#8A7C6A]">
                    {restaurantAddress}
                  </p>
                </div>
              </div>
            </div>

            {/* Customer */}

            <div className="bg-white p-5">
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center bg-[#6B8E4E]/10 text-[#6B8E4E]">
                  <FaUser />
                </div>

                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                    Deliver To
                  </p>

                  <h3 className="mt-2 text-base font-bold text-[#1F1811]">
                    {customerName}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-[#8A7C6A]">
                    {customerAddress}
                  </p>

                  {customerPhone !== "Not available" && (
                    <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#1F1811]">
                      <FaPhone className="text-[#E8491D]" />
                      {customerPhone}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Food Items */}

          <div className="mt-5 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
                <FaUtensils />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                  Order Items
                </p>

                <p className="mt-1 text-sm font-bold text-[#1F1811]">
                  {order?.items?.length || 0} Item
                  {order?.items?.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="mt-5 divide-y divide-[#1F1811]/10">
              {order?.items?.map((item, index) => (
                <div
                  key={item?._id || index}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <div>
                    <p className="text-sm font-bold text-[#1F1811]">
                      {item?.foodName ||
                        item?.itemName ||
                        item?.name ||
                        "Food Item"}
                    </p>

                    {item?.quantity && (
                      <p className="mt-1 text-[10px] text-[#8A7C6A]">
                        Quantity: {item.quantity}
                      </p>
                    )}
                  </div>

                  <p className="text-sm font-bold text-[#E8491D]">
                    ₹{item?.price || item?.total || 0}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment */}

          <div className="mt-5 grid gap-px bg-[#1F1811]/10 sm:grid-cols-2">
            <div className="bg-white p-4">
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                Payment Method
              </p>

              <p className="mt-2 text-sm font-bold capitalize text-[#1F1811]">
                {order?.orderValue?.paymentMethod || "Not Available"}
              </p>
            </div>

            <div className="bg-white p-4">
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                Order Amount
              </p>

              <p className="mt-2 flex items-center gap-1 text-sm font-bold text-[#1F1811]">
                <FaIndianRupeeSign className="text-[#E8491D]" />
                {totalAmount}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}

        {!isCompleted && (
          <div className="sticky bottom-0 border-t border-[#1F1811]/10 bg-white p-4 sm:p-5">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              {/* Cancel */}

              {["partnerAssigned", "pickedUp"].includes(status) && (
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => updateOrderStatus("cancelled")}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 border border-[#E8491D]/20 px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-[#E8491D] transition hover:bg-[#E8491D]/10 disabled:opacity-50"
                >
                  <FaBan />
                  Cancel Delivery
                </button>
              )}

              {/* Reject available order */}

              {["pending", "ready"].includes(status) && (
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => updateOrderStatus("rejected")}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 border border-[#E8491D]/20 px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-[#E8491D] transition hover:bg-[#E8491D]/10 disabled:opacity-50"
                >
                  <FaBan />
                  Reject
                </button>
              )}

              {/* Main action */}

              {nextAction && (
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => updateOrderStatus(nextAction.status)}
                  className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 bg-[#E8491D] px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-[#FBF3E7] transition hover:bg-[#C93B16] disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <nextAction.icon />
                      {nextAction.label}
                      <FaArrowRight />
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Warning for delivery */}

            {status === "onTheWay" && (
              <div className="mt-3 flex items-start gap-2 text-[10px] leading-5 text-[#8A7C6A]">
                <FaTriangleExclamation className="mt-0.5 shrink-0 text-[#D89B2B]" />
                Mark the order as delivered only after successfully handing it
                over to the customer.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewDetailsModal;
