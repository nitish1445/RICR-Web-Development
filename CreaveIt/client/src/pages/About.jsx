import React from "react";

const About = () => {
  return (
    <div className="bg-linear-to-br from-orange-50 via-white to-red-50 min-h-screen px-6 md:px-20 py-16">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
          About <span className="text-orange-500">CraveIt</span>
        </h1>

        <p className="mt-4 text-gray-700 text-lg leading-relaxed text-center">
          Craving something crispy, cheesy, and full of flavor? CraveIt brings
          you hot, freshly prepared meals straight from your favorite
          restaurants. From crunchy bites to juicy burgers and spicy delights -
          every order is packed with taste and delivered fast.
        </p>
      </div>

      {/* Main About Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        {/* Left Text */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Who We Are </h2>

          <p className="mt-5 text-gray-600 text-lg leading-relaxed">
            At <span className="font-semibold text-orange-500">CraveIt</span>,
            we believe food is more than just a meal — it’s comfort, happiness,
            and a way to connect.
          </p>

          <p className="mt-4 text-gray-600 text-lg leading-relaxed">
            Whether you’re ordering a quick snack, planning a dinner, or picking
            up your meal on the go, CraveIt makes it effortless. We partner with
            top-rated restaurants and ensure your food arrives fresh, fast, and
            full of flavor.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition duration-300">
              Explore Restaurants
            </button>

            <button className="cursor-pointer border border-orange-400 text-orange-500 hover:bg-orange-100 px-6 py-3 rounded-full font-semibold transition duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Card */}
        <div className="bg-white/80 rounded-3xl shadow-xl p-10 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900">What We Offer </h3>

          <ul className="mt-6 space-y-5 text-gray-700 text-lg">
            <li className="flex items-center gap-3">
              <span className="text-orange-500 text-2xl">✔</span>
              Fast & reliable doorstep delivery
            </li>

            <li className="flex items-center gap-3">
              <span className="text-orange-500 text-2xl">✔</span>
              Take-in option for quick pickup
            </li>

            <li className="flex items-center gap-3">
              <span className="text-orange-500 text-2xl">✔</span>
              Best local restaurants and cuisines
            </li>

            <li className="flex items-center gap-3">
              <span className="text-orange-500 text-2xl">✔</span>
              Smooth ordering with real-time updates
            </li>

            <li className="flex items-center gap-3">
              <span className="text-orange-500 text-2xl">✔</span>
              Secure payments & exclusive deals
            </li>
          </ul>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mt-20 max-w-6xl mx-auto bg-linear-to-r from-orange-500 to-red-500 text-white rounded-3xl shadow-2xl p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold">Our Mission</h2>

        <p className="mt-6 text-lg md:text-xl text-white/90 leading-relaxed max-w-4xl mx-auto">
          We’re on a mission to make food ordering effortless, modern, and
          exciting. From doorstep delivery to take-in pickup, CraveIt is built
          to match your lifestyle.
        </p>
      </div>

      {/* Footer Section */}
      <div className="mt-20 text-center text-gray-600">
        <p className="text-lg">
          Made with ♥️ by
          <span className="font-semibold text-orange-500">CraveIt</span>
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Fresh food. Fast delivery. Happy cravings.
        </p>
      </div>
    </div>
  );
};

export default About;
