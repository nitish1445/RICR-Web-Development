import React, { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaLocationDot,
  FaRotateRight,
  FaUser,
  FaStore,
  FaIndianRupeeSign,
  FaClock,
  FaUtensils,
  FaEye,
  FaTruckFast,
  FaMapLocationDot,
  FaCircleCheck,
} from "react-icons/fa6";
import api from "../../config/Api";
import Loading from "../Loading";
import ViewDetailsModal from "./modals/ViewDetailsModal";
import { useAuth } from "../../context/AuthContext";

const RiderCurrentOrder = () => {
  const { user } = useAuth();

  const [currentOrder, setCurrentOrder] = useState([]);
  const [availableOrder, setAvailableOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewdetailsModalOpen, setViewDetailsModalOpen] = useState(false);

  const [riderLocation, setRiderLocation] = useState(
    user?.geoLocation || user?.geolocation,
  );

  const statusBadgeClass = (status = "") => {
    if (["delivered"].includes(status)) {
      return "bg-[#6B8E4E]/15 text-[#6B8E4E]";
    }

    if (["cancelled", "rejected", "refused", "damaged"].includes(status)) {
      return "bg-[#E8491D]/10 text-[#E8491D]";
    }

    if (["ready", "pickedUp", "onTheWay"].includes(status)) {
      return "bg-blue-500/10 text-blue-600";
    }

    return "bg-[#D89B2B]/10 text-[#D89B2B]";
  };

  const formatStatus = (status) => {
    if (!status) return "Pending";

    const statusMap = {
      pending: "Pending",
      accepted: "Accepted",
      preparing: "Preparing",
      ready: "Ready for Pickup",
      partnerAssigned: "Assigned",
      pickedUp: "Picked Up",
      onTheWay: "On The Way",
      delivered: "Delivered",
      rejected: "Rejected",
      damaged: "Damaged",
      cancelled: "Cancelled",
      refused: "Refused",
    };

    return statusMap[status] || status;
  };

  const fetchOngoingOrder = async () => {
    setIsLoading(true);

    try {
      let response = await api.get("/rider/ongoingOrder");

      if (response.data.data.length > 0) {
        setCurrentOrder(response.data.data);
        setAvailableOrder([]);
      } else {
        setCurrentOrder([]);

        response = await api.get("/rider/availableOrder");

        setAvailableOrder(response.data.data || []);

        response.data.data.length > 0 && calculateDistance(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching current order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOngoingOrder();

    const interval = setInterval(() => {
      fetchOngoingOrder();
    }, 1000 * 30);

    return () => clearInterval(interval);
  }, []);

  const refershLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(
          "Current Location:",
          position.coords.latitude,
          position.coords.longitude,
        );

        setRiderLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error fetching location:", error);
      },
    );
  };

  const getDistance = (riderLocation, resturantLocation) => {
    //call google Location Api
    //return Distance and Time
  };

  const calculateDistance = (orderData) => {};

  const getRestaurantName = (order) => {
    return (
      order?.restaurantId?.restaurantName ||
      order?.restaurantId?.fullName ||
      "Restaurant"
    );
  };

  const getCustomerName = (order) => {
    return order?.userId?.fullName || "Customer";
  };

  const getFoodItems = (order) => {
    if (!order?.items?.length) return "No items available";

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
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <main className="pb-10">
      {/* Header */}

      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
            Delivery Management
          </p>

          <h1 className="mt-1 font-[Archivo_Black] text-2xl uppercase text-[#1F1811] sm:text-3xl">
            Current Orders
          </h1>

          <p className="mt-2 max-w-xl text-sm text-[#8A7C6A]">
            Manage your active delivery and discover available orders nearby.
          </p>
        </div>

        <button
          type="button"
          onClick={refershLocation}
          className="inline-flex cursor-pointer items-center justify-center gap-2 bg-[#1F1811] px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-[#FBF3E7] transition hover:bg-[#E8491D]"
        >
          <FaMapLocationDot />
          Refresh Location
        </button>
      </div>

      {/* Rider Location */}

      <div className="mb-6 flex flex-wrap items-center gap-3 bg-[#1F1811] px-5 py-4">
        <div className="flex size-10 items-center justify-center bg-[#E8491D] text-[#FBF3E7]">
          <FaLocationDot />
        </div>

        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
            Current Rider Location
          </p>

          <p className="mt-1 text-xs font-bold text-[#FBF3E7]">
            {riderLocation?.lat && riderLocation?.lon
              ? `${Number(riderLocation.lat).toFixed(4)}, ${Number(
                  riderLocation.lon,
                ).toFixed(4)}`
              : "Location not available"}
          </p>
        </div>

        <div className="ml-auto hidden items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-[#6B8E4E] sm:flex">
          <span className="size-2 rounded-full bg-[#6B8E4E]" />
          Location Active
        </div>
      </div>

      {/* CURRENT ORDER */}

      {currentOrder.length > 0 && (
        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
                Active Delivery
              </p>

              <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase text-[#1F1811]">
                Your Current Order
              </h2>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#6B8E4E]">
              <span className="size-2 animate-pulse rounded-full bg-[#6B8E4E]" />
              In Progress
            </div>
          </div>

          <div className="space-y-4">
            {currentOrder.map((order, idx) => (
              <div key={order._id || idx} className="overflow-hidden bg-white">
                {/* Top */}

                <div className="flex flex-col justify-between gap-5 bg-[#1F1811] p-5 sm:flex-row sm:items-center sm:p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center bg-[#E8491D] text-[#FBF3E7]">
                      <FaTruckFast className="text-lg" />
                    </div>

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#8A7C6A]">
                        Order Number
                      </p>

                      <h3 className="mt-1 font-[Archivo_Black] text-lg uppercase text-[#FBF3E7]">
                        #{order.orderNumber || order._id?.slice(-8)}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`w-fit px-4 py-2 text-[10px] font-bold uppercase tracking-wider ${statusBadgeClass(
                      order.status,
                    )}`}
                  >
                    {formatStatus(order.status)}
                  </span>
                </div>

                {/* Main Details */}

                <div className="grid grid-cols-1 gap-px bg-[#1F1811]/10 lg:grid-cols-3">
                  {/* Customer */}

                  <div className="bg-white p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex size-11 shrink-0 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
                        <FaUser />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                          Customer
                        </p>

                        <p className="mt-2 truncate text-sm font-bold text-[#1F1811]">
                          {getCustomerName(order)}
                        </p>

                        <p className="mt-1 text-xs text-[#8A7C6A]">
                          Delivery destination
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Restaurant */}

                  <div className="bg-white p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex size-11 shrink-0 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
                        <FaStore />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                          Pickup From
                        </p>

                        <p className="mt-2 truncate text-sm font-bold text-[#1F1811]">
                          {getRestaurantName(order)}
                        </p>

                        <p className="mt-1 text-xs text-[#8A7C6A]">
                          Restaurant pickup
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Amount */}

                  <div className="bg-[#FBF3E7] p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex size-11 shrink-0 items-center justify-center bg-[#E8491D] text-[#FBF3E7]">
                        <FaIndianRupeeSign />
                      </div>

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                          Order Value
                        </p>

                        <p className="mt-1 text-2xl font-[Archivo_Black] text-[#1F1811]">
                          ₹{order.orderValue?.total || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Food Items */}

                <div className="border-t border-[#1F1811]/10 p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
                      <FaUtensils />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                        Order Items
                      </p>

                      <p className="mt-2 text-sm font-semibold text-[#1F1811]">
                        {getFoodItems(order)}
                      </p>

                      <p className="mt-1 text-xs text-[#8A7C6A]">
                        {order.items?.length || 0} item
                        {order.items?.length !== 1 ? "s" : ""} in this order
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer */}

                <div className="flex flex-col justify-between gap-4 border-t border-[#1F1811]/10 bg-[#FBF3E7]/50 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
                  <div className="flex flex-wrap items-center gap-4 text-[10px] font-semibold text-[#8A7C6A]">
                    <span className="flex items-center gap-2">
                      <FaClock className="text-[#E8491D]" />

                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString("en-IN", {
                            day: "numeric",
                            month: "short",
                            hour: "numeric",
                            minute: "numeric",
                          })
                        : "Time unavailable"}
                    </span>

                    <span className="uppercase">
                      {order.orderValue?.paymentMethod || "Payment N/A"}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#6B8E4E]">
                      <FaCircleCheck />
                      Delivery In Progress
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedOrder(order);
                        setViewDetailsModalOpen(true);
                      }}
                      className="inline-flex cursor-pointer items-center gap-2 bg-[#1F1811] px-4 py-2.5 text-[9px] font-bold uppercase tracking-wider text-[#FBF3E7] transition hover:bg-[#E8491D]"
                    >
                      <FaEye />
                      View & Update
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* AVAILABLE ORDERS */}

      {currentOrder.length === 0 && availableOrder.length > 0 && (
        <section>
          <div className="mb-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
              New Opportunities
            </p>

            <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase text-[#1F1811] sm:text-2xl">
              Available Orders
            </h2>

            <p className="mt-2 text-sm text-[#8A7C6A]">
              Orders ready for delivery in your area.
            </p>
          </div>

          {/* Desktop */}

          <div className="hidden overflow-hidden bg-white lg:block">
            <div className="grid grid-cols-[1.1fr_1fr_1.2fr_0.7fr_0.7fr_0.8fr] bg-[#1F1811]">
              <div className="px-5 py-4 text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                Order
              </div>

              <div className="px-5 py-4 text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                Customer
              </div>

              <div className="px-5 py-4 text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                Restaurant
              </div>

              <div className="px-5 py-4 text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                Amount
              </div>

              <div className="px-5 py-4 text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                Status
              </div>

              <div className="px-5 py-4 text-right text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                Action
              </div>
            </div>

            {availableOrder.map((order, idx) => (
              <div
                key={order._id || idx}
                className="grid grid-cols-[1.1fr_1fr_1.2fr_0.7fr_0.7fr_0.8fr] items-center border-b border-[#1F1811]/10 transition hover:bg-[#FBF3E7]"
              >
                <div className="px-5 py-5">
                  <p className="font-bold text-[#1F1811]">
                    #{order.orderNumber || order._id?.slice(-8)}
                  </p>

                  <p className="mt-1 text-[10px] text-[#8A7C6A]">
                    {order.items?.length || 0} items
                  </p>
                </div>

                <div className="truncate px-5 py-5 text-sm font-semibold text-[#1F1811]">
                  {getCustomerName(order)}
                </div>

                <div className="truncate px-5 py-5 text-sm font-semibold text-[#1F1811]">
                  {getRestaurantName(order)}
                </div>

                <div className="px-5 py-5 text-sm font-bold text-[#E8491D]">
                  ₹{order.orderValue?.total || 0}
                </div>

                <div className="px-5 py-5">
                  <span
                    className={`inline-block px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider ${statusBadgeClass(
                      order.status,
                    )}`}
                  >
                    {formatStatus(order.status)}
                  </span>
                </div>

                <div className="flex justify-end px-5 py-5">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedOrder(order);
                      setViewDetailsModalOpen(true);
                    }}
                    className="inline-flex cursor-pointer items-center gap-2 bg-[#1F1811] px-4 py-2.5 text-[9px] font-bold uppercase tracking-wider text-[#FBF3E7] transition hover:bg-[#E8491D]"
                  >
                    <FaEye />
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile + Tablet Cards */}

          <div className="grid grid-cols-1 gap-4 lg:hidden">
            {availableOrder.map((order, idx) => (
              <div key={order._id || idx} className="overflow-hidden bg-white">
                {/* Card Header */}

                <div className="flex items-start justify-between gap-4 bg-[#1F1811] p-5">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                      Order Number
                    </p>

                    <h3 className="mt-1 font-[Archivo_Black] text-lg text-[#FBF3E7]">
                      #{order.orderNumber || order._id?.slice(-8)}
                    </h3>
                  </div>

                  <span
                    className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider ${statusBadgeClass(
                      order.status,
                    )}`}
                  >
                    {formatStatus(order.status)}
                  </span>
                </div>

                {/* Card Body */}

                <div className="grid grid-cols-1 gap-px bg-[#1F1811]/10 sm:grid-cols-2">
                  <MobileInfo
                    icon={FaUser}
                    label="Customer"
                    value={getCustomerName(order)}
                  />

                  <MobileInfo
                    icon={FaStore}
                    label="Restaurant"
                    value={getRestaurantName(order)}
                  />

                  <MobileInfo
                    icon={FaUtensils}
                    label="Items"
                    value={`${order.items?.length || 0} item${
                      order.items?.length !== 1 ? "s" : ""
                    }`}
                  />

                  <MobileInfo
                    icon={FaIndianRupeeSign}
                    label="Order Value"
                    value={`₹${order.orderValue?.total || 0}`}
                    highlight
                  />
                </div>

                {/* Food */}

                <div className="border-t border-[#1F1811]/10 p-5">
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                    Food Items
                  </p>

                  <p className="mt-2 line-clamp-2 text-sm font-semibold text-[#1F1811]">
                    {getFoodItems(order)}
                  </p>
                </div>

                {/* Action */}

                <div className="border-t border-[#1F1811]/10 p-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedOrder(order);
                      setViewDetailsModalOpen(true);
                    }}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 bg-[#E8491D] px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-[#FBF3E7] transition hover:bg-[#C93B16]"
                  >
                    <FaEye />
                    View Order Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EMPTY STATE */}

      {currentOrder.length === 0 && availableOrder.length === 0 && (
        <div className="flex min-h-105 flex-col items-center justify-center bg-white px-6 text-center">
          <div className="flex size-20 items-center justify-center bg-[#E8491D]/10 text-[#E8491D]">
            <FaBoxOpen className="text-3xl" />
          </div>

          <h2 className="mt-6 font-[Archivo_Black] text-xl uppercase text-[#1F1811]">
            No Orders Available
          </h2>

          <p className="mt-3 max-w-sm text-sm leading-6 text-[#8A7C6A]">
            There are currently no active or available orders. New delivery
            requests will appear here automatically.
          </p>

          <button
            type="button"
            onClick={fetchOngoingOrder}
            className="mt-6 inline-flex cursor-pointer items-center gap-2 bg-[#1F1811] px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-[#FBF3E7] transition hover:bg-[#E8491D]"
          >
            <FaRotateRight />
            Check Again
          </button>
        </div>
      )}

      {/* View Details Modal */}

      {viewdetailsModalOpen && selectedOrder && (
        <ViewDetailsModal
          order={selectedOrder}
          onClose={() => {
            setViewDetailsModalOpen(false);
            setSelectedOrder(null);
          }}
          onOrderUpdated={fetchOngoingOrder}
        />
      )}
    </main>
  );
};

/* Mobile Info Card */

const MobileInfo = ({ icon: Icon, label, value, highlight = false }) => {
  return (
    <div className="bg-white p-4">
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
          <Icon className="text-sm" />
        </div>

        <div className="min-w-0">
          <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#8A7C6A]">
            {label}
          </p>

          <p
            className={`mt-1 truncate text-sm font-bold ${
              highlight ? "text-[#E8491D]" : "text-[#1F1811]"
            }`}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiderCurrentOrder;
