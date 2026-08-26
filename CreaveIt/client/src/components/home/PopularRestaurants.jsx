import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../config/Api";
import Loading from "../Loading";

import { FaArrowRight, FaClock, FaLocationDot, FaStar } from "react-icons/fa6";

const PopularRestaurants = () => {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllRestaurants = async () => {
    setLoading(true);

    try {
      const res = await api.get("/public/allRestaurants");

      setRestaurants(res.data.data || []);
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Unable to load restaurants",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRestaurants();
  }, []);

  // Only show first 4 restaurants on home page
  const featuredRestaurants = restaurants.slice(0, 4);

  const handleRestaurantClick = (restaurant) => {
    navigate(`/restaurants/${restaurant._id}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="bg-[#FBF3E7] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-dashed border-[#1F1811]/20 pb-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E8491D]">
              Popular near you
            </p>

            <h2 className="mt-2 font-[Archivo_Black] text-2xl leading-tight text-[#1F1811] sm:text-3xl">
              RESTAURANTS YOU'LL LOVE
            </h2>

            <p className="mt-2 font-[Inter] text-sm text-[#8A7C6A]">
              Discover top-rated places serving your favorite food.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/restaurants")}
            className="hidden cursor-pointer items-center gap-2 text-sm font-bold text-[#1F1811] transition-colors hover:text-[#E8491D] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#E8491D] sm:inline-flex"
          >
            View all
            <FaArrowRight className="text-xs" />
          </button>
        </div>

        {/* Restaurant Cards */}
        {featuredRestaurants.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredRestaurants.map((restaurant, index) => (
              <button
                key={restaurant._id}
                type="button"
                onClick={() => handleRestaurantClick(restaurant)}
                className="group relative cursor-pointer overflow-hidden rounded-sm bg-white text-left shadow-[0_10px_30px_-12px_rgba(31,24,17,0.35)] transition-transform duration-200 hover:-translate-y-1 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#E8491D]"
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={restaurant?.photo?.url}
                    alt={restaurant?.restaurantName}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Popular Badge */}
                  {index < 2 && (
                    <span className="absolute left-0 top-3 flex items-center bg-[#E8491D] py-1 pl-3 pr-2 text-[11px] font-bold uppercase tracking-wide text-[#FBF3E7]">
                      Popular
                      <span
                        className="ml-1 h-0 w-0 border-y-11 border-l-8 border-y-transparent border-l-[#E8491D]"
                        aria-hidden="true"
                      />
                    </span>
                  )}

                  {/* Rating */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-[#FBF3E7] px-2.5 py-1 text-xs font-bold text-[#1F1811] shadow-sm">
                    <FaStar className="text-[#E8491D]" />
                    4.8
                  </div>
                </div>

                {/* Content */}
                <div className="px-4 pb-4 pt-3.5">
                  <h3 className="truncate font-[Archivo_Black] text-sm text-[#1F1811]">
                    {restaurant?.restaurantName?.toUpperCase()}
                  </h3>

                  <p className="mt-1 truncate font-[Inter] text-[13px] text-[#8A7C6A]">
                    {restaurant?.cuisine || "Multiple cuisines"}
                  </p>

                  <div className="mt-3 border-t border-dashed border-[#1F1811]/15 pt-3" />

                  <div className="flex items-center justify-between gap-2 font-[JetBrains_Mono] text-[11px] text-[#8A7C6A]">
                    <span className="flex items-center gap-1.5">
                      <FaClock className="text-[#E8491D]" />
                      20–30 min
                    </span>

                    <span className="flex items-center gap-1.5 truncate">
                      <FaLocationDot className="text-[#6B8E4E]" />

                      {restaurant?.city || "Near you"}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="font-[Inter] text-sm text-[#8A7C6A]">
              No restaurants available right now.
            </p>
          </div>
        )}

        {/* Mobile View All */}
        <button
          type="button"
          onClick={() => navigate("/restaurants")}
          className="mt-6 inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-[#1F1811] transition-colors hover:text-[#E8491D] sm:hidden"
        >
          View all restaurants
          <FaArrowRight className="text-xs" />
        </button>
      </div>
    </section>
  );
};

export default PopularRestaurants;
