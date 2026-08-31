import React, { useEffect } from "react";

import {
  FaXmark,
  FaClock,
  FaUtensils,
  FaUsers,
  FaIndianRupeeSign,
  FaCircleCheck,
  FaCircleXmark,
} from "react-icons/fa6";

const ViewItemModal = ({ onClose, selectedItem }) => {
  if (!selectedItem) return null;

  const images = selectedItem?.images?.slice(0, 5) || [];

  const getFoodTypeStyle = () => {
    switch (selectedItem.type) {
      case "veg":
        return "bg-green-100 text-green-700";
      case "non-veg":
        return "bg-red-100 text-red-700";
      case "vegan":
        return "bg-emerald-100 text-emerald-700";
      case "jain":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-[#FBF3E7] text-[#8A7C6A]";
    }
  };

  const isAvailable = selectedItem.availability === "available";

  // Disable background scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden bg-[#FBF3E7] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1F1811]/10 bg-[#FBF3E7] px-5 py-4 sm:px-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
              Menu Item Details
            </p>

            <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase text-[#1F1811] sm:text-2xl">
              {selectedItem.itemName}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="flex size-10 cursor-pointer items-center justify-center bg-[#1F1811] text-[#FBF3E7] transition hover:bg-[#E8491D]"
          >
            <FaXmark className="text-lg" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-5 sm:p-6">
          {/* Images */}
          {images.length > 0 && (
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                Food Images
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square overflow-hidden bg-[#1F1811]/5"
                  >
                    <img
                      src={image?.url}
                      alt={`${selectedItem.itemName} ${index + 1}`}
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Price + Status */}
          <div className="mt-6 grid grid-cols-1 gap-4 border-y border-[#1F1811]/10 py-5 sm:grid-cols-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                Price
              </p>

              <div className="mt-2 flex items-center gap-1 text-2xl font-bold text-[#E8491D]">
                <FaIndianRupeeSign className="text-lg" />
                {Number(selectedItem.price || 0).toFixed(2)}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                Food Type
              </p>

              <span
                className={`mt-2 inline-block px-3 py-1 text-xs font-bold uppercase ${getFoodTypeStyle()}`}
              >
                {selectedItem.type || "N/A"}
              </span>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                Availability
              </p>

              <div
                className={`mt-2 flex items-center gap-2 text-sm font-bold ${
                  isAvailable ? "text-green-600" : "text-red-600"
                }`}
              >
                {isAvailable ? <FaCircleCheck /> : <FaCircleXmark />}

                <span className="capitalize">{selectedItem.availability}</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="mt-6">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
              Item Information
            </p>

            <div className="grid grid-cols-1 border border-[#1F1811]/10 sm:grid-cols-2">
              <div className="flex items-center gap-4 border-b border-[#1F1811]/10 p-4 sm:border-r">
                <div className="flex size-10 items-center justify-center bg-[#E8491D]/10 text-[#E8491D]">
                  <FaUtensils />
                </div>

                <div>
                  <p className="text-xs text-[#8A7C6A]">Cuisine</p>

                  <p className="mt-1 font-bold capitalize text-[#1F1811]">
                    {selectedItem.cuisine || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 border-b border-[#1F1811]/10 p-4">
                <div className="flex size-10 items-center justify-center bg-[#E8491D]/10 text-[#E8491D]">
                  <FaUsers />
                </div>

                <div>
                  <p className="text-xs text-[#8A7C6A]">Serving Size</p>

                  <p className="mt-1 font-bold text-[#1F1811]">
                    {selectedItem.servingSize || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 sm:border-r sm:border-[#1F1811]/10">
                <div className="flex size-10 items-center justify-center bg-[#E8491D]/10 text-[#E8491D]">
                  <FaClock />
                </div>

                <div>
                  <p className="text-xs text-[#8A7C6A]">Preparation Time</p>

                  <p className="mt-1 font-bold text-[#1F1811]">
                    {selectedItem.preparationTime || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4">
                <div className="flex size-10 items-center justify-center bg-[#E8491D]/10 text-[#E8491D]">
                  <FaUtensils />
                </div>

                <div>
                  <p className="text-xs text-[#8A7C6A]">Item Name</p>

                  <p className="mt-1 font-bold text-[#1F1811]">
                    {selectedItem.itemName}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
              Description
            </p>

            <div className="bg-white p-4 text-sm leading-relaxed text-[#5F5549]">
              {selectedItem.description || "No description available."}
            </div>
          </div>

          {/* Metadata */}
          <div className="mt-6 flex flex-col gap-2 border-t border-[#1F1811]/10 pt-4 text-xs text-[#8A7C6A] sm:flex-row sm:justify-between">
            <p>
              Created:{" "}
              {selectedItem.createdAt
                ? new Date(selectedItem.createdAt).toLocaleDateString()
                : "N/A"}
            </p>

            <p>
              Last Updated:{" "}
              {selectedItem.updatedAt
                ? new Date(selectedItem.updatedAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#1F1811]/10 bg-[#FBF3E7] p-4">
          <button
            onClick={onClose}
            className="w-full cursor-pointer bg-[#1F1811] px-5 py-3 text-sm font-bold uppercase tracking-wide text-[#FBF3E7] transition hover:bg-[#E8491D]"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewItemModal;
