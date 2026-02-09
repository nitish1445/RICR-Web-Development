import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../config/Api";

const defaultRestaurant = {
  restaurantName: "The Cube - Effotel By Sayaji",
  categories: ["North Indian", "South Indian", "Continental", "Desserts"],
  address: "Hoshangabad Road, Bhopal",
  fullAddress: "435/14 435/16, Bawadiya Kalan, Hoshangabad Road, Bhopal",
  avgPriceForTwo: 2000,
  phone: "+91 8839000120",
  openTime: "7am",
  closeTime: "11pm",
  isOpen: true,
  diningRating: 4.6,
  diningRatingCount: 236,
  deliveryRating: 4.2,
  deliveryRatingCount: 809,
  restaurantImage:
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  gallery: [
    "https://images.unsplash.com/photo-1552566626-52f8b828add9",
    "https://images.unsplash.com/photo-1604908177070-2b0cfc9c4f6c",
    "https://images.unsplash.com/photo-1550547660-d9450f859349",
  ],
};

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(defaultRestaurant);
  const [loading, setLoading] = useState(false);

  const fetchRestaurantDetails = async () => {
    setLoading(true);
    try {
      // Backend route example:
      // GET /api/public/restaurant/:id
      const res = await api.get(`/public/restaurant/${id}`);

      if (res?.data?.data) {
        setRestaurant(res.data.data);
      }
    } catch (error) {
      console.log("Restaurant Details Error:", error.response?.data || error.message);
      setRestaurant(defaultRestaurant);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurantDetails();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ================= HEADER ================= */}
      {/* <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-red-600">
            NY CraveIt 🍔
          </Link>

          <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
            <Link to="/" className="hover:text-red-600">
              Home
            </Link>
            <Link to="/order-now" className="hover:text-red-600">
              Order Now
            </Link>
            <Link to="/about" className="hover:text-red-600">
              About
            </Link>
          </nav>

          <Link
            to="/cart"
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Cart
          </Link>
        </div>
      </header> */}

      {/* ================= MAIN ================= */}
      <div className="max-w-7xl mx-auto px-5 py-10">
        {loading ? (
          <div className="text-center text-gray-600 font-semibold py-10">
            Loading Restaurant Details...
          </div>
        ) : (
          <>
            {/* ================= TOP DETAILS ================= */}
            <div className="flex flex-col lg:flex-row justify-between gap-8">
              {/* LEFT SIDE */}
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900">
                  {restaurant.restaurantName}
                </h1>

                <p className="text-gray-600 mt-2">
                  {restaurant?.categories?.join(", ")}
                </p>

                <p className="text-gray-500 mt-1">
                  {restaurant.fullAddress || restaurant.address}
                </p>

                {/* STATUS */}
                <div className="flex flex-wrap gap-3 mt-4 text-sm text-gray-700 items-center">
                  <span
                    className={`px-3 py-1 rounded-full font-semibold ${
                      restaurant.isOpen
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {restaurant.isOpen ? "Open now" : "Closed"}
                  </span>

                  <span className="text-gray-500">
                    {restaurant.openTime} - {restaurant.closeTime} (Today)
                  </span>

                  <span className="text-gray-500">
                    ₹{restaurant.avgPriceForTwo} for two
                  </span>

                  <span className="text-gray-500">
                    📞 {restaurant.phone}
                  </span>
                </div>

                {/* BUTTONS */}
                <div className="flex flex-wrap gap-4 mt-6">
                  <button className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-200 transition">
                    📍 Direction
                  </button>

                  <button className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-200 transition">
                    🔗 Share
                  </button>

                  <button className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-200 transition">
                    ⭐ Reviews
                  </button>

                  <button className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-200 transition">
                    🍽️ Book a table
                  </button>
                </div>
              </div>

              {/* RIGHT SIDE RATINGS */}
              <div className="flex gap-8">
                {/* Dining Rating */}
                <div className="text-center">
                  <div className="flex justify-center items-center gap-2">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-lg font-bold">
                      {restaurant.diningRating} ⭐
                    </span>
                    <span className="text-gray-800 font-semibold">
                      {restaurant.diningRatingCount}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Dining Ratings</p>
                </div>

                {/* Delivery Rating */}
                <div className="text-center">
                  <div className="flex justify-center items-center gap-2">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-lg font-bold">
                      {restaurant.deliveryRating} ⭐
                    </span>
                    <span className="text-gray-800 font-semibold">
                      {restaurant.deliveryRatingCount}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Delivery Ratings</p>
                </div>
              </div>
            </div>

            {/* ================= IMAGE GALLERY ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10">
              {/* MAIN IMAGE */}
              <div className="lg:col-span-2">
                <img
                  src={restaurant.restaurantImage}
                  alt="restaurant"
                  className="w-full h-105 object-cover rounded-2xl shadow-md"
                />
              </div>

              {/* SIDE IMAGES */}
              <div className="flex flex-col gap-4">
                {restaurant?.gallery?.slice(0, 2).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="gallery"
                    className="w-full h-50 object-cover rounded-2xl shadow-md"
                  />
                ))}

                {/* VIEW GALLERY */}
                <div className="relative w-full h-50 rounded-2xl overflow-hidden shadow-md">
                  <img
                    src={
                      restaurant?.gallery?.[2] ||
                      "https://images.unsplash.com/photo-1550547660-d9450f859349"
                    }
                    alt="gallery"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <button className="text-white font-semibold text-lg hover:underline">
                      View Gallery
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= MENU SECTION ================= */}
            <div className="mt-12 bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Popular Items 🍕
              </h2>

              <p className="text-gray-500 mt-2">
                This section will show menu items from backend DB.
              </p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(restaurant?.menuItems?.length > 0
                  ? restaurant.menuItems
                  : [
                      {
                        name: "Paneer Butter Masala",
                        price: 250,
                      },
                      {
                        name: "Chicken Biryani",
                        price: 320,
                      },
                      {
                        name: "Veg Pizza",
                        price: 400,
                      },
                    ]
                ).map((item, idx) => (
                  <div
                    key={idx}
                    className="border rounded-xl p-4 flex justify-between items-center hover:shadow-md transition"
                  >
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        ₹{item.price}
                      </p>
                    </div>

                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* ================= FOOTER ================= */}
      {/* <footer className="bg-gray-900 text-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h2 className="text-xl font-bold text-white">NY CraveIt 🍕</h2>
            <p className="text-sm text-gray-400 mt-3">
              Delivering happiness at your doorstep. Fresh food, fast delivery.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/order-now" className="hover:text-white">
                  Order Now
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
            <p className="text-sm text-gray-400">Email: support@nycraveit.com</p>
            <p className="text-sm text-gray-400">Phone: +91 98765 43210</p>
            <p className="text-sm text-gray-400">Location: New York, USA</p>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-6">
          © {new Date().getFullYear()} NY CraveIt. All rights reserved.
        </div>
      </footer> */}
    </div>
  );
};

export default RestaurantDetails;