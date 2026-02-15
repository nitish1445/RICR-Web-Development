import React, { useState, useEffect } from "react";
import api from "../config/Api";
import toast from "react-hot-toast";
import { IoIosArrowDropright } from "react-icons/io";
import Loading from "../components/Loading";

const OrderNow = () => {
  const [restaurants, setRestaurants] = useState();
  const [loading, setLoading] = useState(false);

  const fetchAllRestaurants = async () => {
    setLoading(true);
    try {
      const res = await api.get("/public/allRestaurants");
      console.log(res.data.data);
      setRestaurants(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unkown Error");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    console.log("Restaurant clicked !!");
  };

  useEffect(() => {
    fetchAllRestaurants();
  }, []);

  if (loading) {
    return (
      <div className="h-[80vh]">
        <Loading />
      </div>
    );
  }
  return (
    <>
      <div className="min-h-screen bg-gray-200">
        {/* ------------- Hero Section --------------- */}

        <section className="text-center py-10">
          <h1 className="text-4xl font-bold text-gray-800">Order Now 🍽️</h1>
          <p className="text-gray-600 text-lg mt-3">
            Explore top restaurants and satisfy your cravings instantly.
          </p>
        </section>

        {/* ----------------- Filter ------------------ */}

        {/* ------------ Restaurants Card ------------- */}

        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 mx-5 pb-10">
          {restaurants &&
            restaurants.map((EachRestaurant, idx) => (
              <div
                key={idx}
                className="p-2 h-90 border rounded-xl bg-amber-50 shadow-md hover:shadow-xl border-gray-100 hover:scale-102 duration-200 cursor-pointer group"
                onClick={handleClick}
              >
                <img
                  src={EachRestaurant.photo.url}
                  alt={EachRestaurant.restaurantName}
                  className="w-full h-[50%] object-cover rounded-t-xl"
                />
                <div className="text-2xl font-semibold py-1 text-(--color-primary) capitalize truncate">
                  {EachRestaurant.restaurantName}
                </div>
                <div className="capitalize">
                  {EachRestaurant.cuisine.split(",").slice(0, 2)}
                </div>
                <div>{EachRestaurant.address}</div>
                <div>{EachRestaurant.city}</div>
                <div>{EachRestaurant.price}</div>
                <div className="flex float-end items-center text-(--color-secondary) gap-1 group-hover:underline w-fit">
                  <span className="">Explore Menu</span>
                  <IoIosArrowDropright className="text-xl" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );

  // return (
  //   <div className="min-h-screen bg-gray-100">
  //     {/* ================= HERO SECTION ================= */}
  //     <section className="py-10 bg-gray-100">
  //       <div className="max-w-7xl mx-auto px-5 text-center">
  //         <h1 className="text-4xl font-bold text-gray-900">Order Now 🍽️</h1>
  //         <p className="text-gray-600 text-lg mt-3">
  //           Explore top restaurants and satisfy your cravings instantly.
  //         </p>
  //       </div>
  //     </section>

  //     {/* ================= FILTER BAR ================= */}
  //     <section className="max-w-7xl mx-auto px-5 pb-5">
  //       <div className="bg-white shadow-sm rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
  //         <input
  //           type="text"
  //           placeholder="Search restaurant..."
  //           className="w-full md:w-1/2 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
  //         />

  //         <select className="w-full md:w-1/4 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
  //           <option>Sort By</option>
  //           <option>Rating High to Low</option>
  //           <option>Price Low to High</option>
  //           <option>Distance</option>
  //         </select>

  //         <button className="w-full md:w-auto bg-(--color-secondary) text-white px-5 py-2 rounded-lg hover:bg-(--color-secondary-hover) transition">
  //           Apply Filters
  //         </button>
  //       </div>
  //     </section>

  //     {/* ================= RESTAURANT CARDS ================= */}
  //     <section className="max-w-7xl mx-auto px-5 pb-16">
  //       {loading ? (
  //         <div className="text-center py-12 text-gray-700 font-semibold">
  //           Loading restaurants...
  //         </div>
  //       ) : restaurants.length > 0 ? (
  //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  //           {restaurants.map((restaurant) => (
  //             <Link
  //               key={restaurant._id}
  //               to={`/restaurant/${restaurant._id}`}
  //               className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
  //             >
  //               {/* IMAGE */}
  //               <div className="relative">
  //                 <img
  //                   src={restaurant.restaurantImage}
  //                   alt={restaurant.restaurantName}
  //                   className="w-full h-56 object-cover"
  //                 />

  //                 {/* PROMOTED */}
  //                 {restaurant.isPromoted && (
  //                   <span className="absolute top-3 left-3 bg-gray-800 text-white text-xs px-3 py-1 rounded-md opacity-90">
  //                     Promoted
  //                   </span>
  //                 )}

  //                 {/* DISCOUNT TAG */}
  //                 {restaurant.discount && (
  //                   <span className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-md">
  //                     Flat {restaurant.discount}% OFF
  //                   </span>
  //                 )}
  //               </div>

  //               {/* CONTENT */}
  //               <div className="p-4">
  //                 <div className="flex items-center justify-between">
  //                   <h3 className="text-lg font-bold text-gray-900 truncate">
  //                     {restaurant.restaurantName}
  //                   </h3>

  //                   <span className="bg-green-600 text-white px-2 py-1 rounded-lg text-sm font-semibold">
  //                     ⭐ {restaurant.rating}
  //                   </span>
  //                 </div>

  //                 {/* CATEGORIES */}
  //                 <p className="text-gray-500 text-sm mt-2 truncate">
  //                   {restaurant.categories?.join(", ")}
  //                 </p>

  //                 {/* ADDRESS */}
  //                 <p className="text-gray-400 text-sm mt-1 truncate">
  //                   {restaurant.address}
  //                 </p>

  //                 {/* PRICE + DISTANCE */}
  //                 <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
  //                   <p className="font-medium">
  //                     ₹{restaurant.avgPriceForTwo} for two
  //                   </p>
  //                   <p className="text-gray-500">{restaurant.distance}</p>
  //                 </div>
  //               </div>
  //             </Link>
  //           ))}
  //         </div>
  //       ) : (
  //         <div className="text-center py-12 text-gray-600">
  //           No restaurants found 😢
  //         </div>
  //       )}
  //     </section>
  //   </div>
  // );
};

export default OrderNow;
