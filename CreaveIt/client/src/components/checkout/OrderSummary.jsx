import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const OrderSummary = ({
  cart,
  subtotal,
  deliveryFee,
  total,
  paymentMethod,
  placingOrder,
  onPlaceOrder,
  hasValidAddress
}) => {
  return (
    <aside className="h-fit bg-[#1F1811] p-5 text-[#FBF3E7] shadow-[0_15px_40px_-20px_rgba(31,24,17,0.5)] lg:sticky lg:top-5 sm:p-6">
      <div className="border-b border-dashed border-[#FBF3E7]/20 pb-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
          Your order
        </p>

        <h2 className="mt-1 font-[Archivo_Black] text-xl">ORDER SUMMARY</h2>
      </div>

      {/* Cart Items */}
      <div className="divide-y divide-dashed divide-[#FBF3E7]/15">
        {cart?.cartItem?.map((item) => (
          <div key={item._id} className="flex items-center gap-3 py-4">
            <div className="size-14 shrink-0 overflow-hidden bg-[#FBF3E7]/10">
              <img
                src={item?.images?.[0]?.url}
                alt={item?.itemName}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/200x200?text=Food";
                }}
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{item?.itemName}</p>

              <p className="mt-1 text-xs text-[#C9BEB0]">
                Qty: {item?.quantity || 1}
              </p>
            </div>

            <p className="text-sm font-bold text-[#E8491D]">
              ₹{Number(item?.price || 0) * Number(item?.quantity || 1)}
            </p>
          </div>
        ))}
      </div>

      {/* Price Details */}
      <div className="mt-4 space-y-2 border-t border-dashed border-[#FBF3E7]/20 pt-4 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between text-[#C9BEB0]">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        {/* Delivery Fee */}
        <div className="flex justify-between text-[#C9BEB0]">
          <span>Delivery Fee</span>

          {deliveryFee === 0 ? (
            <span className="flex items-center gap-2">
              <span className="text-[#C9BEB0] line-through">₹50</span>
              <span className="font-bold text-[#6B8E4E]">FREE</span>
            </span>
          ) : (
            <span>₹{deliveryFee}</span>
          )}
        </div>

        {/* Total */}
        <div className="flex justify-between border-t border-dashed border-[#FBF3E7]/20 pt-4 text-base font-black text-[#FBF3E7]">
          <span>Total</span>

          {deliveryFee === 0 ? (
            <span className="flex items-center gap-2">
              <span className="text-sm text-[#C9BEB0] line-through">
                ₹{total + 50}
              </span>

              <span className="text-[#E8491D]">₹{total}</span>
            </span>
          ) : (
            <span className="text-[#E8491D]">₹{total}</span>
          )}
        </div>

        {/* Free Delivery Message */}
        {deliveryFee === 0 && (
          <p className="-mt-1 text-right text-[11px] font-semibold text-[#6B8E4E]">
            You saved ₹50 on delivery
          </p>
        )}
      </div>

      {/* Payment */}
      <div className="mt-5 border-t border-dashed border-[#FBF3E7]/20 pt-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#C9BEB0]">
          Payment method
        </p>

        <p className="mt-1 text-sm font-bold">
          {paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment"}
        </p>
      </div>

      {/* Place Order */}
      <button
        type="button"
        onClick={onPlaceOrder}
        disabled={placingOrder || !hasValidAddress}
        className="mt-6 flex w-full items-center justify-center gap-2 bg-[#E8491D] px-5 py-4 text-sm font-black uppercase tracking-wide text-[#FBF3E7] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
      >
        {placingOrder
          ? "Placing Order..."
          : !hasValidAddress
            ? "Address Required"
            : "Place Order"}

        {!placingOrder && hasValidAddress && (
          <FaArrowRight className="text-xs" />
        )}
      </button>

      {/* Address Required Message */}
      {!hasValidAddress && (
        <p className="mt-2 text-center text-xs leading-5 text-[#E8491D]">
          Delivery address required to place order.
        </p>
      )}
    </aside>
  );
};

export default OrderSummary;
