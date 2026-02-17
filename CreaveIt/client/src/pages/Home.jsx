// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const navigate = useNavigate();

//   const featuredRestaurants = [
//     {
//       id: 1,
//       name: "Spice Kingdom",
//       cuisine: "Indian",
//       rating: 4.5,
//       deliveryTime: "30-40 mins",
//       image: "🏪",
//     },
//     {
//       id: 2,
//       name: "Pizza Paradise",
//       cuisine: "Italian",
//       rating: 4.3,
//       deliveryTime: "25-35 mins",
//       image: "🍕",
//     },
//     {
//       id: 3,
//       name: "Dragon Wok",
//       cuisine: "Chinese",
//       rating: 4.6,
//       deliveryTime: "35-45 mins",
//       image: "🥢",
//     },
//     {
//       id: 4,
//       name: "Burger Haven",
//       cuisine: "American",
//       rating: 4.4,
//       deliveryTime: "20-30 mins",
//       image: "🍔",
//     },
//   ];

//   const popularDishes = [
//     {
//       id: 1,
//       name: "Butter Chicken",
//       restaurant: "Spice Kingdom",
//       price: 299,
//       rating: 4.7,
//       image: "🍛",
//     },
//     {
//       id: 2,
//       name: "Margherita Pizza",
//       restaurant: "Pizza Paradise",
//       price: 349,
//       rating: 4.5,
//       image: "🍕",
//     },
//     {
//       id: 3,
//       name: "Hakka Noodles",
//       restaurant: "Dragon Wok",
//       price: 249,
//       rating: 4.6,
//       image: "🍜",
//     },
//     {
//       id: 4,
//       name: "Classic Burger",
//       restaurant: "Burger Haven",
//       price: 199,
//       rating: 4.4,
//       image: "🍔",
//     },
//     {
//       id: 5,
//       name: "Tandoori Chicken",
//       restaurant: "Spice Kingdom",
//       price: 279,
//       rating: 4.8,
//       image: "🍖",
//     },
//     {
//       id: 6,
//       name: "Garlic Bread",
//       restaurant: "Pizza Paradise",
//       price: 99,
//       rating: 4.3,
//       image: "🥖",
//     },
//   ];

//   return (
//     <>
//       {/* Hero Section */}
//       <section className="relative bg-linear-to-r from-orange-500 to-orange-600 text-white py-24">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
//             {/* Left Content */}
//             <div className="space-y-6">
//               <h1 className="text-4xl md:text-5xl font-bold leading-tight">
//                 Order Your Favorite Food
//               </h1>
//               <p className="text-lg md:text-xl text-orange-50">
//                 Discover delicious meals from the best restaurants in your area.
//                 Fast delivery, great quality, amazing taste!
//               </p>
//               <div className="flex flex-wrap gap-4 pt-4">
//                 <button
//                   onClick={() => navigate("/order")}
//                   className="cursor-pointer px-8 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition duration-300 transform hover:scale-105"
//                 >
//                   Order Now
//                 </button>
//                 <button
//                   onClick={() => navigate("/contact")}
//                   className="cursor-pointer px-8 py-3 bg-orange-700 text-white font-semibold rounded-lg hover:bg-orange-800 transition duration-300 border-2 border-white"
//                 >
//                   Contact Us
//                 </button>
//               </div>

//               {/* Stats */}
//               <div className="grid grid-cols-3 gap-4 pt-8">
//                 <div>
//                   <p className="text-3xl font-bold">500+</p>
//                   <p className="text-orange-50">Restaurants</p>
//                 </div>
//                 <div>
//                   <p className="text-3xl font-bold">50K+</p>
//                   <p className="text-orange-50">Happy Customers</p>
//                 </div>
//                 <div>
//                   <p className="text-3xl font-bold">24/7</p>
//                   <p className="text-orange-50">Support</p>
//                 </div>
//               </div>
//             </div>

//             {/* Right Visual */}
//             <div className="flex justify-center items-center">
//               <div className="text-8xl animate-bounce">🍽️</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Restaurants Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
//               Featured Restaurants
//             </h2>
//             <p className="text-gray-600 text-lg">
//               Explore our top-rated restaurants
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {featuredRestaurants.map((restaurant) => (
//               <div
//                 key={restaurant.id}
//                 className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer transform hover:scale-105"
//               >
//                 <div className="h-40 bg-linear-to-br from-orange-400 to-orange-500 flex items-center justify-center">
//                   <span className="text-6xl">{restaurant.image}</span>
//                 </div>
//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                     {restaurant.name}
//                   </h3>
//                   <p className="text-sm text-gray-600 mb-3">
//                     {restaurant.cuisine}
//                   </p>
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center gap-1">
//                       <span className="text-yellow-500">⭐</span>
//                       <span className="font-semibold text-gray-800">
//                         {restaurant.rating}
//                       </span>
//                     </div>
//                     <p className="text-sm text-gray-600">
//                       {restaurant.deliveryTime}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Popular Dishes Section */}
//       <section className="py-16 bg-white">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
//               Popular Dishes
//             </h2>
//             <p className="text-gray-600 text-lg">
//               Most loved meals by our customers
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {popularDishes.map((dish) => (
//               <div
//                 key={dish.id}
//                 className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer"
//               >
//                 <div className="h-48 bg-linear-to-br from-orange-300 to-orange-400 flex items-center justify-center">
//                   <span className="text-8xl">{dish.image}</span>
//                 </div>
//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-1">
//                     {dish.name}
//                   </h3>
//                   <p className="text-sm text-gray-600 mb-3">
//                     {dish.restaurant}
//                   </p>
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center gap-3">
//                       <span className="text-2xl font-bold text-orange-600">
//                         ₹{dish.price}
//                       </span>
//                       <div className="flex items-center gap-1">
//                         <span className="text-yellow-500">⭐</span>
//                         <span className="text-sm font-semibold">
//                           {dish.rating}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   <button className="w-full mt-3 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition duration-300 font-medium cursor-pointer">
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Why Choose Us Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
//               Why Choose CraveIt?
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               {
//                 icon: "⚡",
//                 title: "Fast Delivery",
//                 description: "Get your food delivered in minutes",
//               },
//               {
//                 icon: "🔒",
//                 title: "Safe Payment",
//                 description: "Secure and encrypted transactions",
//               },
//               {
//                 icon: "🌟",
//                 title: "Quality Assured",
//                 description: "Only verified restaurants and vendors",
//               },
//               {
//                 icon: "💬",
//                 title: "24/7 Support",
//                 description: "We're always here to help you",
//               },
//             ].map((feature, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-6 rounded-lg shadow-md text-center"
//               >
//                 <span className="text-5xl mb-4 block">{feature.icon}</span>
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-16 bg-linear-to-r from-orange-500 to-orange-600 text-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             Ready to Order?
//           </h2>
//           <p className="text-lg text-orange-50 mb-8">
//             Join thousands of satisfied customers and enjoy delicious food
//             delivered to your doorstep
//           </p>
//           <button
//             onClick={() => navigate("/order")}
//             className="px-8 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition duration-300 transform hover:scale-105 cursor-pointer"
//           >
//             Order Now
//           </button>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/Api";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    fetchAllRestaurants();
  }, []);

  const featuredRestaurants = restaurants.slice(0, 4);
  const popularRestaurants = restaurants.slice(0, 6);

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className=" relative bg-linear-to-r from-orange-500 to-orange-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-4">
              <h1 className="font-extrabold leading-tight drop-shadow-lg flex flex-col">
                <span className="text-4xl md:text-5xl ">Order Your</span>
                <span className="text-2xl md:text-3xl text-(--color-background)">
                  Favorite Food Anytime
                </span>
              </h1>

              <p className="text-lg md:text-xl text-orange-50">
                Discover the best restaurants in your city and enjoy quick
                delivery with CraveIt.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => navigate("/order")}
                  className="cursor-pointer px-8 py-3 bg-white text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition duration-300 transform hover:scale-105 shadow-lg"
                >
                  Order Now
                </button>

                <button
                  onClick={() => navigate("/contact")}
                  className="cursor-pointer px-8 py-3 bg-orange-700 text-white font-semibold rounded-xl hover:bg-orange-800 transition duration-300 border border-white shadow-lg"
                >
                  Contact Us
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div>
                  <p className="text-3xl font-bold">5K+</p>
                  <p className="text-orange-100 text-sm">Restaurants</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">50K+</p>
                  <p className="text-orange-100 text-sm">Happy Customers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">24/7</p>
                  <p className="text-orange-100 text-sm">Support</p>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="flex justify-center items-center">
              <div className="text-[120px] animate-bounce drop-shadow-xl">
                🍽️
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-10 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-gray-100">
              <FaSearch className="text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search restaurants..."
                className="w-full outline-none text-gray-700 placeholder-gray-400"
                onClick={() => navigate("/order")}
              />
            </div>
            <p className="text-center text-orange-100 mt-3 text-sm">
              Tip : Click search to explore all restaurants
            </p>
          </div>
        </div>
      </section>

      {/* ================= LOADING ================= */}
      {loading && (
        <div className="h-[70vh] flex justify-center items-center">
          <Loading />
        </div>
      )}

      {/* ================= FEATURED RESTAURANTS ================= */}
      {!loading && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                Featured Restaurants 🌟
              </h2>
              <p className="text-gray-600 text-lg">
                Top picks from our best restaurants
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredRestaurants.map((restaurant, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate("/menu-items", { state: restaurant })}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden group border border-gray-100 hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={restaurant.photo.url}
                      alt={restaurant.restaurantName}
                      className="w-full h-44 object-cover group-hover:scale-110 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>

                    <h3 className="absolute bottom-3 left-3 text-white text-lg font-bold capitalize truncate">
                      {restaurant.restaurantName}
                    </h3>
                  </div>

                  {/* Info */}
                  <div className="p-4 space-y-2">
                    <p className="text-gray-600 text-sm capitalize truncate">
                      🍴 {restaurant.cuisine}
                    </p>

                    <p className="text-gray-500 text-sm flex gap-2 items-center truncate">
                      <FaMapMarkerAlt className="text-(--color-secondary)" />
                      {restaurant.city}
                    </p>

                    <p className="text-gray-700 font-semibold">
                      ₹ {restaurant.price}
                      <span className="text-gray-500 text-sm font-normal">
                        {" "}
                        for two
                      </span>
                    </p>

                    <button className="w-full mt-3 px-4 py-2 bg-(--color-secondary) text-white rounded-xl hover:bg-(--color-secondary-hover) transition font-semibold cursor-pointer">
                      View Menu
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Explore More Button */}
            <div className="text-center mt-12">
              <button
                onClick={() => navigate("/order")}
                className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition duration-300 shadow-md cursor-pointer"
              >
                Explore More Restaurants 🍽️
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ================= POPULAR RESTAURANTS ================= */}
      {!loading && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                Popular Restaurants
              </h2>
              <p className="text-gray-600 text-lg">
                Most ordered restaurants by customers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularRestaurants.map((restaurant, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate("/menu-items", { state: restaurant })}
                  className="flex bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer overflow-hidden group border border-gray-100"
                >
                  <img
                    src={restaurant.photo.url}
                    alt={restaurant.restaurantName}
                    className="w-32 h-full object-cover group-hover:scale-110 transition duration-300"
                  />

                  <div className="p-4 flex flex-col justify-between w-full">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 capitalize truncate">
                        {restaurant.restaurantName}
                      </h3>

                      <p className="text-sm text-gray-600 capitalize truncate">
                        {restaurant.cuisine}
                      </p>

                      <p className="text-sm text-gray-500 truncate">
                        {restaurant.city}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <p className="text-orange-600 font-bold text-lg">
                        ₹{restaurant.price}
                      </p>

                      <span className="text-sm font-semibold text-(--color-secondary) group-hover:underline">
                        Order Now →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose CraveIt?💡
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "⚡",
                title: "Fast Delivery",
                description:
                  "Get your food delivered quickly at your doorstep.",
              },
              {
                icon: "🔒",
                title: "Safe Payment",
                description: "Secure and safe transactions every time.",
              },
              {
                icon: "🌟",
                title: "Quality Assured",
                description: "Only verified restaurants and top quality food.",
              },
              {
                icon: "💬",
                title: "24/7 Support",
                description: "Our support team is always available for you.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition duration-300"
              >
                <span className="text-5xl mb-4 block">{feature.icon}</span>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-16 bg-linear-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Order
          </h2>
          <p className="text-lg text-orange-50 mb-8">
            Join thousands of satisfied customers and enjoy delicious food
            delivered at your doorstep.
          </p>

          <button
            onClick={() => navigate("/order")}
            className="px-10 py-3 bg-white text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition duration-300 transform hover:scale-105 cursor-pointer shadow-lg"
          >
            Order Now
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
