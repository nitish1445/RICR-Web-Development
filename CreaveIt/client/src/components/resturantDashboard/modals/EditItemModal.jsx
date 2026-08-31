import React, { useEffect, useState } from "react";
import { FaTimes, FaPlus, FaImage, FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../../../config/Api";

const EditItemModal = ({ onClose, selectedItem }) => {
  const [formData, setFormData] = useState({
    itemName: "",
    cuisine: "",
    servingSize: "",
    preparationTime: "",
    type: "",
    description: "",
    price: "",
    availability: "",
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      setFormData({
        itemName: selectedItem.itemName || "",
        cuisine: selectedItem.cuisine || "",
        servingSize: selectedItem.servingSize || "",
        preparationTime: selectedItem.preparationTime || "",
        type: selectedItem.type || "",
        description: selectedItem.description || "",
        price: selectedItem.price || "",
        availability: selectedItem.availability || "",
      });

      setExistingImages(selectedItem.images || []);
    }
  }, [selectedItem]);

  // Lock background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = existingImages.length + newImages.length;
    const remainingSlots = 5 - totalImages;

    if (remainingSlots <= 0) {
      toast.error("Maximum 5 images allowed");
      e.target.value = "";
      return;
    }

    if (files.length > remainingSlots) {
      toast.error(`You can upload only ${remainingSlots} more image(s)`);
      setNewImages((prev) => [...prev, ...files.slice(0, remainingSlots)]);
      e.target.value = "";
      return;
    }

    const invalidFile = files.find((file) => !file.type.startsWith("image/"));
    if (invalidFile) {
      toast.error("Only image files are allowed");
      e.target.value = "";
      return;
    }
    setNewImages((prev) => [...prev, ...files]);
    e.target.value = "";
  };

  const handleRemoveExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };
  const handleRemoveNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    if (!formData.itemName.trim()) {
      toast.error("Item name is required");
      return false;
    }

    if (!formData.price) {
      toast.error("Price is required");
      return false;
    }

    if (!formData.cuisine.trim()) {
      toast.error("Cuisine is required");
      return false;
    }

    if (!formData.type) {
      toast.error("Please select food type");
      return false;
    }

    if (!formData.servingSize.trim()) {
      toast.error("Serving size is required");
      return false;
    }

    if (!formData.preparationTime.trim()) {
      toast.error("Preparation time is required");
      return false;
    }

    if (!formData.description.trim()) {
      toast.error("Description is required");
      return false;
    }

    if (existingImages.length === 0 && newImages.length === 0) {
      toast.error("At least one food image is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const submitData = new FormData();

      // Text Fields
      submitData.append("itemName", formData.itemName);
      submitData.append("cuisine", formData.cuisine);
      submitData.append("servingSize", formData.servingSize);
      submitData.append("preparationTime", formData.preparationTime);
      submitData.append("type", formData.type);
      submitData.append("description", formData.description);
      submitData.append("price", formData.price);
      submitData.append("availability", formData.availability);

      // Existing images which should remain
      submitData.append("existingImages", JSON.stringify(existingImages));

      // New images
      newImages.forEach((image) => {
        submitData.append("images", image);
      });

      const res = await api.put(
        `/restaurant/updateMenuItem/${selectedItem._id}`,
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success(res.data.message || "Menu item updated successfully");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to update menu item",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!selectedItem) return null;
  const totalImages = existingImages.length + newImages.length;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-0 sm:p-4">
      <div className="flex h-full w-full flex-col bg-[#FBF3E7] shadow-2xl sm:h-auto sm:max-h-[90vh] sm:max-w-4xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#1F1811]/10 bg-[#FBF3E7] px-5 py-4 sm:px-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
              Menu Management
            </p>

            <h2 className="mt-1 font-[Archivo_Black] text-lg uppercase text-[#1F1811] sm:text-xl">
              Edit Menu Item
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex size-10 cursor-pointer items-center justify-center bg-[#1F1811] text-[#FBF3E7] transition hover:bg-[#E8491D] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto p-5 sm:p-6">
            {/* Basic Information */}
            <div>
              <div className="mb-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
                  Item Information
                </p>

                <h3 className="mt-1 font-[Archivo_Black] text-base uppercase text-[#1F1811]">
                  Basic Details
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Item Name */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
                    Item Name
                  </label>

                  <input
                    type="text"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleInputChange}
                    placeholder="Enter item name"
                    className="w-full border border-[#1F1811]/15 bg-white px-4 py-3 text-sm text-[#1F1811] outline-none transition focus:border-[#E8491D]"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
                    Price
                  </label>

                  <div className="flex border border-[#1F1811]/15 bg-white focus-within:border-[#E8491D]">
                    <span className="flex items-center px-4 font-bold text-[#E8491D]">
                      ₹
                    </span>

                    <input
                      type="number"
                      name="price"
                      min="0"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="Enter price"
                      className="w-full bg-transparent py-3 pr-4 text-sm text-[#1F1811] outline-none"
                    />
                  </div>
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
                    placeholder="Example: Indian"
                    className="w-full border border-[#1F1811]/15 bg-white px-4 py-3 text-sm text-[#1F1811] outline-none transition focus:border-[#E8491D]"
                  />
                </div>

                {/* Food Type */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
                    Food Type
                  </label>

                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full cursor-pointer border border-[#1F1811]/15 bg-white px-4 py-3 text-sm text-[#1F1811] outline-none transition focus:border-[#E8491D]"
                  >
                    <option value="">Select Type</option>
                    <option value="veg">Veg</option>
                    <option value="non-veg">Non Veg</option>
                    <option value="vegan">Vegan</option>
                    <option value="jain">Jain</option>
                    <option value="egg">Egg</option>
                    <option value="gulten-free">Gluten Free</option>
                    <option value="contain-nuts">Contains Nuts</option>
                    <option value="dairy">Dairy</option>
                  </select>
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
                    placeholder="Example: 1 Person"
                    className="w-full border border-[#1F1811]/15 bg-white px-4 py-3 text-sm text-[#1F1811] outline-none transition focus:border-[#E8491D]"
                  />
                </div>

                {/* Preparation Time */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
                    Preparation Time
                  </label>

                  <input
                    type="text"
                    name="preparationTime"
                    value={formData.preparationTime}
                    onChange={handleInputChange}
                    placeholder="Example: 20 mins"
                    className="w-full border border-[#1F1811]/15 bg-white px-4 py-3 text-sm text-[#1F1811] outline-none transition focus:border-[#E8491D]"
                  />
                </div>

                {/* Availability */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
                    Availability
                  </label>

                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className="w-full cursor-pointer border border-[#1F1811]/15 bg-white px-4 py-3 text-sm text-[#1F1811] outline-none transition focus:border-[#E8491D]"
                  >
                    <option value="available">Available</option>

                    <option value="unavailable">Unavailable</option>

                    <option value="removed">Removed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8 border-t border-[#1F1811]/10 pt-6">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Write a short description about this food item..."
                className="w-full resize-none border border-[#1F1811]/15 bg-white px-4 py-3 text-sm leading-relaxed text-[#1F1811] outline-none transition focus:border-[#E8491D]"
              />
            </div>

            {/* Images */}
            <div className="mt-8 border-t border-[#1F1811]/10 pt-6">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
                    Visual Content
                  </p>

                  <h3 className="mt-1 font-[Archivo_Black] text-base uppercase text-[#1F1811]">
                    Food Images
                  </h3>

                  <p className="mt-1 text-xs text-[#8A7C6A]">
                    Add up to 5 images for this menu item.
                  </p>
                </div>

                <div className="bg-[#1F1811] px-3 py-2 text-xs font-bold text-[#FBF3E7]">
                  {totalImages}/5
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {/* Existing Images */}
                {existingImages.map((image, index) => (
                  <div
                    key={`existing-${index}`}
                    className="group relative aspect-square overflow-hidden bg-[#1F1811]/5"
                  >
                    <img
                      src={image.url}
                      alt={`${formData.itemName} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute bottom-0 left-0 bg-[#1F1811] px-2 py-1 text-[8px] font-bold uppercase tracking-wide text-white">
                      Existing
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveExistingImage(index)}
                      className="absolute right-2 top-2 flex size-8 cursor-pointer items-center justify-center bg-[#E8491D] text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                      title="Remove Image"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}

                {/* New Images */}
                {newImages.map((image, index) => (
                  <div
                    key={`new-${index}`}
                    className="group relative aspect-square overflow-hidden bg-[#1F1811]/5"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`New ${index + 1}`}
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute bottom-0 left-0 bg-[#E8491D] px-2 py-1 text-[8px] font-bold uppercase tracking-wide text-white">
                      New
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveNewImage(index)}
                      className="absolute right-2 top-2 flex size-8 cursor-pointer items-center justify-center bg-[#1F1811] text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                      title="Remove Image"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}

                {/* Upload */}
                {totalImages < 5 && (
                  <label className="flex aspect-square cursor-pointer flex-col items-center justify-center border-2 border-dashed border-[#1F1811]/20 bg-white text-[#8A7C6A] transition hover:border-[#E8491D] hover:bg-[#E8491D]/5 hover:text-[#E8491D]">
                    <FaPlus className="text-lg" />

                    <span className="mt-2 text-[9px] font-bold uppercase tracking-wide">
                      Add Image
                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      hidden
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>

              {totalImages === 0 && (
                <div className="mt-3 flex items-center gap-2 text-xs text-[#E8491D]">
                  <FaImage />
                  At least one image is required.
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex shrink-0 items-center justify-end gap-3 border-t border-[#1F1811]/10 bg-[#FBF3E7] px-5 py-4 sm:px-6">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="cursor-pointer px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#1F1811] transition hover:bg-[#1F1811]/5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex min-w-36 cursor-pointer items-center justify-center gap-2 bg-[#E8491D] px-6 py-3 text-xs font-bold uppercase tracking-wide text-[#FBF3E7] transition hover:bg-[#C93B16] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Updating
                </>
              ) : (
                "Update Item"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItemModal;
