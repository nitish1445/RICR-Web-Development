import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../config/Api";
import { useAuth } from "../context/AuthContext";
import { GoDotFill } from "react-icons/go";
import { FaTrashAlt } from "react-icons/fa";

const RestaurantDisplayMenu = () => {
  const navigate = useNavigate();
  const restaurantData = useLocation().state;

  const { isLogin, role } = useAuth();
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("CraveIt Cart")),
  );
  const [loading, setLoading] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [cartFlag, setCartFlag] = useState([]);

  const fetchMenuData = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `/public/restaurant/menu/${restaurantData._id}`,
      );
      setMenuItems(res.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unknown Error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (newItem) => {
    if (cart) {
      if (cart.restaurantID === newItem.restaurantID) {
        setCart((prev) => ({
          ...prev,
          cartItem: [...prev.cartItem, { ...newItem, quantity: 1 }],
          cartValue: Number(prev.cartValue) + Number(newItem.price),
        }));
        setCartFlag((prev) => [...prev, newItem._id]);
      } else {
        toast.error("Clear the cart first");
      }
    } else {
      setCart({
        restaurantID: newItem.restaurantID,
        cartItem: [{ ...newItem, quantity: 1 }],
        cartValue: Number(newItem.price),
      });
      setCartFlag((prev) => [...prev, newItem._id]);
    }
  };

  const handleRemoveCartItem = () => {
    localStorage.removeItem("CraveIt Cart");
    setCart();
    setCartFlag([]);
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    cart && localStorage.setItem("CraveIt Cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetchMenuData();
  }, [restaurantData]);

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-orange-100 pb-32">
      
      {/* 🔧 FIX 1: Banner responsive height + text */}
      <div className="w-full h-48 md:h-64 relative">
        <img
          src={restaurantData.photo.url}
          alt="restaurant"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-(--color-secondary)">
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-wide drop-shadow-lg text-center px-2">
            {restaurantData.restaurantName || "Restaurant"}
          </h1>
          <p className="text-xs md:text-sm mt-2 text-gray-200 text-center px-2">
            Fresh Food • Great Taste • Fast Delivery
          </p>
        </div>
      </div>

      {/* Menu Section */}
      <div className="max-w-6xl mx-auto px-4 mt-10">
        <h2 className="text-2xl md:text-3xl font-bold text-(--color-primary) text-center">
          Our Menu
        </h2>
        <p className="text-gray-600 text-center mt-2 text-sm md:text-base">
          Choose your favorite dishes and add them to your cart 🍽️
        </p>

        {loading && (
          <div className="text-center mt-10 text-lg font-semibold text-gray-600">
            Loading Menu...
          </div>
        )}

        {/* 🔧 FIX 2: Grid responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          {menuItems &&
            menuItems.map((EachItem, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col sm:flex-row gap-4 p-2 border border-gray-100"
              >
                
                {/* 🔧 FIX 3: Image responsive */}
                <img
                  src={EachItem.images[0].url}
                  alt={EachItem.itemName}
                  className="w-full sm:w-48 h-40 sm:h-auto rounded-xl sm:rounded-l-xl object-cover"
                />

                {/* Details */}
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg md:text-xl font-bold text-(--color-primary)">
                        {EachItem.itemName}
                      </h3>

                      <span
                        className={`text-xs px-3 py-1 rounded-full capitalize font-semibold ${
                          EachItem.availability === "available"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {EachItem.availability}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {EachItem.description}
                    </p>

                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-700">
                      <p><span className="font-semibold">Cuisine : </span>{EachItem.cuisine}</p>
                      <p><span className="font-semibold">Serving : </span>{EachItem.servingSize} persons</p>
                      <p><span className="font-semibold">Prep Time : </span>{EachItem.preparationTime} min</p>
                      <p className="flex gap-4 items-center">
                        <span className="font-semibold">Type : </span>
                        <span
                          className={`text-md border-2 ${
                            EachItem.type === "non-veg" || EachItem.type === "egg"
                              ? "border-red-500 text-red-500"
                              : "border-green-500 text-green-500"
                          }`}
                        >
                          <GoDotFill />
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <p className="text-xl md:text-2xl font-extrabold text-(--color-primary)">
                      ₹{EachItem.price}
                    </p>

                    <button
                      className="bg-(--color-secondary) cursor-pointer text-white px-3 py-1 rounded-xl font-semibold hover:bg-(--color-secondary-hover) transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                      onClick={() => handleAddToCart(EachItem)}
                      disabled={cartFlag.includes(EachItem._id)}
                    >
                      {cartFlag.includes(EachItem._id)
                        ? "Added"
                        : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {!loading && menuItems.length === 0 && (
          <div className="text-center text-gray-600 font-semibold mt-10">
            No menu items available 😢
          </div>
        )}
      </div>

      {/* 🔧 FIX 4: Cart responsive */}
      {cart && (
        <div className="fixed bottom-5 left-0 right-0 flex justify-center px-4">
          <div className="bg-(--color-secondary) w-full max-w-3xl py-3 md:py-4 px-4 md:px-10 rounded-2xl md:rounded-full flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center text-center sm:text-left">
            
            <div className="flex gap-3 items-center">
              <div className="text-white font-bold text-sm md:text-lg">
                {cart.cartItem.length}{" "}
                {cart.cartItem.length === 1 ? "item" : "items"} Added
              </div>
              <button
                className="text-red-600 cursor-pointer hover:scale-110"
                onClick={handleRemoveCartItem}
              >
                <FaTrashAlt />
              </button>
            </div>

            <button
              className="text-(--color-primary) font-extrabold text-sm md:text-lg cursor-pointer"
              onClick={handleCheckout}
            >
              Checkout : <span className="text-white">₹ {cart.cartValue}</span>
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDisplayMenu;