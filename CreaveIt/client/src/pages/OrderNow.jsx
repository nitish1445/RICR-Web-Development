// import React, { useEffect, useState } from "react";
// import api from "../config/Api";

// const OrderNow = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchAllRestaurant = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/public/allRestaurants");
//       setRestaurants(res.data.data);
//     } catch (error) {
//       console.log(error);
//       // toast.error(error?.response?.data?.message || "Unknown Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllRestaurant();
//   }, []);

//   // console.log(restaurants);

//   return (
//     <>
//       <div className="bg-gray-100 p-3">
//         <div className="flex flex-col items-center justify-center p-10">
//           <h1 className="text-4xl font-bold text-gray-800">Order Now</h1>
//           <p className="text-gray-600 text-xl mt-2">
//             Browse our menu and place your order now!
//           </p>
//         </div>

//         {restaurants ? (
//           <div>
//             {restaurants.map((restaurant, idx) => (
//               <div key={idx} className="border">
//                 {restaurant.restaurantName}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div>

//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default OrderNow;

// import React, { useEffect, useState } from "react";
// import api from "../config/Api";
// import { Link } from "react-router-dom";

// const OrderNow = () => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchAllRestaurants = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get("/public/allRestaurants");
//       setRestaurants(res.data.data);
//     } catch (error) {
//       console.log(error?.response?.data?.message || "Unknown Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllRestaurants();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* ================= HERO SECTION ================= */}
//       <section className="bg-gray-100 py-10">
//         <div className="max-w-7xl mx-auto px-5 text-center">
//           <h2 className="text-4xl font-bold text-gray-900">Order Now 🍽️</h2>
//           <p className="text-gray-600 text-lg mt-3">
//             Browse restaurants, check ratings, and place your order instantly!
//           </p>
//         </div>
//       </section>

//       {/* ================= RESTAURANTS SECTION ================= */}
//       <section className="max-w-7xl mx-auto px-5 pb-14">
//         {loading ? (
//           <div className="text-center text-gray-600 font-semibold py-10">
//             Loading restaurants...
//           </div>
//         ) : restaurants.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {restaurants.map((restaurant) => (
//               <Link
//                 key={restaurant._id}
//                 to={`/restaurant/${restaurant._id}`}
//                 className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
//               >
//                 {/* IMAGE */}
//                 <div className="relative">
//                   <img
//                     src={
//                       restaurant?.restaurantImage ||
//                       "https://via.placeholder.com/400x250"
//                     }
//                     alt={restaurant?.restaurantName}
//                     className="w-full h-56 object-cover"
//                   />

//                   {/* PROMOTED BADGE */}
//                   {restaurant?.isPromoted && (
//                     <span className="absolute top-3 left-3 bg-gray-800 text-white text-xs px-3 py-1 rounded-md">
//                       Promoted
//                     </span>
//                   )}
//                 </div>

//                 {/* CONTENT */}
//                 <div className="p-4">
//                   <div className="flex items-center justify-between">
//                     <h3 className="text-lg font-bold text-gray-900 truncate">
//                       {restaurant.restaurantName}
//                     </h3>

//                     <span className="bg-green-600 text-white px-2 py-1 rounded-lg text-sm font-semibold">
//                       ⭐ {restaurant?.rating || "4.5"}
//                     </span>
//                   </div>

//                   {/* CATEGORIES */}
//                   <p className="text-gray-500 text-sm mt-2 truncate">
//                     {restaurant?.categories?.length > 0
//                       ? restaurant.categories.join(", ")
//                       : "North Indian, Fast Food, Chinese"}
//                   </p>

//                   {/* ADDRESS */}
//                   <p className="text-gray-400 text-sm mt-1 truncate">
//                     {restaurant?.address || "New York City"}
//                   </p>

//                   {/* PRICE + DISTANCE */}
//                   <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
//                     <p className="font-medium">
//                       ₹{restaurant?.avgPriceForTwo || "500"} for two
//                     </p>
//                     <p className="text-gray-500">
//                       {restaurant?.distance || "2.5 km"}
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-10 text-gray-600">
//             No restaurants found 😢
//           </div>
//         )}
//       </section>

//       {/* ================= FOOTER ================= */}
//       {/* <footer className="bg-gray-900 text-gray-200 py-10">
//         <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div>
//             <h2 className="text-xl font-bold text-white">NY CraveIt</h2>
//             <p className="text-sm text-gray-400 mt-2">
//               Your cravings, our delivery. Fast, fresh, and delicious.
//             </p>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold text-white mb-2">
//               Quick Links
//             </h3>
//             <ul className="space-y-2 text-gray-400 text-sm">
//               <li>
//                 <Link to="/" className="hover:text-white">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/order-now" className="hover:text-white">
//                   Order Now
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/contact" className="hover:text-white">
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
//             <p className="text-sm text-gray-400">
//               Email: support@nycraveit.com
//             </p>
//             <p className="text-sm text-gray-400">Phone: +91 98765 43210</p>
//           </div>
//         </div>

//         <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-5">
//           © {new Date().getFullYear()} NY CraveIt. All rights reserved.
//         </div>
//       </footer> */}
//     </div>
//   );
// };

// export default OrderNow;

import React, { useEffect, useState } from "react";
import api from "../config/Api";
import { Link } from "react-router-dom";

const defaultRestaurants = [
  {
    _id: "1",
    restaurantName: "The Cube - Effotel By Sayaji",
    restaurantImage:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    categories: ["North Indian", "South Indian", "Chinese"],
    rating: 4.6,
    avgPriceForTwo: 2000,
    address: "Hoshangabad Road, Bhopal",
    distance: "9.2 km",
    isPromoted: true,
  },
  {
    _id: "2",
    restaurantName: "Echoes",
    restaurantImage:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
    categories: ["Pizza", "Momos", "Burger"],
    rating: 4.5,
    avgPriceForTwo: 1800,
    address: "Arera Colony, Bhopal",
    distance: "4.5 km",
    isPromoted: true,
  },
  {
    _id: "3",
    restaurantName: "Little Italy",
    restaurantImage:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9",
    categories: ["Italian", "Healthy Food", "Desserts"],
    rating: 4.6,
    avgPriceForTwo: 1700,
    address: "Arera Colony, Bhopal",
    distance: "3.7 km",
    isPromoted: false,
  },
  {
    _id: "4",
    restaurantName: "Spice Garden",
    restaurantImage:
      "https://images.unsplash.com/photo-1604908177070-2b0cfc9c4f6c",
    categories: ["Biryani", "Kebab", "Mughlai"],
    rating: 4.4,
    avgPriceForTwo: 1200,
    address: "MP Nagar, Bhopal",
    distance: "2.1 km",
    isPromoted: false,
  },
  {
    _id: "5",
    restaurantName: "Burger Street",
    restaurantImage:
      "https://images.unsplash.com/photo-1550547660-d9450f859349",
    categories: ["Burger", "Fast Food", "Fries"],
    rating: 4.3,
    avgPriceForTwo: 700,
    address: "New Market, Bhopal",
    distance: "5.0 km",
    isPromoted: true,
  },
];

const OrderNow = () => {
  const [restaurants, setRestaurants] = useState(defaultRestaurants);
  const [loading, setLoading] = useState(false);

  const fetchAllRestaurants = async () => {
    setLoading(true);

    try {
      // NOTE: Update this route according to your backend
      const res = await api.get("/api/public/allRestaurants");
      if (res?.data?.data?.length > 0) {
        setRestaurants(res.data.data);
      } else {
        setRestaurants(defaultRestaurants);
      }
    } catch (error) {
      console.log(error);
      setRestaurants(defaultRestaurants);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllRestaurants();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ================= HERO SECTION ================= */}
      <section className="py-10 bg-gray-100">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Order Now 🍽️</h1>
          <p className="text-gray-600 text-lg mt-3">
            Explore top restaurants and satisfy your cravings instantly.
          </p>
        </div>
      </section>

      {/* ================= FILTER BAR ================= */}
      <section className="max-w-7xl mx-auto px-5 pb-5">
        <div className="bg-white shadow-sm rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <input
            type="text"
            placeholder="Search restaurant..."
            className="w-full md:w-1/2 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select className="w-full md:w-1/4 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option>Sort By</option>
            <option>Rating High to Low</option>
            <option>Price Low to High</option>
            <option>Distance</option>
          </select>

          <button className="w-full md:w-auto bg-(--color-secondary) text-white px-5 py-2 rounded-lg hover:bg-(--color-secondary-hover) transition">
            Apply Filters
          </button>
        </div>
      </section>

      {/* ================= RESTAURANT CARDS ================= */}
      <section className="max-w-7xl mx-auto px-5 pb-16">
        {loading ? (
          <div className="text-center py-12 text-gray-700 font-semibold">
            Loading restaurants...
          </div>
        ) : restaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((restaurant) => (
              <Link
                key={restaurant._id}
                to={`/restaurant/${restaurant._id}`}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
              >
                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={restaurant.restaurantImage}
                    alt={restaurant.restaurantName}
                    className="w-full h-56 object-cover"
                  />

                  {/* PROMOTED */}
                  {restaurant.isPromoted && (
                    <span className="absolute top-3 left-3 bg-gray-800 text-white text-xs px-3 py-1 rounded-md opacity-90">
                      Promoted
                    </span>
                  )}

                  {/* DISCOUNT TAG */}
                  {restaurant.discount && (
                    <span className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-md">
                      Flat {restaurant.discount}% OFF
                    </span>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900 truncate">
                      {restaurant.restaurantName}
                    </h3>

                    <span className="bg-green-600 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                      ⭐ {restaurant.rating}
                    </span>
                  </div>

                  {/* CATEGORIES */}
                  <p className="text-gray-500 text-sm mt-2 truncate">
                    {restaurant.categories?.join(", ")}
                  </p>

                  {/* ADDRESS */}
                  <p className="text-gray-400 text-sm mt-1 truncate">
                    {restaurant.address}
                  </p>

                  {/* PRICE + DISTANCE */}
                  <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                    <p className="font-medium">
                      ₹{restaurant.avgPriceForTwo} for two
                    </p>
                    <p className="text-gray-500">{restaurant.distance}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-600">
            No restaurants found 😢
          </div>
        )}
      </section>
    </div>
  );
};

export default OrderNow;
