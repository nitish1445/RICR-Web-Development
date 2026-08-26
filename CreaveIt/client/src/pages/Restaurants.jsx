import React, { useEffect, useState } from "react";

import api from "../config/Api";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

import {
  FaArrowRight,
  FaLocationDot,
  FaMagnifyingGlass,
  FaUtensils,
} from "react-icons/fa6";

const OrderNow = () => {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  /* Fetch Restaurants */

  const fetchAllRestaurants = async () => {
    setLoading(true);

    try {
      const res = await api.get("/public/allRestaurants");

      setRestaurants(res.data.data);
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Unknown Error");
    } finally {
      setLoading(false);
    }
  };

  /* Restaurant Menu Items on Click */

  const handleRestaurantClick = (restaurantDetail) => {
    navigate(`/restaurants/${restaurantDetail._id}`);
  };

  useEffect(() => {
    fetchAllRestaurants();
  }, []);

  /* Search Restaurants */

  const filteredRestaurants = restaurants.filter((res) =>
    res.restaurantName?.toLowerCase().includes(search.toLowerCase()),
  );

  /* Loader */

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center bg-[#FBF3E7]">
        <Loading />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBF3E7]">
      {/* Hero */}

      <section className="relative overflow-hidden bg-[#1F1811]">
        {/* Grain */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        {/* Decorative text */}
        <div className="pointer-events-none absolute -right-10 -top-8 font-[Archivo_Black] text-[150px] leading-none text-white/3 sm:text-[220px]">
          EAT
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8491D]">
              <FaUtensils />
              Find your next meal
            </div>

            <h1 className="mt-4 font-[Archivo_Black] text-4xl leading-[0.95] tracking-tight text-[#FBF3E7] sm:text-5xl lg:text-6xl">
              WHAT ARE YOU
              <br />
              <span className="text-[#E8491D]">CRAVING TODAY?</span>
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-6 text-[#C9BEB0] sm:text-base">
              Explore restaurants, discover great food, and order your favorite
              meals in just a few clicks.
            </p>
          </div>

          {/* Search */}

          <div className="mt-8 max-w-2xl">
            <div className="flex items-center border border-[#FBF3E7]/15 bg-[#FBF3E7]">
              <div className="flex h-12 items-center justify-center px-4 text-[#8A7C6A]">
                <FaMagnifyingGlass className="text-sm" />
              </div>

              <input
                type="text"
                placeholder="Search restaurants..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 w-full bg-transparent pr-4 text-sm font-medium text-[#1F1811] outline-none placeholder:text-[#8A7C6A]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* RESTAURANTS */}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Section Header */}

        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-dashed border-[#1F1811]/20 pb-5">
          <div>
            <p className="font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8491D]">
              Explore restaurants
            </p>

            <h2 className="mt-2 font-[Archivo_Black] text-2xl uppercase text-[#1F1811] sm:text-3xl">
              PICK YOUR NEXT STOP
            </h2>
          </div>

          <p className="font-[JetBrains_Mono] text-[10px] uppercase tracking-wider text-[#8A7C6A]">
            {filteredRestaurants.length} restaurants found
          </p>
        </div>

        {/* EMPTY STATE */}

        {filteredRestaurants.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-[Archivo_Black] text-2xl uppercase text-[#1F1811]">
              NO RESTAURANTS FOUND
            </p>

            <p className="mt-2 text-sm text-[#8A7C6A]">
              Try searching for something else.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredRestaurants.map((EachRestaurant, idx) => (
              <article
                key={EachRestaurant._id || idx}
                onClick={() => handleRestaurantClick(EachRestaurant)}
                className="group cursor-pointer overflow-hidden bg-white shadow-[0_16px_40px_-18px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:-translate-y-1"
              >
                {/* Top Label */}

                <div className="flex items-center justify-between border-b border-dashed border-[#1F1811]/15 px-4 py-2.5">
                  <span className="font-[JetBrains_Mono] text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                    RESTAURANT #{String(idx + 1).padStart(2, "0")}
                  </span>

                  <span className="font-[JetBrains_Mono] text-[9px] font-bold uppercase tracking-wider text-[#E8491D]">
                    Open menu
                  </span>
                </div>

                {/* Image */}

                <div className="relative h-48 overflow-hidden">
                  <img
                    src={EachRestaurant?.photo?.url}
                    alt={EachRestaurant?.restaurantName}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-[#1F1811]/60 via-transparent to-transparent" />

                  <h3 className="absolute bottom-3 left-4 right-4 truncate font-[Archivo_Black] text-lg uppercase text-[#FBF3E7]">
                    {EachRestaurant.restaurantName}
                  </h3>
                </div>

                {/* Content */}

                <div className="p-4">
                  {/* Cuisine */}

                  <p className="truncate font-[JetBrains_Mono] text-[9px] font-bold uppercase tracking-[0.16em] text-[#E8491D]">
                    {EachRestaurant?.cuisine
                      ?.split(",")
                      ?.slice(0, 2)
                      ?.join(" • ")}
                  </p>

                  {/* Location */}

                  <div className="mt-3 flex items-start gap-2 text-[#8A7C6A]">
                    <FaLocationDot className="mt-0.5 shrink-0 text-xs text-[#E8491D]" />

                    <p className="line-clamp-1 text-xs">
                      {EachRestaurant?.city}, {EachRestaurant?.address}
                    </p>
                  </div>

                  {/* Bottom */}

                  <div className="mt-4 flex items-end justify-between border-t border-dashed border-[#1F1811]/15 pt-3">
                    <div>
                      <p className="font-[JetBrains_Mono] text-[8px] uppercase tracking-wider text-[#8A7C6A]">
                        For two
                      </p>

                      <p className="mt-1 font-[Archivo_Black] text-lg text-[#1F1811]">
                        ₹{EachRestaurant?.price}
                      </p>
                    </div>

                    <span className="flex size-9 items-center justify-center bg-[#E8491D] text-[#FBF3E7] transition-transform duration-200 group-hover:translate-x-1">
                      <FaArrowRight className="text-xs" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default OrderNow;
