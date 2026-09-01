import React, { useEffect, useState } from "react";
import {
  FaBagShopping,
  FaClock,
  FaLocationDot,
  FaIndianRupeeSign,
  FaUtensils,
  FaCircleCheck,
  FaCircleXmark,
  FaTriangleExclamation,
  FaSpinner,
  FaMoneyBillWave,
  FaDownload,
  FaReceipt,
} from "react-icons/fa6";
import api from "../../config/Api";
import toast from "react-hot-toast";

const RiderOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    delivered: 0,
    cancelled: 0,
    damaged: 0,
    totalEarnings: 0,
  });

  const [paymentStatuses, setPaymentStatuses] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [checkingPayments, setCheckingPayments] = useState(false);

  // Fetch Payment Status For Individual Order
  const fetchPaymentStatus = async (orderId) => {
    try {
      const response = await api.get(`/rider/payment/${orderId}`);

      if (response?.data?.success) {
        return response?.data?.data || response?.data;
      }

      return null;
    } catch (error) {
      console.error(`Payment status error for ${orderId}:`, error);
      return null;
    }
  };

  // Fetch All Payment Statuses
  const fetchAllPaymentStatuses = async (orderList) => {
    if (!orderList?.length) return;

    try {
      setCheckingPayments(true);

      const paymentResults = await Promise.all(
        orderList.map(async (order) => {
          const payment = await fetchPaymentStatus(order._id);

          return {
            orderId: order._id,
            payment,
          };
        }),
      );

      const paymentMap = {};

      paymentResults.forEach(({ orderId, payment }) => {
        paymentMap[orderId] = payment;
      });

      setPaymentStatuses(paymentMap);
    } catch (error) {
      console.error("Error checking payment statuses:", error);
    } finally {
      setCheckingPayments(false);
    }
  };

  // Fetch Completed Orders
  const fetchCompletedOrders = async () => {
    try {
      setIsLoading(true);

      const response = await api.get("/rider/completedOrder");

      const responseData = response?.data?.data;

      const orderList = responseData?.orders || [];

      setOrders(orderList);

      setStats(
        responseData?.stats || {
          totalOrders: 0,
          delivered: 0,
          cancelled: 0,
          damaged: 0,
          totalEarnings: 0,
        },
      );

      // Fetch Payment Statuses
      if (orderList.length > 0) {
        fetchAllPaymentStatuses(orderList);
      }
    } catch (error) {
      console.error("Error fetching completed orders:", error);

      toast.error(
        error?.response?.data?.message || "Unable to fetch order history",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedOrders();
  }, []);

  // Format Currency
  const formatCurrency = (amount = 0) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  // Format Date
  const formatDateTime = (date) => {
    if (!date) return "Date unavailable";

    const orderDate = new Date(date);

    const dateText = orderDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const timeText = orderDate.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return `${dateText} • ${timeText}`;
  };

  // Status Configuration
  const getStatusConfig = (status) => {
    const statusMap = {
      delivered: {
        label: "Delivered",
        icon: FaCircleCheck,
        className: "bg-[#6B8E4E]/10 text-[#6B8E4E]",
      },

      cancelled: {
        label: "Cancelled",
        icon: FaCircleXmark,
        className: "bg-[#E8491D]/10 text-[#E8491D]",
      },

      rejected: {
        label: "Rejected",
        icon: FaCircleXmark,
        className: "bg-[#E8491D]/10 text-[#E8491D]",
      },

      refused: {
        label: "Refused",
        icon: FaCircleXmark,
        className: "bg-[#E8491D]/10 text-[#E8491D]",
      },

      damaged: {
        label: "Damaged",
        icon: FaTriangleExclamation,
        className: "bg-[#D9952B]/10 text-[#D9952B]",
      },
    };

    return (
      statusMap[status?.toLowerCase()] || {
        label: status || "Unknown",
        icon: FaBagShopping,
        className: "bg-[#1F1811]/10 text-[#5F5143]",
      }
    );
  };

  // Get Payment Status
  const getPaymentStatus = (order) => {
    const paymentData = paymentStatuses[order._id];

    if (!paymentData) {
      return {
        status: "pending",
        isPaid: false,
      };
    }

    const status =
      paymentData?.paymentStatus ||
      paymentData?.status ||
      paymentData?.payment?.status ||
      "pending";

    const normalizedStatus = String(status).toLowerCase();

    return {
      status: normalizedStatus,
      isPaid: normalizedStatus === "paid",
      data: paymentData,
    };
  };

  // Restaurant Name
  const getRestaurantName = (order) => {
    return (
      order?.restaurantId?.restaurantName ||
      order?.restaurantId?.fullName ||
      "Restaurant"
    );
  };

  // Customer Name
  const getCustomerName = (order) => {
    return order?.userId?.fullName || "Customer";
  };

  // Customer Address
  const getCustomerAddress = (order) => {
    return (
      order?.deliveryAddress?.address ||
      order?.userId?.address ||
      order?.userId?.city ||
      "Delivery address unavailable"
    );
  };

  // Food Items
  const getFoodItems = (order) => {
    if (!order?.items?.length) {
      return "Food details unavailable";
    }

    return order.items
      .map(
        (item) =>
          item?.foodName ||
          item?.itemName ||
          item?.name ||
          item?.title ||
          "Food Item",
      )
      .join(" • ");
  };

  // Download Receipt
  const downloadReceipt = (order) => {
    const paymentInfo = getPaymentStatus(order);

    if (!paymentInfo.isPaid) {
      toast.error("Payment is still pending");
      return;
    }

    const restaurantName = getRestaurantName(order);
    const customerName = getCustomerName(order);

    const deliveryEarning = Number(order?.deliveryEarning || 0);

    const paymentData = paymentInfo?.data;

    const paidDate =
      paymentData?.paidAt ||
      paymentData?.payment?.paidAt ||
      paymentData?.updatedAt ||
      new Date();

    const receiptWindow = window.open("", "_blank");

    if (!receiptWindow) {
      toast.error("Please allow popups to download receipt");
      return;
    }

    receiptWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Payment Receipt - ${order?.orderNumber || order?._id}</title>

          <style>
            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              padding: 40px;
              font-family: Arial, sans-serif;
              background: #f5f5f5;
              color: #1F1811;
            }

            .receipt {
              max-width: 700px;
              margin: auto;
              background: white;
              padding: 35px;
            }

            .header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              border-bottom: 2px solid #E8491D;
              padding-bottom: 20px;
            }

            .brand h1 {
              margin: 0;
              font-size: 28px;
              text-transform: uppercase;
            }

            .brand p {
              margin: 8px 0 0;
              color: #8A7C6A;
              font-size: 13px;
            }

            .paid {
              background: #6B8E4E;
              color: white;
              padding: 8px 15px;
              font-size: 12px;
              font-weight: bold;
              text-transform: uppercase;
            }

            .title {
              margin: 30px 0 20px;
            }

            .title h2 {
              margin: 0;
              font-size: 22px;
            }

            .title p {
              margin: 6px 0;
              color: #8A7C6A;
              font-size: 13px;
            }

            .details {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }

            .details td {
              padding: 12px 0;
              border-bottom: 1px dashed #ddd;
              font-size: 14px;
            }

            .details td:first-child {
              color: #8A7C6A;
              width: 45%;
            }

            .amount-box {
              margin-top: 30px;
              background: #1F1811;
              color: white;
              padding: 25px;
              text-align: center;
            }

            .amount-box p {
              margin: 0;
              font-size: 12px;
              text-transform: uppercase;
              color: #bbb;
            }

            .amount {
              margin-top: 10px;
              font-size: 36px;
              font-weight: bold;
            }

            .footer {
              margin-top: 30px;
              text-align: center;
              font-size: 12px;
              color: #8A7C6A;
            }

            @media print {
              body {
                background: white;
                padding: 0;
              }

              .receipt {
                max-width: 100%;
                padding: 20px;
              }
            }
          </style>
        </head>

        <body>
          <div class="receipt">

            <div class="header">
              <div class="brand">
                <h1>Craveit</h1>
                <p>Rider Earnings Payment Receipt</p>
              </div>

              <div class="paid">
                Paid
              </div>
            </div>

            <div class="title">
              <h2>Earnings Receipt</h2>
              <p>
                Order #${order?.orderNumber || order?._id?.slice(-8)}
              </p>
            </div>

            <table class="details">
              <tr>
                <td>Restaurant</td>
                <td><strong>${restaurantName}</strong></td>
              </tr>

              <tr>
                <td>Customer</td>
                <td><strong>${customerName}</strong></td>
              </tr>

              <tr>
                <td>Order Date</td>
                <td>${formatDateTime(order?.updatedAt || order?.createdAt)}</td>
              </tr>

              <tr>
                <td>Payment Date</td>
                <td>${formatDateTime(paidDate)}</td>
              </tr>

              <tr>
                <td>Payment Status</td>
                <td><strong>PAID</strong></td>
              </tr>

              <tr>
                <td>Payment Method</td>
                <td>Admin Settlement</td>
              </tr>
            </table>

            <div class="amount-box">
              <p>Total Rider Earnings</p>
              <div class="amount">
                ₹${deliveryEarning.toLocaleString("en-IN")}
              </div>
            </div>

            <div class="footer">
              <p>This is a system generated payment receipt.</p>
              <p>Thank you for delivering with Craveit.</p>
            </div>

          </div>

          <script>
            window.onload = function () {
              window.print();
            };
          </script>
        </body>
      </html>
    `);

    receiptWindow.document.close();

    toast.success("Payment receipt opened");
  };

  // Loading
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <FaSpinner className="animate-spin text-3xl text-[#E8491D]" />

          <p className="text-xs font-bold uppercase tracking-widest text-[#8A7C6A]">
            Loading Order History
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="pb-10">
      {/* Header */}

      <section className="mb-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8491D]">
            Delivery Records
          </p>

          <h1 className="mt-1 font-[Archivo_Black] text-2xl uppercase text-[#1F1811] sm:text-3xl">
            Order History
          </h1>

          <p className="mt-2 text-sm text-[#8A7C6A]">
            Track your completed deliveries and delivery earnings.
          </p>
        </div>
      </section>

      {/* Stats */}

      <section className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <HistoryStat
          label="Total Orders"
          value={stats?.totalOrders || 0}
          icon={FaBagShopping}
          color="bg-[#1F1811]"
        />

        <HistoryStat
          label="Delivered"
          value={stats?.delivered || 0}
          icon={FaCircleCheck}
          color="bg-[#6B8E4E]"
        />

        <HistoryStat
          label="Cancelled"
          value={stats?.cancelled || 0}
          icon={FaCircleXmark}
          color="bg-[#E8491D]"
        />

        <HistoryStat
          label="Damaged"
          value={stats?.damaged || 0}
          icon={FaTriangleExclamation}
          color="bg-[#D9952B]"
        />
      </section>

      {/* Total Earnings */}

      <section className="mb-6 bg-[#1F1811] px-5 py-5">
        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
          Total Earnings
        </p>

        <div className="mt-1 flex items-center text-3xl font-[Archivo_Black] text-[#FBF3E7]">
          <FaIndianRupeeSign className="text-xl text-[#E8491D]" />

          {Number(stats?.totalEarnings || 0).toLocaleString("en-IN")}
        </div>
      </section>

      {/* Order List */}

      <section className="bg-white">
        {/* Section Header */}

        <div className="flex items-center justify-between border-b border-[#1F1811]/10 p-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
              Past Deliveries
            </p>

            <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase text-[#1F1811]">
              Delivery History
            </h2>
          </div>

          <span className="bg-[#FBF3E7] px-3 py-2 text-[10px] font-bold text-[#1F1811]">
            {orders.length} ORDERS
          </span>
        </div>

        {/* Empty State */}

        {orders.length === 0 ? (
          <div className="flex min-h-80 flex-col items-center justify-center px-5 text-center">
            <div className="flex size-16 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
              <FaBagShopping className="text-2xl" />
            </div>

            <h3 className="mt-4 font-[Archivo_Black] text-lg uppercase text-[#1F1811]">
              No Order History
            </h3>

            <p className="mt-2 text-sm text-[#8A7C6A]">
              Your completed delivery orders will appear here.
            </p>
          </div>
        ) : (
          <div>
            {orders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;

              const isDelivered = order.status === "delivered";

              const restaurantName = getRestaurantName(order);
              const customerName = getCustomerName(order);
              const customerAddress = getCustomerAddress(order);
              const foodItems = getFoodItems(order);

              const orderAmount = Number(order?.orderValue?.total || 0);

              const deliveryEarning = Number(order?.deliveryEarning || 0);

              const paymentInfo = getPaymentStatus(order);

              return (
                <div
                  key={order._id}
                  className="border-b border-dashed border-[#1F1811]/10 p-5 last:border-none"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    {/* Left Side */}

                    <div className="flex min-w-0 flex-1 gap-4">
                      {/* Icon */}

                      <div className="flex size-12 shrink-0 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
                        <FaUtensils />
                      </div>

                      {/* Details */}

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                            Order #{order?.orderNumber || order?._id?.slice(-8)}
                          </p>

                          <span
                            className={`flex items-center gap-1.5 px-2 py-1 text-[8px] font-bold uppercase tracking-wide ${statusConfig.className}`}
                          >
                            <StatusIcon />

                            {statusConfig.label}
                          </span>
                        </div>

                        {/* Restaurant */}

                        <h3 className="mt-2 text-base font-bold text-[#1F1811]">
                          {restaurantName}
                        </h3>

                        {/* Food */}

                        <p className="mt-1 line-clamp-1 text-xs text-[#8A7C6A]">
                          {foodItems}
                        </p>

                        {/* Customer */}

                        <p className="mt-2 text-[10px] font-semibold text-[#5F5143]">
                          Customer: {customerName}
                        </p>

                        {/* Address + Date */}

                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                          <div className="flex items-center gap-2 text-[10px] font-semibold text-[#5F5143]">
                            <FaLocationDot className="text-[#E8491D]" />

                            <span className="max-w-50 truncate">
                              {customerAddress}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-[10px] font-semibold text-[#5F5143]">
                            <FaClock className="text-[#E8491D]" />

                            {formatDateTime(
                              order?.updatedAt || order?.createdAt,
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side */}

                    <div className="flex shrink-0 flex-col gap-3 border-t border-[#1F1811]/10 pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                      <div className="flex items-center justify-between gap-5">
                        {/* Order Value */}

                        <div className="text-left lg:text-right">
                          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#8A7C6A]">
                            Order Value
                          </p>

                          <p className="mt-1 text-sm font-bold text-[#1F1811]">
                            {formatCurrency(orderAmount)}
                          </p>
                        </div>

                        {/* Earnings */}

                        {isDelivered ? (
                          <div className="min-w-35 bg-[#6B8E4E] px-5 py-4 text-right">
                            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-white/70">
                              Your Earning
                            </p>

                            <div className="mt-1 flex items-center justify-end font-[Archivo_Black] text-3xl text-white">
                              <FaIndianRupeeSign className="text-lg" />

                              {deliveryEarning.toLocaleString("en-IN")}
                            </div>

                            <p className="mt-1 text-[8px] font-bold uppercase tracking-wide text-white/60">
                              Delivery Payment
                            </p>
                          </div>
                        ) : (
                          <div className="min-w-35 bg-[#FBF3E7] px-5 py-4 text-center">
                            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#8A7C6A]">
                              No Payment
                            </p>

                            <p className="mt-1 text-lg font-bold text-[#1F1811]">
                              ₹0
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Payment Status */}

                      {isDelivered && (
                        <div className="flex items-center justify-between gap-3">
                          {checkingPayments && !paymentStatuses[order._id] ? (
                            <div className="flex items-center gap-2 px-3 py-2 text-[10px] font-bold uppercase text-[#8A7C6A]">
                              <FaSpinner className="animate-spin" />
                              Checking Payment
                            </div>
                          ) : paymentInfo.isPaid ? (
                            <>
                              <span className="inline-flex items-center gap-2 bg-[#6B8E4E]/10 px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-[#6B8E4E]">
                                <FaCircleCheck />
                                Payment Paid
                              </span>

                              <button
                                type="button"
                                onClick={() => downloadReceipt(order)}
                                className="inline-flex cursor-pointer items-center gap-2 bg-[#1F1811] px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-[#FBF3E7] transition hover:bg-[#E8491D]"
                              >
                                <FaDownload />
                                Receipt
                              </button>
                            </>
                          ) : (
                            <span className="inline-flex items-center gap-2 bg-[#D9952B]/10 px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-[#D9952B]">
                              <FaClock />
                              Payment Pending
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

/* History Stat */

const HistoryStat = ({ label, value, icon: Icon, color }) => {
  return (
    <div className="bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between">
        <div
          className={`flex size-9 items-center justify-center text-white ${color}`}
        >
          <Icon className="text-xs" />
        </div>

        <span className="font-[Archivo_Black] text-2xl text-[#1F1811]">
          {value}
        </span>
      </div>

      <p className="mt-4 text-[9px] font-bold uppercase tracking-[0.14em] text-[#8A7C6A]">
        {label}
      </p>
    </div>
  );
};

export default RiderOrderHistory;
