import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaXmark,
  FaMinus,
  FaPlus,
  FaTrash,
  FaArrowRight,
  FaCartShopping,
} from "react-icons/fa6";
import { useCart } from "../context/CartContext";

const CartSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const {
    cart,
    cartCount,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    if (!cart?.cartItem?.length) return;

    onClose();
    navigate("/checkout");
  };

  const totalItems = cartCount;

  // Block Screen scroll if cart sidebar component is open
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-60 bg-[#1F1811]/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 z-70 flex h-screen w-full max-w-md flex-col bg-[#FBF3E7] shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-dashed border-[#1F1811]/20 px-5 py-5">
          <div>
            <p className="font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
              Your order
            </p>

            <h2 className="mt-1 font-[Archivo_Black] text-2xl uppercase text-[#1F1811]">
              CART
              {totalItems > 0 && (
                <span className="ml-2 text-[#E8491D]">({totalItems})</span>
              )}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="flex size-10 cursor-pointer items-center justify-center border border-[#1F1811]/15 text-[#1F1811] transition-colors hover:bg-[#1F1811] hover:text-[#FBF3E7]"
          >
            <FaXmark />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {!cart?.cartItem?.length ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex size-16 items-center justify-center bg-[#F3E9DB] text-[#E8491D]">
                <FaCartShopping className="text-2xl" />
              </div>

              <h3 className="mt-5 font-[Archivo_Black] text-xl uppercase text-[#1F1811]">
                YOUR CART IS EMPTY
              </h3>

              <p className="mt-2 max-w-xs text-sm leading-6 text-[#8A7C6A]">
                Looks like you haven't added anything delicious yet.
              </p>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate("/restaurants");
                }}
                className="mt-6 inline-flex cursor-pointer items-center gap-2 bg-[#E8491D] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#FBF3E7] transition-colors hover:bg-[#cf3d16]"
              >
                Explore food
                <FaArrowRight />
              </button>
            </div>
          ) : (
            <div className="divide-y divide-dashed divide-[#1F1811]/15">
              {cart.cartItem.map((item) => (
                <div key={item._id} className="flex gap-4 py-5">
                  {/* Image */}
                  <div className="size-20 shrink-0 overflow-hidden bg-[#F3E9DB]">
                    <img
                      src={item?.images?.[0]?.url}
                      alt={item.itemName}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-[Archivo_Black] text-sm uppercase text-[#1F1811]">
                          {item.itemName}
                        </p>

                        {item.cuisine && (
                          <p className="mt-1 truncate text-xs text-[#8A7C6A]">
                            {item.cuisine}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item._id)}
                        aria-label={`Remove ${item.itemName}`}
                        className="cursor-pointer text-[#8A7C6A] transition-colors hover:text-[#E8491D]"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center border border-[#1F1811]/15">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item._id)}
                          className="flex size-8 cursor-pointer items-center justify-center text-xs text-[#1F1811] transition-colors hover:bg-[#F3E9DB]"
                        >
                          <FaMinus />
                        </button>

                        <span className="flex h-8 min-w-8 items-center justify-center border-x border-[#1F1811]/15 px-2 text-xs font-bold text-[#1F1811]">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item._id)}
                          className="flex size-8 cursor-pointer items-center justify-center text-xs text-[#1F1811] transition-colors hover:bg-[#F3E9DB]"
                        >
                          <FaPlus />
                        </button>
                      </div>

                      <p className="font-[Archivo_Black] text-base text-[#1F1811]">
                        ₹{Number(item.price) * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart?.cartItem?.length > 0 && (
          <div className="border-t border-dashed border-[#1F1811]/20 bg-white px-5 py-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="font-[JetBrains_Mono] text-[9px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                  Total amount
                </p>

                <p className="mt-1 font-[Archivo_Black] text-2xl text-[#1F1811]">
                  ₹{cart.cartValue}
                </p>
              </div>

              <button
                type="button"
                onClick={clearCart}
                className="cursor-pointer text-xs font-bold uppercase tracking-wider text-[#E8491D] transition-colors hover:text-[#1F1811]"
              >
                Clear cart
              </button>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 bg-[#E8491D] px-5 py-4 text-xs font-bold uppercase tracking-wider text-[#FBF3E7] transition-colors hover:bg-[#cf3d16]"
            >
              Proceed to checkout
              <FaArrowRight />
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartSidebar;
