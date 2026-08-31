import React, { useEffect, useState } from "react";
import {
  FaBagShopping,
  FaClock,
  FaCheck,
  FaHeart,
  FaArrowRight,
  FaLocationDot,
  FaUtensils,
  FaXmark,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/Api";

const UserOverview = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [cancellingOrder, setCancellingOrder] = useState(null);

  const getFirstName = () => {
    return user?.fullName?.split(" ")[0] || "Customer";
  };

  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const res = await api.get("/user/placedorders");
      setOrders(res?.data?.data || []);
    } catch (error) {
      console.log("Fetch orders error:", error);
      toast.error(error?.response?.data?.message || "Unable to fetch orders");
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const completedStatuses = ["delivered", "cancelled", "rejected"];

  const currentOrders = orders.filter((order) => {
    return !completedStatuses.includes(order?.status?.toLowerCase());
  });

  const topCurrentOrders = [...currentOrders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: FaBagShopping,
      color: "bg-[#E8491D]",
    },
    {
      label: "Delivered",
      value: orders.filter(
        (order) => order?.status?.toLowerCase() === "delivered",
      ).length,
      icon: FaCheck,
      color: "bg-[#6B8E4E]",
    },
    {
      label: "Current Orders",
      value: currentOrders.length,
      icon: FaClock,
      color: "bg-[#D9952B]",
    },
    {
      label: "Favorites",
      value: "0",
      icon: FaHeart,
      color: "bg-[#1F1811]",
    },
  ];

  const getRestaurantName = (order) => {
    return (
      order?.restaurantId?.restaurantName ||
      order?.restaurantId?.fullName ||
      "Restaurant"
    );
  };

  const getFoodItems = (order) => {
    if (!order?.items?.length) {
      return "Food details unavailable";
    }

    return order.items
      .map((item) => item?.foodName || item?.name || item?.itemName || "Food")
      .join(", ");
  };

  const getStatusStyle = (status) => {
    const currentStatus = status?.toLowerCase();

    if (currentStatus === "pending") {
      return "text-[#D9952B]";
    }

    if (currentStatus === "accepted") {
      return "text-[#4C7A9F]";
    }

    if (currentStatus === "preparing") {
      return "text-[#9B6B3D]";
    }

    if (currentStatus === "ready") {
      return "text-[#7A5EA8]";
    }

    if (currentStatus === "pickedup") {
      return "text-[#4C7A9F]";
    }

    if (currentStatus === "ontheway") {
      return "text-[#6B8E4E]";
    }

    return "text-[#8A7C6A]";
  };

  const formatStatus = (status) => {
    if (!status) return "Unknown";

    const statusMap = {
      pending: "Pending",
      accepted: "Accepted",
      preparing: "Preparing",
      ready: "Ready",
      pickedUp: "Picked Up",
      onTheWay: "On The Way",
      delivered: "Delivered",
      rejected: "Rejected",
      damaged: "Damaged",
      cancelled: "Cancelled",
    };

    return statusMap[status] || status;
  };

  const canCancelOrder = (status) => {
    return ["pending", "accepted"].includes(status?.toLowerCase());
  };

  const handleCancelOrder = async (orderId) => {
    try {
      setCancellingOrder(orderId);
      const res = await api.patch(`/user/cancelOrder/${orderId}`);
      toast.success(res?.data?.message || "Order cancelled successfully");
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "cancelled" } : order,
        ),
      );
    } catch (error) {
      console.log("Cancel order error:", error);
      toast.error(error?.response?.data?.message || "Unable to cancel order");
    } finally {
      setCancellingOrder(null);
    }
  };

  return (
    <main>
      {/* Welcome Section */}
      <section className="bg-[#1F1811] p-6 sm:p-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8491D]">
          Customer Dashboard
        </p>

        <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-[Archivo_Black] text-3xl uppercase text-[#FBF3E7] sm:text-4xl">
              Hello, {getFirstName()}!
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#C9BEB0]">
              Welcome back to CraveIt. Track your orders, manage your account
              and discover something delicious.
            </p>
          </div>

          <Link
            to="/restaurants"
            className="inline-flex shrink-0 items-center justify-center gap-2 bg-[#E8491D] px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#FBF3E7] transition-colors hover:bg-[#C93B16]"
          >
            Explore Food
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
                    {item.value}
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
        {/* Current Orders */}
        {/* <div className="bg-white lg:col-span-2">
          <div className="flex items-center justify-between border-b border-[#1F1811]/10 p-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
                Active Orders
              </p>

              <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase text-[#1F1811]">
                Current Orders
              </h2>
            </div>

            <Link
              to="/user-dashboard/orders"
              className="flex items-center gap-2 text-xs font-bold text-[#E8491D] transition hover:text-[#C93B16]"
            >
              View All
              <FaArrowRight />
            </Link>
          </div>

          {loadingOrders ? (
            <div className="flex min-h-72 items-center justify-center">
              <div className="flex flex-col items-center">
                <span className="size-7 animate-spin rounded-full border-2 border-[#E8491D] border-t-transparent" />

                <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                  Loading Orders...
                </p>
              </div>
            </div>
          ) : currentOrders.length === 0 ? (
            <div className="flex min-h-72 flex-col items-center justify-center px-5 text-center">
              <div className="flex size-14 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
                <FaBagShopping className="text-xl" />
              </div>

              <h3 className="mt-4 font-[Archivo_Black] text-lg uppercase text-[#1F1811]">
                No Current Orders
              </h3>

              <p className="mt-2 text-sm text-[#8A7C6A]">
                You don't have any active food orders right now.
              </p>

              <Link
                to="/restaurants"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#1F1811] transition hover:text-[#C93B16]"
              >
                Explore Restaurants
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          ) : (
            <div>
              {currentOrders.map((order) => (
                <div
                  key={order?._id}
                  className="flex flex-col gap-4 border-b border-dashed border-[#1F1811]/10 p-5 last:border-none sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
                      <FaUtensils />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[#1F1811]">
                        {getRestaurantName(order)}
                      </p>

                      <p className="mt-1 line-clamp-1 text-xs text-[#8A7C6A]">
                        {order?.orderNumber} • {getFoodItems(order)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 sm:justify-end">
                    <div className="sm:text-right">
                      <p className="text-sm font-bold text-[#1F1811]">
                        ₹{order?.orderValue?.total || 0}
                      </p>

                      <p className="mt-1 text-[10px] text-[#8A7C6A]">
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

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wide ${getStatusStyle(order?.status)}`}
                      >
                        {formatStatus(order?.status)}
                      </span>

                      {canCancelOrder(order?.status) && (
                        <button
                          type="button"
                          onClick={() => handleCancelOrder(order._id)}
                          disabled={cancellingOrder === order._id}
                          className="flex cursor-pointer items-center gap-1.5 bg-[#E8491D]/10 px-3 py-2 text-[9px] font-bold uppercase tracking-wide text-[#E8491D] transition hover:bg-[#E8491D] hover:text-[#FBF3E7] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {cancellingOrder === order._id ? (
                            <>
                              <span className="size-3 animate-spin rounded-full border border-[#E8491D] border-t-transparent" />
                              Cancelling
                            </>
                          ) : (
                            <>
                              <FaXmark />
                              Cancel
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div> */}
        {/* Current Orders */}
        <div className="bg-white lg:col-span-2">
          <div className="flex items-center justify-between border-b border-[#1F1811]/10 p-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
                Active Orders
              </p>

              <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase text-[#1F1811]">
                Current Orders
              </h2>
            </div>

            <Link
              to="/user-dashboard/orders"
              className="flex items-center gap-2 text-xs font-bold text-[#E8491D] transition hover:text-[#C93B16]"
            >
              View All
              <FaArrowRight />
            </Link>
          </div>

          {loadingOrders ? (
            <div className="flex min-h-72 items-center justify-center">
              <div className="flex flex-col items-center">
                <span className="size-7 animate-spin rounded-full border-2 border-[#E8491D] border-t-transparent" />

                <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                  Loading Orders...
                </p>
              </div>
            </div>
          ) : topCurrentOrders.length === 0 ? (
            <div className="flex min-h-72 flex-col items-center justify-center px-5 text-center">
              <div className="flex size-14 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
                <FaBagShopping className="text-xl" />
              </div>

              <h3 className="mt-4 font-[Archivo_Black] text-lg uppercase text-[#1F1811]">
                No Current Orders
              </h3>

              <p className="mt-2 text-sm text-[#8A7C6A]">
                You don't have any active food orders right now.
              </p>

              <Link
                to="/restaurants"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#1F1811] transition hover:text-[#C93B16]"
              >
                Explore Restaurants
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          ) : (
            <div>
              {topCurrentOrders.map((order) => (
                <div
                  key={order?._id}
                  className="flex flex-col gap-4 border-b border-dashed border-[#1F1811]/10 p-5 last:border-none sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
                      <FaUtensils />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[#1F1811]">
                        {getRestaurantName(order)}
                      </p>

                      <p className="mt-1 line-clamp-1 text-xs text-[#8A7C6A]">
                        {order?.orderNumber} • {getFoodItems(order)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 sm:justify-end">
                    <div className="sm:text-right">
                      <p className="text-sm font-bold text-[#1F1811]">
                        ₹{order?.orderValue?.total || 0}
                      </p>

                      <p className="mt-1 text-[10px] text-[#8A7C6A]">
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

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wide ${getStatusStyle(
                          order?.status,
                        )}`}
                      >
                        {formatStatus(order?.status)}
                      </span>

                      {canCancelOrder(order?.status) && (
                        <button
                          type="button"
                          onClick={() => handleCancelOrder(order._id)}
                          disabled={cancellingOrder === order._id}
                          className="flex cursor-pointer items-center gap-1.5 bg-[#E8491D]/10 px-3 py-2 text-[9px] font-bold uppercase tracking-wide text-[#E8491D] transition hover:bg-[#E8491D] hover:text-[#FBF3E7] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {cancellingOrder === order._id ? (
                            <>
                              <span className="size-3 animate-spin rounded-full border border-[#E8491D] border-t-transparent" />
                              Cancelling
                            </>
                          ) : (
                            <>
                              <FaXmark />
                              Cancel
                            </>
                          )}
                        </button>
                      )}
                    </div>
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
                to="/restaurants"
                className="flex items-center justify-between bg-[#FBF3E7] px-4 py-3 text-sm font-bold text-[#1F1811] transition hover:bg-[#E8491D] hover:text-[#FBF3E7]"
              >
                Order Food
                <FaArrowRight className="text-xs" />
              </Link>

              <Link
                to="/user-dashboard/orders"
                className="flex items-center justify-between bg-[#FBF3E7] px-4 py-3 text-sm font-bold text-[#1F1811] transition hover:bg-[#1F1811] hover:text-[#FBF3E7]"
              >
                Track Orders
                <FaArrowRight className="text-xs" />
              </Link>

              <Link
                to="/user-dashboard/profile"
                className="flex items-center justify-between bg-[#FBF3E7] px-4 py-3 text-sm font-bold text-[#1F1811] transition hover:bg-[#1F1811] hover:text-[#FBF3E7]"
              >
                Manage Account
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>

          {/* Address Summary */}
          <div className="bg-[#E8491D] p-5 text-[#FBF3E7]">
            <div className="flex size-10 items-center justify-center bg-[#1F1811]">
              <FaLocationDot />
            </div>

            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
              Delivery Location
            </p>

            <p className="mt-2 text-sm font-bold leading-6">
              {user?.address
                ? `${user.address}, ${user.city || ""} ${user.pin || ""}`
                : "No delivery address added"}
            </p>

            <Link
              to="/user-dashboard/profile"
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold underline underline-offset-4"
            >
              Manage Address
              <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default UserOverview;
