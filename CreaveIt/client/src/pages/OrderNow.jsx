import React, { useState, useEffect } from "react";
import api from "../config/Api";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDropright } from "react-icons/io";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

const OrderNow = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

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

  const handleRestaurantClick = (restaurantDetail) => {
    navigate("/menu-items", { state: restaurantDetail });
  };

  useEffect(() => {
    fetchAllRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter((res) =>
    res.restaurantName.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-orange-100 pb-16">
      {/* ================= HERO SECTION ================= */}
      <section className="py-12 text-center px-5">
        <h1 className="text-4xl font-extrabold text-(--color-secondary)">
          Order Now 🍽️
        </h1>
        <p className="text-gray-600 text-lg mt-3 max-w-2xl mx-auto">
          Discover the best restaurants near you and enjoy delicious meals at
          your doorstep.
        </p>
      </section>

      {/* ================= SEARCH BAR ================= */}
      <section className="max-w-5xl mx-auto px-5">
        <div className="bg-white shadow-lg rounded-2xl p-4 flex items-center gap-3 border border-gray-100">
          <FaSearch className="text-gray-400 text-lg" />

          <input
            type="text"
            placeholder="Search restaurants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
      </section>

      {/* ================= RESTAURANT CARDS ================= */}
      <section className="max-w-7xl mx-auto px-5 mt-10">
        {filteredRestaurants.length === 0 ? (
          <div className="text-center mt-20 text-gray-600 font-semibold text-lg">
            No Restaurants Found 😢
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8">
            {filteredRestaurants.map((EachRestaurant, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer group overflow-hidden border border-gray-100 hover:-translate-y-1"
                onClick={() => handleRestaurantClick(EachRestaurant)}
              >
                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={EachRestaurant.photo.url}
                    alt={EachRestaurant.restaurantName}
                    className="w-full h-48 object-cover"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>

                  {/* Restaurant Name on Image */}
                  <h2 className="absolute bottom-3 left-3 text-white text-xl font-bold capitalize truncate">
                    {EachRestaurant.restaurantName}
                  </h2>
                </div>

                {/* CONTENT */}
                <div className="p-4 space-y-2">
                  {/* Cuisine */}
                  <p className="text-gray-600 text-sm capitalize truncate">
                    🍴 {EachRestaurant.cuisine.split(",").slice(0, 2).join(", ")}
                  </p>

                  {/* Address */}
                  <p className="text-gray-500 text-sm flex gap-2 items-center truncate">
                    <FaMapMarkerAlt className="text-(--color-secondary)" />
                    {EachRestaurant.city}, {EachRestaurant.address}
                  </p>

                  {/* Price */}
                  <p className="text-gray-700 font-semibold">
                    ₹ {EachRestaurant.price}
                    <span className="text-gray-500 text-sm font-normal">
                      {" "}
                      for two
                    </span>
                  </p>

                  {/* Explore Menu */}
                  <div className="flex justify-end items-center text-(--color-secondary) font-semibold gap-1 group-hover:underline w-fit ml-auto">
                    <span>Explore Menu</span>
                    <IoIosArrowDropright className="text-xl group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default OrderNow;
