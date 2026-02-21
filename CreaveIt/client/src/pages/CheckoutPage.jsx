import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../config/Api";
import { useAuth } from "../context/AuthContext";
import { AiOutlineSafety } from "react-icons/ai";
import { LuUser } from "react-icons/lu";
import gatewayImg from "../assets/gateway.avif";
import { FaMinus, FaPlus, FaPhoneAlt, FaTrashAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { CiMapPin } from "react-icons/ci";

const PromoCode = {
  NEW50: 50,
  SAVE20: 20,
  CRAVE10: 10,
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { isLogin, user, role } = useAuth();
  const [loginButtonClicked, setLoginButtonClicked] = useState(false);
  const [signupButtonClicked, setSignupButtonClicked] = useState(false);
  const [isProcessing, setIsprocessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState();
  const [promoCode, setPromoCode] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(false);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("CraveIt Cart")),
  );

  useEffect(() => {
    if (!cart || cart.cartItem.length === 0) {
      toast.error("Cart is empty or session expired");
      navigate("/order");
    }
  }, []);

  // const handleQuantityChange = (itemId, change) => {
  //   setCart((prev) => {
  //     const updatedItems = prev.cartItem.map((item) => {
  //       if (item._id === itemId) {
  //         const newQuantity = Math.max(1, item.quantity + change);
  //         return { ...item, quantity: newQuantity };
  //       }
  //       return item;
  //     });

  //     const newTotal = updatedItems.reduce(
  //       (sum, item) => sum + item.price * item.quantity,
  //       0
  //     );

  //     return { ...prev, cartItem: updatedItems, cartValue: newTotal };
  //   });
  // };

  // const handleRemoveItem = (itemId) => {
  //   setCart((prev) => {
  //     const itemToRemove = prev.cartItem.find((item) => item._id === itemId);
  //     const newTotal =
  //       prev.cartValue - itemToRemove.price * itemToRemove.quantity;
  //     const updatedItems = prev.cartItem.filter((item) => item._id !== itemId);

  //     if (updatedItems.length === 0) {
  //       toast.error("Cart is now empty!");
  //       navigate("/order-now");
  //       return prev;
  //     }

  //     return { ...prev, cartItem: updatedItems, cartValue: newTotal };
  //   });
  // };

  const handlePlaceOrder = async () => {
    if (!user || !cart) {
      toast.error("Session expired. Please login again.");
      navigate("/login");
      return;
    }
    setIsprocessing(true);

    //Payment gateway call

    const payload = GeneratePayload();
    console.log(payload);

    try {
      const res = await api.post("/user/placeorder", payload);
      toast.success(res.data.message);
      localStorage.removeItem("CraveIt Cart");
      navigate("/user-dashboard", { state: { tab: "order" } });
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error(error?.response?.data?.message || "Failed to place message");
    } finally {
      setIsprocessing(false);
    }
  };

  const SURGE_CHARGE = 0.05;
  const DELIVERY_CHARGE = 50;
  const GST = 0.18;

  const calculatePrices = () => {
    const subTotal = cart?.cartValue || 0;
    const gst = subTotal * GST;
    const surgeCharge = subTotal >= 499 ? 0 : subTotal * SURGE_CHARGE;
    const total =
      subTotal + gst + surgeCharge + (subTotal >= 499 ? 0 : DELIVERY_CHARGE);
    return { subTotal, gst, surgeCharge, total };
  };

  const handlePromoCodeApply = () => {
    const discountPercent = PromoCode[promoCode.toUpperCase()];
    if (discountPercent) {
      const { subtotal } = calculatePrices();
      const discountAmount = (subTotal * discountPercent) / 100;
      const newSubTotal = subTotal - discountAmount;

      console.log("Applying promo code:", {
        promoCode,
        discountPercent,
        discountAmount,
        oldSubTotal: subtotal,
        newSubTotal: newSubTotal,
      });
      setCart((prev) => ({
        ...prev,
        cartValue: newSubTotal,
      }));
      toast.success(
        `Promo code applied! You saved ₹${discountAmount.toFixed(2)}`,
      );
      setAppliedPromo(true);
    } else {
      toast.error("Invalid promo code");
    }
  };

  // if (!user || !cart) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <div className="text-xl text-gray-600">Loading...</div>
  //     </div>
  //   );
  // }

  const GeneratePayload = () => {
    const { subtotal, tax, total } = calculatePrices();
    return {
      restaurantId: cart.resturantID,
      userId: user._id,
      items: [...cart.cartItem],
      orderValue: {
        subtotal,
        tax,
        total,
        discountType: promoCode,
        deliveryFee: 50,
        discountPercentage: PromoCode[promoCode],
        paymentMethod,
      },
      status: "pending",
      review: {},
    };
  };

  const { subTotal, gst, surgeCharge, total } = calculatePrices();

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4 ">
        <div>
          <div className="max-w-110 mx-auto">
            <div className="flex flex-col items-center space-y-1">
              <div className="text-3xl p-2 h-14 w-14 rounded-[50%] bg-white text-(--color-primary)">
                <div className="flex flex-col justify-between items-center text-green-700">
                  <AiOutlineSafety />
                  <p className="text-[10px]">Secure</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-(--color-secondary)">
                CHECKOUT
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 p-10 gap-8">
          {/* Left Order Detail Section */}

          <div className="lg:col-span-2">
            <div className="space-y-10">
              {/* checking if login or not?? */}

              {isLogin ? (
                // Order Item Section

                <div className="rounded shadow p-7 bg-white">
                  <div className="mb-5">
                    <h1 className="text-4xl font-bold text-(--color-primary)">
                      Order Checkout
                    </h1>
                    <p className="text-gray-600 mt-2">
                      Review your order and complete the payment
                    </p>
                  </div>

                  {/* Order Sectin */}

                  <div className="space-y-4">
                    {cart?.cartItem?.length > 0 ? (
                      cart.cartItem.map((item, idx) => (
                        <div className="border-b">
                          <div
                            key={idx}
                            className="flex gap-4 pb-4 hover:bg-gray-50 p-3 rounded transition"
                          >
                            {/* item image */}

                            <div className="shrink-0">
                              <img
                                src={item?.images?.[0]?.url || "🍔"}
                                alt=""
                                className="w-32 h-full object-cover rounded-lg"
                              />
                            </div>

                            {/* Order details */}

                            <div className="flex-1">
                              <h1 className="text-lg text-(--color-primary) font-bold">
                                {item.itemName}
                              </h1>
                              <p className="text-sm text-gray-600 mt-1 capitalize">
                                {item.cuisine} • {item.type}
                              </p>
                              <div className="flex gap-2 mt-2">
                                <span className="text-sm bg-blue-100 text-blue-800 rounded py-1 px-2">
                                  {item.servingSize} persons
                                </span>
                                <span className="text-sm bg-purple-100 text-purple-800 rounded py-1 px-2">
                                  {item.preparationTime} minutes
                                </span>
                              </div>
                              <div className="text-lg font-semibold text-green-600 mt-2">
                                ₹ {item.price}
                              </div>
                            </div>

                            <div className="flex flex-col justify-between items-end">
                              <button
                                className="text-red-600 cursor-pointer"
                                title="Remove item"
                              >
                                <FaTrashAlt />
                              </button>

                              <div className="flex items-center border rounded overflow-hidden text-(--color-primary)">
                                <button className="p-2 hover:bg-gray-100 transition cursor-pointer">
                                  <FaMinus className="text-xs" />
                                </button>
                                <span className="px-4 font-bold text-lg w-12 text-center">
                                  {item.quantity}
                                </span>
                                <button className="p-2 hover:bg-gray-100 transition cursor-pointer">
                                  <FaPlus className="text-xs" />
                                </button>
                              </div>

                              <div>
                                <p className="text-sm text-gray-600 text-end">
                                  Subtotal
                                </p>
                                <p className="text-lg font-bold text-(--color-primary)">
                                  ₹ {(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      // <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-orange-100 px-4">
                      //   <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg w-full text-center border border-gray-100">
                      //     {/* Icon */}
                      //     <div className="text-7xl mb-4">🛒</div>

                      //     {/* Heading */}
                      //     <h1 className="text-3xl font-extrabold text-gray-800">
                      //       Your Cart is Empty
                      //     </h1>

                      //     {/* Description */}
                      //     <p className="text-gray-600 mt-3 text-lg">
                      //       Looks like you haven’t added anything yet. Explore
                      //       restaurants and order your favorite food 🍕🍔
                      //     </p>

                      //     {/* Buttons */}
                      //     <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                      //       <button
                      //         className="px-6 py-3 rounded-xl bg-(--color-secondary) text-white font-bold hover:bg-(--color-secondary-hover) transition shadow-md cursor-pointer"
                      //         o
                      //       >
                      //         Explore Restaurants
                      //       </button>

                      //       <button
                      //         className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-bold hover:bg-gray-100 transition cursor-pointer"

                      //       >
                      //         Go to Home
                      //       </button>
                      //     </div>

                      //     {/* Small Note */}
                      //     <p className="text-sm text-gray-500 mt-6">
                      //       Need help? Contact our support team anytime 💬
                      //     </p>
                      //   </div>
                      // </div>

                      <div className="text-center py-8">
                        <p className="text-gray-600 text-lg">
                          Your cart is empty
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Login or signup section if not login

                <div className=" flex justify-between items-center rounded shadow p-7 bg-white">
                  <div className="space-y-5 ">
                    <div>
                      <h1 className="text-xl font-bold">Account</h1>
                      <p className="text-gray-500">
                        To place your order now, log in to your existing account
                        or sign up.
                      </p>
                    </div>
                    <div className="flex gap-10">
                      {!loginButtonClicked && !signupButtonClicked && (
                        <button
                          className="border py-2 px-6 border-(--color-secondary) rounded cursor-pointer hover:shadow-xl"
                          onClick={() => setLoginButtonClicked(true)}
                        >
                          <div className="text-sm font-semibold text-(--color-secondary)">
                            Have an Account?
                          </div>
                          <div className="text-sm font-semibold text-(--color-secondary)">
                            LOGIN NOW
                          </div>
                        </button>
                      )}
                      {loginButtonClicked && (
                        <div className="space-y-5 w-3/4">
                          <div className="relative">
                            <LuUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                              type="text"
                              name="email"
                              placeholder="Enter you registered email "
                              // value={detail.email}
                              // onChange={handleChange}
                              // disabled={isLoading}
                              required
                              className="w-full h-fit px-10 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                            />
                          </div>

                          <div className="flex justify-end">
                            <button
                              type="submit"
                              className="flex items-center justify-center bg-(--color-secondary) font-bold py-2 px-4 rounded-lg hover:bg-(--color-secondary-hover) transition  shadow-lg cursor-pointer w-fit disabled:cursor-not-allowed disabled:bg-(--color-secondary) text-white"
                            >
                              <span className="flex items-center gap-2">
                                GET OTP
                              </span>
                            </button>
                          </div>
                        </div>
                      )}
                      {!loginButtonClicked && !signupButtonClicked && (
                        <button
                          className="border py-2 px-6 bg-(--color-secondary) border-(--color-secondary) rounded cursor-pointer hover:shadow-xl"
                          onClick={() => setSignupButtonClicked(true)}
                        >
                          <div className="text-sm font-semibold text-white">
                            New to CraveIt?
                          </div>
                          <div className="text-sm font-semibold text-white">
                            SIGN UP
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                  <div>
                    <img src={gatewayImg} alt="" className="w-36 h-36" />
                  </div>
                </div>
              )}

              {/* Adrress section */}

              {isLogin ? (
                <div className="space-y-5 rounded shadow p-7 bg-white">
                  <h1 className="text-2xl font-bold text-(--color-primary)">
                    Delivery Address
                  </h1>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <div className="font-bold text-lg text-(--color-primary)">
                      {user.fullName}
                    </div>
                    <p className="text-gray-700 mt-2 flex gap-2 items-center">
                      <MdLocationOn className="text-green-400" />
                      {user.address}
                    </p>
                    <p className="text-gray-700 flex gap-2 items-center">
                      <CiMapPin className="text-blue-600" />
                      {user.city}, {user.pin}
                    </p>
                    <p className="text-gray-700 mt-2 flex gap-2 items-center">
                      <FaPhoneAlt className="text-red-400 text-sm" />
                      {user.phone}
                    </p>

                    {/* Edit Address Button if login */}
                    <button
                      onClick={() =>
                        navigate("/user-dashboard", {
                          state: { tab: "profile" },
                        })
                      }
                      className="mt-4 py-2 text-blue-600 hover:text-blue-800 font-semibold transition cursor-pointer"
                    >
                      ✎ Edit Address
                    </button>
                  </div>
                </div>
              ) : (
                // add user address in new login case
                <div>
                  <div className="space-y-5 rounded shadow p-7 bg-white">
                    <h1 className="text-2xl font-bold text-(--color-primary)">
                      Delivery Address
                    </h1>
                    <div className="text-gray-600">
                      Login as customer to access your Saved Address.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Section : Payment Gateway */}

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md sticky top-20 p-7">
              <div className=" space-y-3 ">
                <h2 className="text-xl text-(--color-primary) font-bold mb-6">
                  Price Details
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="font-semibold">
                      ₹ {subTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">GST (18%)</span>
                  <span className="font-semibold">₹ {gst.toFixed(2)}</span>
                </div>
                {surgeCharge === 0 ? (
                  ""
                ) : (
                  <div className="flex justify-between">
                    <div className="">
                      <div className="text-gray-700">Surge charge</div>
                      <div className="text-gray-500 text-[10px]">
                        No surge charge for Order above ₹ 499
                      </div>
                    </div>
                    <span className="font-semibold">
                      ₹ {surgeCharge.toFixed(2)}
                    </span>
                  </div>
                )}
                {DELIVERY_CHARGE && (
                  <div className="flex justify-between">
                    <span className="text-gray-700">Delivery Charge</span>
                    <span className="font-semibold">
                      ₹ {DELIVERY_CHARGE.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="border-t pt-4 flex justify-between">
                  <span className="text-lg font-bold text-(--color-primary)">
                    Total Amount
                  </span>
                  <span className="text-2xl font-bold text-(--color-secondary)">
                    ₹ {total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Promo Code Section */}
              <div className=" mt-3 mb-6">
                <h3 className="font-bold mb-3 text-(--color-primary)">
                  Promo Code
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="promo"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 border rounded px-3 py-2 focus:outline-none border-(--color-secondary) "
                    disabled={appliedPromo}
                  />
                  <button
                    className="text-white px-4 py-2 rounded hover:opacity-90 transition bg-(--color-secondary) cursor-pointer"
                    onClick={handlePromoCodeApply}
                    disabled={appliedPromo}
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Payment method selection */}

              <div className=" border-t pt-6 mb-6">
                <h2 className="text-xl text-(--color-primary) font-bold mb-6">
                  Payment Method
                </h2>

                {/* It is hard coded will integrate Payment gateway API later*/}
                <div className="space-y-3">
                  {[
                    { id: "credit-card", label: "💳 Credit/Debit Card" },
                    { id: "upi", label: "📱 UPI" },
                    { id: "wallet", label: "👛 Digital Wallet" },
                    { id: "cod", label: "🏠 Cash on Delivery" },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="ml-3 text-gray-700">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* place order button */}

              <button
                className="w-full bg-(--color-secondary) text-white font-bold py-2 rounded cursor-pointer hover:opacity-90 transition disabled:opacity-50"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
              >
                Place Order
              </button>

              {/* Continue Shopping */}

              <div className="text-center">
                <button
                  className="mt-2 text-blue-600 font-semibold py-2 rounded-lg hover:text-blue-800 transition cursor-pointer"
                  onClick={() => navigate(-1)}
                >
                  ← Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
