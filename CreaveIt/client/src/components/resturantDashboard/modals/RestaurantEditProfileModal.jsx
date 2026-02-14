import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../config/Api";
import { GiCancel } from "react-icons/gi";
import toast from "react-hot-toast";

const RestaurantEditProfileModal = ({ onClose }) => {
  const { user, setUser, setIsLogin } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    gender: user?.gender || "",
    dob: user?.dob || "",
    address: user?.address || "",
    city: user?.city || "",
    pin: user?.pin || "",
    restaurantName: user?.restaurantName || "",
    cuisine: user?.cuisine || "",
    document: {
      gst: user?.document?.gst || "",
      fssai: user?.document?.fssai || "",
    },
    paymentDetail: {
      upi: user?.paymentDetail?.upi || "",
      account_number: user?.paymentDetail?.account_number || "",
      ifs_Code: user?.paymentDetail?.ifs_Code || "",
    },
    geoLocation: {
      lat: user?.geoLocation?.lat || "",
      lon: user?.geoLocation?.lon || "",
    },
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone) {
      newErrors.phone = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Mobile number must be 10 digits";
    }

    if (!formData.city) {
      newErrors.city = "City is required";
    }

    if (!formData.pin) {
      newErrors.pin = "PIN code is required";
    } else if (!/^\d{6}$/.test(formData.pin)) {
      newErrors.pin = "PIN code must be 6 digits";
    }

    if (!formData.restaurantName) {
      newErrors.restaurantName = "Restaurant name is required";
    }

    if (
      formData.paymentDetail.upi &&
      !/^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/.test(formData.paymentDetail.upi)
    ) {
      newErrors.upi = "Invalid UPI format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData({
      ...formData,
      [parent]: {
        ...formData[parent],
        [field]: value,
      },
    });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const fetchLocation = (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition((result) => {
      setFormData({
        ...formData,
        geoLocation: {
          ...formData["geoLocation"],
          lat: result.coords.latitude,
          lon: result.coords.longitude,
        },
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    if (!validateForm()) {
      setMessage({ type: "error", text: "Please fix the errors above" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await api.put("/restaurant/update", formData);
      if (res.data?.data) {
        sessionStorage.setItem("CraveItUser", JSON.stringify(res.data.data));
        setUser(res.data.data);
        setIsLogin(true);
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setTimeout(() => onClose(), 1500);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to update profile",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-100">
        <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg">
          <div className="flex justify-between px-6 py-4 border-b border-gray-300 items-center sticky top-0 bg-white">
            <h2 className="text-xl font-semibold text-gray-800">
              Edit Restaurant Profile
            </h2>
            <button
              onClick={() => onClose()}
              className="text-red-400 hover:text-red-700 text-2xl cursor-pointer"
            >
              <GiCancel />
            </button>
          </div>

          {message.text && (
            <div
              className={`mx-6 mt-4 p-4 rounded-md ${
                message.type === "success"
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Personal Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Manager's Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.fullName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter manager name"
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                  <p className="text-red-500 text-xs mt-1">
                    Email cannot be changed
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="10-digit mobile number"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Restaurant Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                Restaurant Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Restaurant Name *
                  </label>
                  <input
                    type="text"
                    name="restaurantName"
                    value={formData.restaurantName}
                    onChange={handleInputChange}
                    className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.restaurantName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter restaurant name"
                  />
                  {errors.restaurantName && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.restaurantName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cuisine Type
                  </label>
                  <input
                    type="text"
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Italian, Indian, Chinese"
                  />
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                Address
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter restaurant address"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter city"
                    />
                    {errors.city && (
                      <p className="text-red-600 text-xs mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pin Code *
                    </label>
                    <input
                      type="text"
                      name="pin"
                      value={formData.pin}
                      onChange={handleInputChange}
                      className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.pin ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="6-digit PIN"
                      maxLength="6"
                    />
                    {errors.pin && (
                      <p className="text-red-600 text-xs mt-1">{errors.pin}</p>
                    )}
                  </div>
                  <div className="flex items-end">
                    <div className="h-fit flex items-center w-full gap-4">
                      <button
                        className="w-full border border-gray-300 bg-green-50 rounded-md shadow-sm p-2 h-fit cursor-pointer"
                        onClick={fetchLocation}
                      >
                        Get Live Location
                      </button>
                      {formData.geoLocation.lat !== "N/A" &&
                      formData.geoLocation.lon !== "N/A"
                        ? "✅"
                        : "❌"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Documents Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                Business Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GST Certificate
                  </label>
                  <input
                    type="text"
                    value={formData.document.gst}
                    onChange={(e) =>
                      handleNestedChange("document", "gst", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="GST number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    FSSAI License
                  </label>
                  <input
                    type="text"
                    value={formData.document.fssai}
                    onChange={(e) =>
                      handleNestedChange("document", "fssai", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="FSSAI registration number"
                  />
                </div>
              </div>
            </div>

            {/* Payment Details Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
                Payment Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    value={formData.paymentDetail.upi}
                    onChange={(e) =>
                      handleNestedChange("paymentDetail", "upi", e.target.value)
                    }
                    className={`w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.upi ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="username@bank"
                  />
                  {errors.upi && (
                    <p className="text-red-600 text-xs mt-1">{errors.upi}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={formData.paymentDetail.account_number}
                    onChange={(e) =>
                      handleNestedChange(
                        "paymentDetail",
                        "account_number",
                        e.target.value,
                      )
                    }
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Bank account number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    value={formData.paymentDetail.ifs_Code}
                    onChange={(e) =>
                      handleNestedChange(
                        "paymentDetail",
                        "ifs_Code",
                        e.target.value,
                      )
                    }
                    className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="IFSC code"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-300">
              <button
                type="button"
                onClick={() => onClose()}
                disabled={loading}
                className=" cursor-pointer px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer px-6 py-2 bg-(--color-secondary) text-white rounded-md hover:bg-(--color-secondary-hover) transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin">⟳</span> Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default RestaurantEditProfileModal;
