import React from "react";
import { Link } from "react-router-dom";
import { FaTriangleExclamation } from "react-icons/fa6";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 via-white to-gray-100 px-6">
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-10 text-center border border-gray-200">
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-red-50">
            <FaTriangleExclamation className="text-red-500 text-4xl" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-6xl font-extrabold text-gray-800 tracking-tight">
          404
        </h1>

        <p className="text-xl font-semibold text-gray-700 mt-2">
          Page Not Found
        </p>

        <p className="text-gray-500 mt-4 leading-relaxed">
          Oops! The page you are looking for doesn't exist.
        </p>

        {/* Button */}
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-2 rounded-xl bg-(--color-secondary) text-white font-semibold shadow-md hover:bg-(--color-secondary-hover) transition duration-300"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 rounded-xl bg-gray-200 text-gray-700 font-semibold shadow-sm hover:bg-gray-300 transition duration-300 cursor-pointer"
          >
            Go Back
          </button>
        </div>

        {/* Footer Text */}
        <p className="text-xs text-gray-400 mt-10">
          © {new Date().getFullYear()} CraveIt. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
