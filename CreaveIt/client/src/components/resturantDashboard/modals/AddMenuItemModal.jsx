import React, { useEffect, useState } from "react";
import {
  FaXmark,
  FaPlus,
  FaImage,
  FaTrash,
  FaIndianRupeeSign,
  FaCheck,
} from "react-icons/fa6";
import toast from "react-hot-toast";
import api from "../../../config/Api";

const AddMenuItemModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    price: "",
    cuisine: "",
    type: "",
    preparationTime: "",
    servingSize: "",
    availability: true,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  // Backend images
  const [images, setImages] = useState([]);

  // Preview images
  const [imagePreviews, setImagePreviews] = useState([]);
  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (!selectedFiles.length) return;
    const totalImages = [...images, ...selectedFiles];
    if (totalImages.length > 5) {
      toast.error("Maximum 5 images allowed");
      return;
    }
    const oversizedImage = selectedFiles.find(
      (file) => file.size > 1024 * 1024,
    );

    if (oversizedImage) {
      toast.error("Each image must be less than 1 MB");
      return;
    }
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setImages(totalImages);
    setImagePreviews((prev) => [...prev, ...newPreviews]);

    e.target.value = "";
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.itemName.trim()) {
      newErrors.itemName = "Item name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    }

    if (!formData.cuisine.trim()) {
      newErrors.cuisine = "Cuisine is required";
    }

    if (!formData.servingSize.trim()) {
      newErrors.servingSize = "Serving size is required";
    }

    if (!formData.type) {
      newErrors.type = "Food type is required";
    }

    if (!formData.preparationTime) {
      newErrors.preparationTime = "Preparation time is required";
    }

    if (images.length === 0) {
      newErrors.images = "At least one image is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all required details");
      return;
    }

    setLoading(true);

    try {
      const form_data = new FormData();
      form_data.append("itemName", formData.itemName);
      form_data.append("description", formData.description);
      form_data.append("price", formData.price);
      form_data.append("servingSize", formData.servingSize);
      form_data.append("cuisine", formData.cuisine);
      form_data.append("type", formData.type);
      form_data.append("preparationTime", formData.preparationTime);
      form_data.append(
        "availability",
        formData.availability ? "available" : "unavailable",
      );

      images.forEach((img) => {
        form_data.append("itemImages", img);
      });
      const res = await api.post("/restaurant/addMenuItem", form_data);
      toast.success(res.data.message);
      setTimeout(() => {
        handleClose();
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to add menu item");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    imagePreviews.forEach((preview) => {
      URL.revokeObjectURL(preview);
    });

    setFormData({
      itemName: "",
      description: "",
      price: "",
      cuisine: "",
      type: "",
      preparationTime: "",
      servingSize: "",
      availability: true,
    });

    setImagePreviews([]);
    setImages([]);
    setErrors({});
    setLoading(false);
    onClose();
  };

  // Disable background scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden bg-[#FBF3E7] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1F1811]/10 bg-[#FBF3E7] px-5 py-4 sm:px-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8491D]">
              Restaurant Menu
            </p>

            <h2 className="mt-1 font-[Archivo_Black] text-lg uppercase text-[#1F1811] sm:text-xl">
              Add New Item
            </h2>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex size-9 cursor-pointer items-center justify-center text-[#1F1811] transition hover:bg-[#E8491D] hover:text-white"
          >
            <FaXmark className="text-lg" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-5 sm:p-6"
        >
          <div className="space-y-7">
            {/* Images */}
            <section>
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
                    Visual Content
                  </p>

                  <h3 className="mt-1 font-bold text-[#1F1811]">Item Images</h3>
                </div>

                <span className="text-xs font-medium text-[#8A7C6A]">
                  {images.length}/5 Images
                </span>
              </div>

              {/* Image Preview */}
              {imagePreviews.length > 0 && (
                <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {imagePreviews.map((image, index) => (
                    <div
                      key={index}
                      className="group relative aspect-square overflow-hidden bg-[#1F1811]/5"
                    >
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        className="h-full w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-2 top-2 flex size-7 cursor-pointer items-center justify-center bg-[#E8491D] text-white opacity-0 transition group-hover:opacity-100"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Area */}
              {images.length < 5 && (
                <label
                  htmlFor="itemImages"
                  className="flex min-h-32 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-[#1F1811]/20 bg-white transition hover:border-[#E8491D] hover:bg-[#FBF3E7]"
                >
                  <div className="flex size-10 items-center justify-center bg-[#1F1811] text-[#FBF3E7]">
                    <FaImage />
                  </div>

                  <p className="mt-3 text-sm font-bold text-[#1F1811]">
                    Upload Food Images
                  </p>

                  <p className="mt-1 text-xs text-[#8A7C6A]">
                    Maximum 5 images • Max 1 MB each
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-xs font-bold uppercase text-[#E8491D]">
                    <FaPlus />
                    Select Images
                  </div>

                  <input
                    id="itemImages"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}

              {errors.images && (
                <p className="mt-2 text-xs font-medium text-red-500">
                  {errors.images}
                </p>
              )}
            </section>

            {/* Basic Information */}
            <section>
              <div className="mb-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
                  Basic Details
                </p>

                <h3 className="mt-1 font-bold text-[#1F1811]">
                  Dish Information
                </h3>
              </div>

              <div className="space-y-4">
                {/* Item Name */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
                    Item Name <span className="text-[#E8491D]">*</span>
                  </label>

                  <input
                    type="text"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleInputChange}
                    placeholder="e.g. Hyderabadi Biryani"
                    className={`w-full bg-white px-4 py-3 text-sm text-[#1F1811] outline-none transition focus:ring-1 focus:ring-[#E8491D] ${
                      errors.itemName
                        ? "ring-1 ring-red-500"
                        : "border border-[#1F1811]/10"
                    }`}
                  />

                  {errors.itemName && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.itemName}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
                    Description <span className="text-[#E8491D]">*</span>
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Describe the dish, ingredients and taste..."
                    className={`w-full resize-none bg-white px-4 py-3 text-sm text-[#1F1811] outline-none transition focus:ring-1 focus:ring-[#E8491D] ${
                      errors.description
                        ? "ring-1 ring-red-500"
                        : "border border-[#1F1811]/10"
                    }`}
                  />

                  {errors.description && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.description}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Pricing */}
            <section>
              <div className="mb-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
                  Pricing
                </p>

                <h3 className="mt-1 font-bold text-[#1F1811]">
                  Price & Category
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Price */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
                    Price <span className="text-[#E8491D]">*</span>
                  </label>

                  <div className="flex items-center bg-white border border-[#1F1811]/10">
                    <span className="flex px-3 text-[#E8491D]">
                      <FaIndianRupeeSign />
                    </span>

                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0"
                      min="0"
                      className="w-full px-3 py-3 text-sm outline-none"
                    />
                  </div>

                  {errors.price && (
                    <p className="mt-1 text-xs text-red-500">{errors.price}</p>
                  )}
                </div>

                {/* Serving Size */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
                    Serving Size
                  </label>

                  <input
                    type="text"
                    name="servingSize"
                    value={formData.servingSize}
                    onChange={handleInputChange}
                    placeholder="e.g. 2 Persons"
                    className="w-full border border-[#1F1811]/10 bg-white px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#E8491D]"
                  />

                  {errors.servingSize && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.servingSize}
                    </p>
                  )}
                </div>

                {/* Cuisine */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
                    Cuisine
                  </label>

                  <input
                    type="text"
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleInputChange}
                    placeholder="e.g. Indian"
                    className="w-full border border-[#1F1811]/10 bg-white px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#E8491D]"
                  />

                  {errors.cuisine && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.cuisine}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Attributes */}
            <section>
              <div className="mb-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
                  Attributes
                </p>

                <h3 className="mt-1 font-bold text-[#1F1811]">Food Details</h3>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Food Type */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
                    Food Type <span className="text-[#E8491D]">*</span>
                  </label>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full cursor-pointer border border-[#1F1811]/10 bg-white px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#E8491D]"
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

                  {errors.type && (
                    <p className="mt-1 text-xs text-red-500">{errors.type}</p>
                  )}
                </div>

                {/* Preparation Time */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
                    Preparation Time
                  </label>

                  <input
                    type="number"
                    name="preparationTime"
                    value={formData.preparationTime}
                    onChange={handleInputChange}
                    min="1"
                    placeholder="e.g. 20 minutes"
                    className="w-full border border-[#1F1811]/10 bg-white px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#E8491D]"
                  />

                  {errors.preparationTime && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.preparationTime}
                    </p>
                  )}
                </div>

                {/* Availability */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
                    Availability
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        availability: !prev.availability,
                      }))
                    }
                    className={`flex w-full cursor-pointer items-center justify-between px-4 py-3 text-sm font-bold transition ${
                      formData.availability
                        ? "bg-[#E8491D] text-white"
                        : "bg-[#1F1811]/10 text-[#1F1811]"
                    }`}
                  >
                    <span>
                      {formData.availability ? "Available" : "Unavailable"}
                    </span>

                    {formData.availability && <FaCheck />}
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-8 flex items-center justify-end gap-3 border-t border-[#1F1811]/10 pt-5">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="cursor-pointer px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#1F1811] transition hover:bg-[#1F1811]/10 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex cursor-pointer items-center gap-2 bg-[#E8491D] px-6 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#C93B16] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="animate-spin">◌</span>
                  Adding...
                </>
              ) : (
                <>
                  <FaPlus />
                  Add Item
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMenuItemModal;
