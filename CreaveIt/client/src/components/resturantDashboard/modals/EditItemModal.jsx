import React, { useState } from "react";
import { GiCancel } from "react-icons/gi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import toast from "react-hot-toast";
import api from "../../../config/Api";

const EditItemModal = ({ onClose, selectedItem }) => {
  const [formData, setFormData] = useState({
    itemName: selectedItem?.itemName,
    description: selectedItem?.description,
    price: selectedItem?.price || "",
    cuisine: selectedItem?.cuisine || "",
    type: selectedItem?.type || "",
    preparationTime: selectedItem?.preparationTime || "",
    servingSize: selectedItem?.servingSize || "",
    availability: selectedItem?.availability || "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // for backend
  const [images, setImages] = useState([]);

  // for frontend
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

  const handleImageChange = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    let temp = [];
    fileArray.forEach((img) => {
      let imgURL = URL.createObjectURL(img);
      temp.push(imgURL);
    });
    //slice == max length limit of array -1
    setImagePreviews(temp.slice(0, 5));
    setImages(fileArray.slice(0, 5));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // transfer menu data to form data

      const form_data = new FormData();
      form_data.append("itemName", formData.itemName);
      form_data.append("description", formData.description);
      form_data.append("price", formData.price);
      form_data.append("servingSize", formData.servingSize);
      form_data.append("cuisine", formData.cuisine);
      form_data.append("type", formData.type);
      form_data.append("preparationTime", formData.preparationTime);
      form_data.append("availability", formData.availability);
      images.forEach((img) => {
        form_data.append("itemImages", img);
      });

      //connect backend
      const res = await api.put(
        `/restaurant/updateMenuItem/${selectedItem._id}`,
        form_data,
      );
      toast.success(res.data.message);
      setTimeout(handleClose, 1500);
    } catch (error) {
      console.log(error);
      toast.error(error?.respone?.data?.message || "Unknown Error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      itemName: "",
      description: "",
      price: "",
      cuisine: "",
      type: "",
      preparationTime: "",
      servingSize: "",
      availability: "",
    });

    setImagePreviews([]);
    setImages([]);
    setErrors("");
    setLoading(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-100">
        <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg">
          <div className="flex justify-between px-6 py-4 border-b border-gray-300 items-center sticky top-0 bg-white">
            <h2 className="text-xl font-semibold text-gray-800">
              Update Menu Item
            </h2>
            <button
              onClick={handleClose}
              className="text-red-400 hover:text-red-700 text-2xl cursor-pointer"
            >
              <GiCancel />
            </button>
          </div>

          {/* Menu Detail */}

          <form
            onSubmit={handleSubmit}
            onReset={handleClose}
            className="p-6 space-y-6"
          >
            {/* Item image Section */}

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                Item Image
              </h3>

              <div className="flex items-end gap-4">
                <label
                  htmlFor="image"
                  className="px-6 py-2 w-fit bg-(--color-secondary) text-white rounded-md hover:bg-(--color-secondary-hover) transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex gap-3 items-center"
                >
                  Add Image
                </label>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600">
                    (Upto 5 images allowed)
                  </span>
                  <span className="text-sm text-gray-600">
                    (Max size 1 MB each.)
                  </span>
                </div>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                  multiple
                />
              </div>
              <div className="pt-2">
                <p className="text-sm text-gray-600">
                  Upload new images if you want to change them
                </p>
              </div>
              {imagePreviews.length !== 0 && (
                <div className="mt-3 grid grid-cols-5 gap-1">
                  {imagePreviews.map((itemImg, idx) => (
                    <div
                      className="border rounded-md w-30 h-30 overflow-hidden"
                      key={idx}
                    >
                      <img
                        src={itemImg}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    Serving Size <span className="text-red-500 ">*</span>
                  </label>
                  <input
                    type="text"
                    name="servingSize"
                    value={formData.servingSize}
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
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
                    type="number"
                    name="preparationTime"
                    value={formData.preparationTime}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="e.g., 15"
                    className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300`}
                  />
                </div>

                <div className="flex gap-3 justify-start">
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className="w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 cursor-pointer"
                    required
                  >
                    <option value="">Select Availability</option>
                    <option value="available">Available</option>
                    <option value="unavailable">Unavailable</option>
                    <option value="removed">Removed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Form Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-300">
              <button
                type="button"
                onClick={handleClose}
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
                    <span className="animate-spin">⟳</span> Updating..
                  </>
                ) : (
                  "Update Items"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditItemModal;
