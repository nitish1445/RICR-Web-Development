import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../config/Api";
import {
  FaXmark,
  FaUser,
  FaStore,
  FaLocationDot,
  FaFileShield,
  FaWallet,
  FaLocationCrosshairs,
  FaCheck,
} from "react-icons/fa6";
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
      setErrors({
        ...errors,
        [name]: "",
      });
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
      setErrors({
        ...errors,
        [field]: "",
      });
    }
  };

  const fetchLocation = (e) => {
    e.preventDefault();

    navigator.geolocation.getCurrentPosition(
      (result) => {
        setFormData({
          ...formData,
          geoLocation: {
            ...formData.geoLocation,
            lat: result.coords.latitude,
            lon: result.coords.longitude,
          },
        });

        toast.success("Live location captured");
      },
      () => {
        toast.error("Unable to fetch location");
      },
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user?.email === "manager@gmail.com") {
      return toast.error("Dummy Manager can't process this task.");
    }
    if (!validateForm()) {
      setMessage({
        type: "error",
        text: "Please fix the errors above",
      });

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

        setMessage({
          type: "success",
          text: "Profile updated successfully!",
        });
        toast.success(res.data.message || "Profile updated successfully!");
        setTimeout(() => onClose(), 1200);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update profile");
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to update profile",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (error) =>
    `w-full bg-[#FBF3E7]/50 px-4 py-3 text-sm text-[#1F1811] outline-none transition placeholder:text-[#8A7C6A]/60 focus:bg-white ${
      error
        ? "ring-1 ring-red-500"
        : "border border-[#1F1811]/10 focus:border-[#E8491D]"
    }`;

  const sectionTitle = (icon, title, subtitle) => (
    <div className="mb-5 flex items-start gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center bg-[#1F1811] text-[#FBF3E7]">
        {icon}
      </div>

      <div>
        <h3 className="font-[Archivo_Black] text-sm uppercase text-[#1F1811]">
          {title}
        </h3>

        <p className="mt-1 text-xs text-[#8A7C6A]">{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-[#1F1811]/80 p-3 sm:p-6">
      <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden bg-[#FBF3E7] shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#1F1811]/10 bg-[#FBF3E7] px-5 py-4 sm:px-7">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8491D]">
              Restaurant Dashboard
            </p>

            <h2 className="mt-1 font-[Archivo_Black] text-lg uppercase text-[#1F1811] sm:text-xl">
              Edit Profile
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex size-10 cursor-pointer items-center justify-center bg-[#1F1811] text-lg text-[#FBF3E7] transition hover:bg-[#E8491D] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaXmark />
          </button>
        </div>

        {/* Scroll Content */}
        <div className="overflow-y-auto">
          {message.text && (
            <div
              className={`mx-5 mt-5 px-4 py-3 text-sm font-medium sm:mx-7 ${
                message.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8 p-5 sm:p-7">
            {/* Personal Information */}
            <section>
              {sectionTitle(
                <FaUser />,
                "Personal Information",
                "Update your manager account details",
              )}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
                    Manager Full Name *
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={inputClass(errors.fullName)}
                    placeholder="Enter manager name"
                  />

                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full cursor-not-allowed bg-[#1F1811]/5 px-4 py-3 text-sm text-[#8A7C6A]"
                  />

                  <p className="mt-1 text-[11px] text-[#E8491D]">
                    Email address cannot be changed
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
                    Mobile Number *
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={inputClass(errors.phone)}
                    placeholder="10-digit mobile number"
                  />

                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
                    Gender
                  </label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={inputClass()}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className={inputClass()}
                  />
                </div>
              </div>
            </section>

            {/* Restaurant Information */}
            <section className="border-t border-[#1F1811]/10 pt-8">
              {sectionTitle(
                <FaStore />,
                "Restaurant Information",
                "Manage your restaurant identity and cuisine",
              )}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
                    Restaurant Name *
                  </label>

                  <input
                    type="text"
                    name="restaurantName"
                    value={formData.restaurantName}
                    onChange={handleInputChange}
                    className={inputClass(errors.restaurantName)}
                    placeholder="Enter restaurant name"
                  />

                  {errors.restaurantName && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.restaurantName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
                    Cuisine Type
                  </label>

                  <input
                    type="text"
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleInputChange}
                    className={inputClass()}
                    placeholder="Indian, Italian, Chinese..."
                  />
                </div>
              </div>
            </section>

            {/* Address */}
            <section className="border-t border-[#1F1811]/10 pt-8">
              {sectionTitle(
                <FaLocationDot />,
                "Restaurant Address",
                "Update your restaurant location details",
              )}

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
                    Complete Address
                  </label>

                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={inputClass()}
                    placeholder="Enter restaurant address"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
                      City *
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={inputClass(errors.city)}
                      placeholder="Enter city"
                    />

                    {errors.city && (
                      <p className="mt-1 text-xs text-red-500">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
                      PIN Code *
                    </label>

                    <input
                      type="text"
                      name="pin"
                      value={formData.pin}
                      onChange={handleInputChange}
                      maxLength="6"
                      className={inputClass(errors.pin)}
                      placeholder="6-digit PIN"
                    />

                    {errors.pin && (
                      <p className="mt-1 text-xs text-red-500">{errors.pin}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
                      Live Location
                    </label>

                    <button
                      type="button"
                      onClick={fetchLocation}
                      className="flex w-full cursor-pointer items-center justify-center gap-2 bg-[#1F1811] px-4 py-3 text-sm font-bold text-[#FBF3E7] transition hover:bg-[#E8491D]"
                    >
                      <FaLocationCrosshairs />
                      Get Current Location
                    </button>
                  </div>
                </div>

                {(formData.geoLocation.lat || formData.geoLocation.lon) && (
                  <div className="flex items-center gap-2 bg-green-50 px-4 py-3 text-xs font-medium text-green-700">
                    <FaCheck />
                    Location coordinates successfully captured
                  </div>
                )}
              </div>
            </section>

            {/* Documents */}
            <section className="border-t border-[#1F1811]/10 pt-8">
              {sectionTitle(
                <FaFileShield />,
                "Business Documents",
                "Manage your restaurant registration details",
              )}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
                    GST Number
                  </label>

                  <input
                    type="text"
                    value={formData.document.gst}
                    onChange={(e) =>
                      handleNestedChange("document", "gst", e.target.value)
                    }
                    className={inputClass()}
                    placeholder="Enter GST number"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
                    FSSAI License
                  </label>

                  <input
                    type="text"
                    value={formData.document.fssai}
                    onChange={(e) =>
                      handleNestedChange("document", "fssai", e.target.value)
                    }
                    className={inputClass()}
                    placeholder="Enter FSSAI number"
                  />
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="border-t border-[#1F1811]/10 pt-8">
              {sectionTitle(
                <FaWallet />,
                "Payment Details",
                "Update settlement and payment information",
              )}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
                    UPI ID
                  </label>

                  <input
                    type="text"
                    value={formData.paymentDetail.upi}
                    onChange={(e) =>
                      handleNestedChange("paymentDetail", "upi", e.target.value)
                    }
                    className={inputClass(errors.upi)}
                    placeholder="username@bank"
                  />

                  {errors.upi && (
                    <p className="mt-1 text-xs text-red-500">{errors.upi}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
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
                    className={inputClass()}
                    placeholder="Bank account number"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1F1811]">
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
                    className={inputClass()}
                    placeholder="Enter IFSC code"
                  />
                </div>
              </div>
            </section>

            {/* Actions */}
            <div className="sticky bottom-0 -mx-5 flex flex-col-reverse gap-3 border-t border-[#1F1811]/10 bg-[#FBF3E7] px-5 pt-5 sm:-mx-7 sm:flex-row sm:justify-end sm:px-7">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="cursor-pointer bg-[#1F1811]/10 px-6 py-3 text-sm font-bold text-[#1F1811] transition hover:bg-[#1F1811]/20 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex cursor-pointer items-center justify-center gap-2 bg-[#E8491D] px-7 py-3 text-sm font-bold text-[#FBF3E7] transition hover:bg-[#C93B16] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="animate-spin">⟳</span>
                    Saving Changes...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RestaurantEditProfileModal;
