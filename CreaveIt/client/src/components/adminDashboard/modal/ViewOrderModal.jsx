import { useEffect } from "react";
import {
  FaBagShopping,
  FaLocationDot,
  FaMotorcycle,
  FaReceipt,
  FaUtensils,
  FaXmark,
} from "react-icons/fa6";

const ViewOrderModal = ({ order, onClose, formatDate, getStatusStyle }) => {
  // Lock background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const status = getStatusStyle(order.status);
  const StatusIcon = status.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-[#FBF3E7] shadow-2xl">
        {/* Modal Header */}

        <div className="flex items-center justify-between bg-[#1F1811] p-5 sm:p-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
              Order Details
            </p>

            <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase text-[#FBF3E7]">
              #{order.orderNumber}
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

        <div className="p-5 sm:p-6">
          {/* Status */}

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                Order Status
              </p>

              <p className="mt-1 text-sm text-[#5F5143]">
                Created on {formatDate(order.createdAt)}
              </p>
            </div>

            <span
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wide ${status.className}`}
            >
              <StatusIcon />
              {status.label}
            </span>
          </div>

          {/* Customer & Restaurant */}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white p-5">
              <div className="flex items-center gap-2">
                <FaBagShopping className="text-[#E8491D]" />

                <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                  Customer
                </h3>
              </div>

              <p className="mt-4 font-bold text-[#1F1811]">
                {order.userId?.fullName || "Unknown Customer"}
              </p>

              <p className="mt-1 text-sm text-[#8A7C6A]">
                {order.userId?.phone || "N/A"}
              </p>

              {order.deliveryAddress && (
                <div className="mt-4 flex items-start gap-2 text-sm text-[#5F5143]">
                  <FaLocationDot className="mt-1 shrink-0 text-[#E8491D]" />

                  <span>
                    {typeof order.deliveryAddress === "string"
                      ? order.deliveryAddress
                      : `${order.deliveryAddress?.address || ""} ${
                          order.deliveryAddress?.city || ""
                        }`}
                  </span>
                </div>
              )}
            </div>

            <div className="bg-white p-5">
              <div className="flex items-center gap-2">
                <FaUtensils className="text-[#E8491D]" />

                <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                  Restaurant
                </h3>
              </div>

              <p className="mt-4 font-bold text-[#1F1811]">
                {order.restaurantId?.restaurantName ||
                  order.restaurantId?.fullName ||
                  "Unknown Restaurant"}
              </p>

              <p className="mt-1 text-sm text-[#8A7C6A]">Restaurant Order</p>
            </div>
          </div>

          {/* Rider */}

          <div className="mt-4 bg-[#1F1811] p-5">
            <div className="flex items-center gap-2">
              <FaMotorcycle className="text-[#E8491D]" />

              <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                Delivery Rider
              </h3>
            </div>

            {order.riderId ? (
              <div className="mt-4 flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-[#FBF3E7]">
                    {order.riderId?.fullName || "Unknown Rider"}
                  </p>

                  <p className="mt-1 text-sm text-[#C9BEB0]">
                    {order.riderId?.phone || "N/A"}
                  </p>
                </div>

                <div className="flex size-11 items-center justify-center bg-[#E8491D] text-[#FBF3E7]">
                  <FaMotorcycle />
                </div>
              </div>
            ) : (
              <p className="mt-4 text-sm text-[#C9BEB0]">
                No rider assigned to this order.
              </p>
            )}
          </div>

          {/* Ordered Items */}

          <div className="mt-6">
            <div className="flex items-center gap-2">
              <FaReceipt className="text-[#E8491D]" />

              <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                Order Items
              </h3>
            </div>

            <div className="mt-3 divide-y divide-dashed divide-[#1F1811]/10 bg-white">
              {order.items?.length > 0 ? (
                order.items.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="flex items-center justify-between gap-4 p-4"
                  >
                    <div>
                      <p className="text-sm font-bold text-[#1F1811]">
                        {item.itemName ||
                          item.name ||
                          item.productId?.itemName ||
                          "Item"}
                      </p>

                      <p className="mt-1 text-xs text-[#8A7C6A]">
                        Quantity: {item.quantity || 1}
                      </p>
                    </div>

                    <p className="font-bold text-[#1F1811]">
                      ₹{item.price || item.total || item.productId?.price || 0}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-5 text-center text-sm text-[#8A7C6A]">
                  No items available
                </div>
              )}
            </div>
          </div>

          {/* Payment Summary */}

          <div className="mt-6 bg-white p-5">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
              Payment Summary
            </h3>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#8A7C6A]">Payment Method</span>

                <span className="font-semibold text-[#1F1811]">
                  {order.orderValue?.paymentMethod || "N/A"}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-[#8A7C6A]">Payment Status</span>

                <span className="font-semibold capitalize text-[#1F1811]">
                  {order.paymentStatus || "Pending"}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-dashed border-[#1F1811]/15 pt-3">
                <span className="font-bold text-[#1F1811]">Order Total</span>

                <span className="font-[Archivo_Black] text-xl text-[#E8491D]">
                  ₹{order.orderValue?.total || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Close */}

          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full cursor-pointer bg-[#1F1811] px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#FBF3E7] transition hover:bg-[#E8491D]"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderModal;
