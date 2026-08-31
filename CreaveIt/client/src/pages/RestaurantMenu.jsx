import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../config/Api";
import Loading from "../components/Loading";
import { useCart } from "../context/CartContext";

import {
  FaArrowLeft,
  FaCartShopping,
  FaTrash,
  FaPlus,
  FaUtensils,
} from "react-icons/fa6";

const RestaurantDisplayMenu = () => {
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const { cart, addToCart, clearCart, openCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [restaurantData, setRestaurantData] = useState(null);

  const cartFlag = useMemo(() => {
    return cart?.cartItem?.map((item) => item._id) || [];
  }, [cart]);

  // Fetch Menu

  const fetchMenuData = async () => {
    if (!restaurantId) return;
    setLoading(true);

    try {
      const res = await api.get(`/public/restaurant/menu/${restaurantId}`);
      setMenuItems(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unable to load menu");
    } finally {
      setLoading(false);
    }
  };

  const fetchRestaurantData = async () => {
    if (!restaurantId) return;

    try {
      const res = await api.get("/public/allRestaurants");
      const matchedRestaurant = (res.data.data || []).find(
        (restaurant) => restaurant._id === restaurantId,
      );
      setRestaurantData(matchedRestaurant || null);
    } catch (error) {
      console.log(error);
    }
  };

  // Add To Cart

  const handleAddToCart = (newItem) => {
    addToCart(newItem);
  };

  // Load Menu

  useEffect(() => {
    fetchMenuData();
    fetchRestaurantData();
  }, [restaurantId]);

  // Invalid Restaurants

  if (!restaurantId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FBF3E7] px-4">
        <div className="text-center">
          <FaUtensils className="mx-auto text-3xl text-[#E8491D]" />

          <h2 className="mt-4 text-xl font-bold text-[#1F1811]">
            Restaurant not found
          </h2>

          <button
            type="button"
            onClick={() => navigate("/restaurants")}
            className="mt-5 cursor-pointer bg-[#1F1811] px-5 py-2.5 text-sm font-semibold text-[#FBF3E7] transition-opacity hover:opacity-90"
          >
            Explore restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF3E7] pb-28">
      {/* Hero */}

      <section className="relative overflow-hidden bg-[#1F1811]">
        {/* Subtle background pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(#FBF3E7 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        {/* Decorative accent */}
        <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full border border-[#E8491D]/20" />
        <div className="pointer-events-none absolute -bottom-28 right-1/4 size-56 rounded-full border border-[#FBF3E7]/10" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FBF3E7]/70 transition-colors hover:text-[#E8491D]"
          >
            <FaArrowLeft className="text-[10px]" />
            Back to restaurants
          </button>

          {/* Restaurant Info */}
          <div className="mt-8 max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8491D]">
              Now serving
            </p>

            <h1 className="mt-3 text-3xl font-black uppercase tracking-tight text-[#FBF3E7] sm:text-5xl">
              {restaurantData?.restaurantName || "Restaurant"}
            </h1>

            {restaurantData?.cuisine && (
              <p className="mt-3 text-sm text-[#C9BEB0]">
                {restaurantData.cuisine.split(",").slice(0, 3).join(" • ")}
              </p>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
              {restaurantData?.city && (
                <span className="border border-[#FBF3E7]/15 px-3 py-1.5 text-[#FBF3E7]/70">
                  {restaurantData.city}
                </span>
              )}

              {restaurantData?.price && (
                <span className="border border-[#FBF3E7]/15 px-3 py-1.5 text-[#FBF3E7]/70">
                  ₹{restaurantData.price} for two
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Details */}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Section Header */}

        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-dashed border-[#1F1811]/20 pb-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8491D]">
              Freshly prepared
            </p>

            <h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-[#1F1811] sm:text-3xl">
              Explore the menu
            </h2>

            <p className="mt-2 text-sm text-[#8A7C6A]">
              Pick your favorites and add them to your cart.
            </p>
          </div>

          <div className="font-mono text-xs text-[#8A7C6A]">
            {menuItems.length} {menuItems.length === 1 ? "ITEM" : "ITEMS"}
          </div>
        </div>

        {/* Loader */}

        {loading && (
          <div className="flex min-h-[40vh] items-center justify-center">
            <Loading />
          </div>
        )}

        {/* Menu Grid */}

        {!loading && menuItems?.length > 0 && (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((EachItem) => {
              const isAdded = cartFlag.includes(EachItem._id);
              const isAvailable = EachItem.availability === "available";
              const isVeg = EachItem.type === "veg";

              return (
                <article
                  key={EachItem._id}
                  className="group overflow-hidden bg-white shadow-[0_16px_40px_-20px_rgba(31,24,17,0.35)]"
                >
                  {/* IMAGE */}

                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={
                        EachItem?.images?.[0]?.url ||
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
                      }
                      //Fallback: if error in image laoding
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
                      }}
                      alt={EachItem?.itemName || "Menu item"}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-[#1F1811]/50 via-transparent to-transparent" />

                    {/* Availability */}

                    <span
                      className={`absolute left-3 top-3 px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${
                        isAvailable
                          ? "bg-[#FBF3E7] text-[#1F1811]"
                          : "bg-[#E8491D] text-white"
                      }`}
                    >
                      {EachItem.availability}
                    </span>

                    {/* Food Type */}

                    <span className="absolute bottom-3 right-3 flex size-5 items-center justify-center border border-white/70 bg-[#1F1811]/70">
                      <span
                        className={`size-2 rounded-full ${
                          isVeg ? "bg-green-500" : "bg-[#E8491D]"
                        }`}
                      />
                    </span>
                  </div>

                  {/* CONTENT */}

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#E8491D]">
                          {EachItem.cuisine || "Chef's Special"}
                        </p>

                        <h3 className="mt-1 truncate text-base font-black uppercase text-[#1F1811]">
                          {EachItem.itemName}
                        </h3>
                      </div>

                      <p className="shrink-0 text-lg font-black text-[#1F1811]">
                        ₹{EachItem.price}
                      </p>
                    </div>

                    {/* Description */}

                    {EachItem.description && (
                      <p className="mt-3 line-clamp-2 text-xs leading-5 text-[#8A7C6A]">
                        {EachItem.description}
                      </p>
                    )}

                    {/* Details */}

                    <div className="mt-4 flex flex-wrap gap-2 border-t border-dashed border-[#1F1811]/15 pt-3">
                      {EachItem.servingSize && (
                        <span className="bg-[#FBF3E7] px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-[#8A7C6A]">
                          Serves {EachItem.servingSize}
                        </span>
                      )}

                      {EachItem.preparationTime && (
                        <span className="bg-[#FBF3E7] px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-[#8A7C6A]">
                          {EachItem.preparationTime} min
                        </span>
                      )}
                    </div>

                    {/* ACTION */}

                    <button
                      type="button"
                      onClick={() => handleAddToCart(EachItem)}
                      disabled={!isAvailable || isAdded}
                      className={`mt-4 flex w-full items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wide transition-all ${
                        isAdded
                          ? "cursor-default bg-[#1F1811] text-[#FBF3E7]"
                          : !isAvailable
                            ? "cursor-not-allowed bg-[#E5DDD3] text-[#8A7C6A]"
                            : "cursor-pointer bg-[#E8491D] text-white hover:bg-[#1F1811]"
                      }`}
                    >
                      {isAdded ? (
                        "Added to cart"
                      ) : !isAvailable ? (
                        "Currently unavailable"
                      ) : (
                        <>
                          <FaPlus className="text-[10px]" />
                          Add to cart
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Empty State if No Menu Available */}

        {!loading && menuItems?.length === 0 && (
          <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
            <FaUtensils className="text-3xl text-[#E8491D]" />

            <h3 className="mt-4 text-lg font-black uppercase text-[#1F1811]">
              No menu items yet
            </h3>

            <p className="mt-2 text-sm text-[#8A7C6A]">
              This restaurant hasn't added any dishes yet.
            </p>

            <button
              type="button"
              onClick={() => navigate("/restaurants")}
              className="mt-5 cursor-pointer bg-[#1F1811] px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-[#FBF3E7] transition-opacity hover:opacity-90"
            >
              Explore restaurants
            </button>
          </div>
        )}
      </section>

      {/* Floating Cart at Bottom */}

      {cart && cart.cartItem?.length > 0 && (
        <div className="fixed bottom-4 left-0 right-0 z-40 px-4">
          <div className="mx-auto flex max-w-3xl flex-col gap-3 bg-[#1F1811] px-4 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.3)] sm:flex-row sm:items-center sm:justify-between sm:px-5">
            {/* Cart Info */}

            <div className="flex items-center gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#C9BEB0]">
                  Your cart
                </p>

                <p className="text-sm font-bold text-[#FBF3E7]">
                  {cart.cartItem.length}{" "}
                  {cart.cartItem.length === 1 ? "item" : "items"} • ₹
                  {cart.cartValue}
                </p>
              </div>

              <button
                type="button"
                onClick={clearCart}
                aria-label="Clear cart"
                className="flex size-8 cursor-pointer items-center justify-center text-[#C9BEB0] transition-colors hover:text-[#E8491D]"
              >
                <FaTrash className="text-xs" />
              </button>
            </div>

            {/* Checkout */}

            <button
              type="button"
              onClick={openCart}
              className="flex cursor-pointer items-center justify-center gap-2 bg-[#E8491D] px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#FBF3E7] hover:text-[#1F1811]"
            >
              <FaCartShopping />
              Review cart
              <span className="font-black">₹{cart.cartValue}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDisplayMenu;
