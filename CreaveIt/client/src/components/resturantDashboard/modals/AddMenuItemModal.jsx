import React, { useState } from "react";
import { GiCancel } from "react-icons/gi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import toast from "react-hot-toast";
import api from "../../../config/Api"

const AddMenuItemModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    price: "",
    category: "",
    cuisine: "",
    type: "",
    preparationTime: "",
    availability: true,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleImageChange = {
    // handfle file image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    try {
      console.log(formData);
      
      // transfer menu data to form data
      const form_Data = new FormData();
      const res = await api.post("/menu/add", form_Data);
      toast.success(res.data.message);
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      console.log(error);
      toast.error(error?.respone?.data?.message || "Unknown Error");
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
        <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg">
          <div className="flex justify-between px-6 py-4 border-b border-gray-300 items-center sticky top-0 bg-white">
            <h2 className="text-xl font-semibold text-gray-800">
              Add Menu Item
            </h2>
            <button
              onClick={() => onClose()}
              className="text-red-400 hover:text-red-700 text-2xl cursor-pointer"
            >
              <GiCancel />
            </button>
          </div>

          {/* Menu Detail */}

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Item image Section */}

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                Item Image
              </h3>
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleInputChange}
                accept="image/*"
                multiple
              />
            </div>

            {/* Basic Detail of dish */}

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Name <span className="text-red-500 ">*</span>
                  </label>
                  <input
                    type="text"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleInputChange}
                    placeholder="e.g., Hyderabadi Briyani"
                    className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500 ">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Describe the dish, ingredients, etc.. "
                    className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300`}
                  />
                </div>
              </div>
            </div>

            {/* Pricing & category section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                Pricing & Category
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <div className="flex gap-1.5 items-center">
                      Price in <FaIndianRupeeSign className="text-xs" />{" "}
                      <span className="text-red-500 ">*</span>
                    </div>
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    placeholder="Enter the amount of item"
                    className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500 ">*</span>
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    placeholder="e.g., Main Course, Appetizer"
                    className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cuisine <span className="text-red-500 ">*</span>
                  </label>
                  <input
                    type="text"
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    placeholder="e.g., Indian, Italian ..."
                    className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300`}
                  />
                </div>
              </div>
            </div>

            {/* Attribuites Section */}

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                Item Attributes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Food Type <span className="text-red-500 ">*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 cursor-pointer"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="veg">Vegetarian</option>
                    <option value="non-veg">Non-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="egg">Egg</option>
                    <option value="jain">Jain</option>
                    <option value="gluten-free">Gluten-Free</option>
                    <option value="contains-nuts">Contains Nuts</option>
                    <option value="dairy">Dairy</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor=""
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Preparation Time (minutes){" "}
                    <span className="text-red-500 ">*</span>
                  </label>
                  <input
                    type="text"
                    name="preparationTime"
                    value={formData.preparationTime}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="e.g., 15"
                    className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300`}
                  />
                </div>

                <div className="flex items-center gap-3 justify-end">
                  <input
                    type="checkbox"
                    name="availability"
                    checked={formData.availability}
                    onChange={handleInputChange}
                    className=" text-green-600 border-gray-300 rounded-full focus:ring-green-500 cursor-pointer"
                  />
                  <label
                    htmlFor="availability"
                    className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer"
                  >
                    Available <span className="text-red-500 ">*</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Form Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-300">
              <button
                type="button"
                onClick={() => onClose()}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-(--color-secondary) text-(--color-primary) rounded-md hover:bg-(--color-secondary-hover) transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex gap-3 items-center"
              >
                {loading ? (
                  <>
                    <span className="animate-spin">⟳</span> Adding..
                  </>
                ) : (
                  "Add Items"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddMenuItemModal;
