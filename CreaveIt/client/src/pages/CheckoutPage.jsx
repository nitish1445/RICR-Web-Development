import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../config/Api";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

import CheckoutHeader from "../components/checkout/CheckoutHeader";
import DeliveryAddress from "../components/checkout/DeliveryAddress";
import PaymentMethod from "../components/checkout/PaymentMethod";
import OrderSummary from "../components/checkout/OrderSummary";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [placingOrder, setPlacingOrder] = useState(false);

  const hasValidAddress =
    user?.address &&
    user.address !== "N/A" &&
    user.address.trim() !== "" &&
    user?.city &&
    user.city !== "N/A" &&
    user.city.trim() !== "" &&
    user?.pin &&
    user.pin !== "N/A" &&
    user.pin.trim() !== "";

  const subtotal =
    cart?.cartItem?.reduce(
      (total, item) => total + Number(item.price) * Number(item.quantity || 1),
      0,
    ) || 0;

  const deliveryFee = subtotal > 149 ? 0 : 49;
  const total = subtotal + deliveryFee;

  // const handlePlaceOrder = async () => {
  //   if (!cart?.cartItem?.length) {
  //     toast.error("Your cart is empty");
  //     navigate("/restaurants");
  //     return;
  //   }

  //   if (!hasValidAddress) {
  //     toast.error("Please update your delivery address first");
  //     navigate("/user-dashboard");
  //     return;
  //   }

  //   setPlacingOrder(true);

  //   try {
  //     const orderData = {
  //       restaurantID: cart.restaurantID,
  //       orderItems: cart.cartItem.map((item) => ({
  //         menuItemID: item._id,
  //         quantity: Number(item.quantity || 1),
  //       })),
  //       customerDetails: {
  //         fullName: user.fullName,
  //         email: user.email,
  //         phone: user.phone,
  //         address: user.address,
  //         city: user.city,
  //         pin: user.pin,
  //       },
  //       paymentMethod,
  //       subtotal,
  //       deliveryFee,
  //       totalAmount: total,
  //     };

  //     console.log("Order Data Packed : ", orderData);
  //     // const res = await api.post("/customer/createOrder", orderData);
  //     // toast.success(res?.data?.message || "Order placed successfully!");
  //     clearCart();
  //     navigate("/user-dashboard");
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(
  //       error?.response?.data?.message || "Unable to place your order",
  //     );
  //   } finally {
  //     setPlacingOrder(false);
  //   }
  // };

  const handlePlaceOrder = async () => {
    if (!cart?.cartItem?.length) {
      toast.error("Your cart is empty");
      navigate("/restaurants");
      return;
    }

    if (!hasValidAddress) {
      toast.error("Please update your delivery address first");
      navigate("/user-dashboard");
      return;
    }

    setPlacingOrder(true);

    try {
      const orderData = {
        restaurantID: cart.restaurantID,
        orderItems: cart.cartItem.map((item) => ({
          menuItemID: item._id,
          quantity: Number(item.quantity || 1),
        })),

        customerDetails: {
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          address: user.address,
          city: user.city,
          pin: user.pin,
        },

        paymentMethod,
        subtotal,
        deliveryFee,
        totalAmount: total,
      };
      console.log("Order Data Packed:", orderData);

      // CASH ON DELIVERY
      if (paymentMethod === "COD") {
        const res = await api.post("/user/placeorder", orderData);

        toast.success(res?.data?.message || "Order placed successfully!");

        clearCart();
        navigate("/user-dashboard");
        return;
      }

      // =========================
      // ONLINE PAYMENT
      // Razorpay integration later
      // =========================
      if (paymentMethod === "ONLINE") {
        toast("Online payment will be available soon");

        // Future Razorpay flow will come here
        /*
        1. Create Razorpay order from backend
        2. Open Razorpay checkout
        3. Verify payment
        4. Create final order
        5. Clear cart
        6. Navigate to orders
      */

        return;
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Unable to place your order",
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  if (!cart?.cartItem?.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FBF3E7] px-4">
        <div className="text-center">
          <h2 className="text-2xl font-black text-[#1F1811]">
            YOUR CART IS EMPTY
          </h2>

          <button
            type="button"
            onClick={() => navigate("/restaurants")}
            className="mt-5 cursor-pointer bg-[#E8491D] px-5 py-3 text-sm font-bold text-[#FBF3E7]"
          >
            Explore Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF3E7] pb-12">
      <CheckoutHeader />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <DeliveryAddress user={user} hasValidAddress={hasValidAddress} />

            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          </div>

          <OrderSummary
            cart={cart}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            total={total}
            paymentMethod={paymentMethod}
            placingOrder={placingOrder}
            onPlaceOrder={handlePlaceOrder}
            hasValidAddress={hasValidAddress}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
