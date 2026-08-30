import React, { useEffect, useState } from "react";
import { FaLocationDot, FaXmark, FaLocationCrosshairs } from "react-icons/fa6";
import toast from "react-hot-toast";
import api from "../../../config/Api";
import { useAuth } from "../../../context/AuthContext";

const EditAddressModal = ({ isOpen, onClose }) => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    pin: "",
    geolocation: {
      lat: "N/A",
      lon: "N/A",
    },
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  // Prefill existing address data
  useEffect(() => {
    if (isOpen && user) {
      setFormData({
        address: user?.address || "",
        city: user?.city || "",
        pin: user?.pin || "",
        geolocation: {
          lat: user?.geolocation?.lat || "N/A",
          lon: user?.geolocation?.lon || "N/A",
        },
      });

      setErrors({});
    }
  }, [isOpen, user]);

  // Disable background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.pin.trim()) {
      newErrors.pin = "PIN code is required";
    } else if (!/^\d{6}$/.test(formData.pin)) {
      newErrors.pin = "PIN code must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Get user's current geolocation
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }
    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData((prev) => ({
          ...prev,
          geolocation: {
            lat: latitude.toString(),
            lon: longitude.toString(),
          },
        }));
        console.log(latitude, longitude);
        setLocationLoading(false);
        toast.success("Current location captured");
      },
      (error) => {
        console.error("Geolocation error:", error);
        let message = "Unable to get your location";

        if (error.code === 1) {
          message = "Location permission denied";
        }

        if (error.code === 2) {
          message = "Location information unavailable";
        }

        if (error.code === 3) {
          message = "Location request timed out";
        }

        toast.error(message);
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const payload = {
        address: formData.address,
        city: formData.city,
        pin: formData.pin,
        geolocation: {
          lat: formData.geolocation.lat,
          lon: formData.geolocation.lon,
        },
      };

      const res = await api.patch("/user/updateAddress", payload);
      console.log(res.data.data);
      setUser(res?.data?.data);
      toast.success(res?.data?.message || "Address updated successfully");
      onClose();
    } catch (error) {
      console.log("Address update error:", error);
      toast.error(error?.response?.data?.message || "Unable to update address");
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      onClose();
    }
  };

  const hasLocation =
    formData.geolocation?.lat !== "N/A" && formData.geolocation?.lon !== "N/A";

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-999 flex items-center justify-center bg-[#1F1811]/40 px-4 backdrop-blur-md"
    >
      <div className="w-full max-w-xl overflow-hidden bg-[#FBF3E7] shadow-[0_25px_80px_rgba(31,24,17,0.35)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1F1811]/10 px-5 py-3 sm:px-6">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#E8491D]">
              Location Settings
            </p>

            <h2 className="mt-1 font-[Archivo_Black] text-lg uppercase text-[#1F1811]">
              Edit Address
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex size-9 cursor-pointer items-center justify-center bg-[#1F1811]/5 text-[#1F1811] transition hover:bg-[#E8491D] hover:text-[#FBF3E7] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaXmark className="text-base" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-5 sm:p-6">
            {/* Title Section */}
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-11 items-center justify-center bg-[#E8491D]/10 text-[#E8491D]">
                <FaLocationDot className="text-lg" />
              </div>

              <div>
                <p className="text-sm font-bold text-[#1F1811]">
                  Delivery Address
                </p>

                <p className="text-[11px] text-[#8A7C6A]">
                  Update your preferred delivery location.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Complete Address */}
              <div>
                <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-[#5F5143]">
                  Complete Address *
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Enter your complete address"
                  className={`w-full resize-none bg-white px-4 py-3 text-sm text-[#1F1811] outline-none transition-shadow duration-200 placeholder:text-[#8A7C6A]/60 focus:ring-2 focus:ring-[#E8491D]/20 ${errors.address ? "ring-1 ring-[#E8491D]" : ""}`}
                />

                {errors.address && (
                  <p className="mt-1 text-[10px] font-semibold text-[#E8491D]">
                    {errors.address}
                  </p>
                )}
              </div>

              {/* City + PIN */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-[#5F5143]">
                    City *
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    className={`w-full bg-white px-4 py-3 text-sm text-[#1F1811] outline-none transition-shadow duration-200 placeholder:text-[#8A7C6A]/60 focus:ring-2 focus:ring-[#E8491D]/20 ${errors.city ? "ring-1 ring-[#E8491D]" : ""}`}
                  />

                  {errors.city && (
                    <p className="mt-1 text-[10px] font-semibold text-[#E8491D]">
                      {errors.city}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-[#5F5143]">
                    PIN Code *
                  </label>

                  <input
                    type="text"
                    name="pin"
                    value={formData.pin}
                    onChange={handleChange}
                    maxLength={6}
                    inputMode="numeric"
                    placeholder="Enter PIN code"
                    className={`w-full bg-white px-4 py-3 text-sm text-[#1F1811] outline-none transition-shadow duration-200 placeholder:text-[#8A7C6A]/60 focus:ring-2 focus:ring-[#E8491D]/20 ${errors.pin ? "ring-1 ring-[#E8491D]" : ""}`}
                  />

                  {errors.pin && (
                    <p className="mt-1 text-[10px] font-semibold text-[#E8491D]">
                      {errors.pin}
                    </p>
                  )}
                </div>
              </div>

              {/* Geolocation */}
              <div className="bg-[#1F1811]/5 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center bg-[#E8491D]/10 text-[#E8491D]">
                      <FaLocationCrosshairs />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-[#1F1811]">
                        Current Location
                      </p>

                      <p className="mt-1 text-[10px] text-[#8A7C6A]">
                        {hasLocation
                          ? "Your current coordinates have been captured."
                          : "Capture your current location for accurate delivery."}
                      </p>

                      {hasLocation && (
                        <p className="mt-2 text-[9px] font-semibold text-[#6B8E4E]">
                          Lat: {formData.geolocation.lat} | Lon:{" "}
                          {formData.geolocation.lon}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGetLocation}
                    disabled={locationLoading || loading}
                    className="flex shrink-0 cursor-pointer items-center justify-center gap-2 bg-[#1F1811] px-4 py-2.5 text-[10px] font-bold uppercase tracking-wide text-[#FBF3E7] transition hover:bg-[#E8491D] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {locationLoading ? (
                      <>
                        <span className="size-3 animate-spin rounded-full border-2 border-[#FBF3E7] border-t-transparent" />
                        Getting...
                      </>
                    ) : (
                      <>
                        <FaLocationCrosshairs />
                        {hasLocation ? "Update Location" : "Get Location"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-[#1F1811]/10 px-5 py-4 sm:px-6">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="cursor-pointer px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-[#5F5143] transition hover:bg-[#1F1811]/5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || locationLoading}
              className="flex min-w-32 cursor-pointer items-center justify-center bg-[#E8491D] px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-[#FBF3E7] transition hover:bg-[#C93B16] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="mr-2 size-3 animate-spin rounded-full border-2 border-[#FBF3E7] border-t-transparent" />
                  Saving...
                </>
              ) : (
                "Save Address"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAddressModal;
