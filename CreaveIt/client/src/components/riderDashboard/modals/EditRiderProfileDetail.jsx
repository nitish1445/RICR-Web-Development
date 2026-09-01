import React, { useEffect, useState } from "react";

import {
  FaXmark,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarDays,
  FaVenusMars,
  FaLocationDot,
  FaMapLocationDot,
  FaWallet,
  FaCreditCard,
  FaBuildingColumns,
  FaFileLines,
  FaIdCard,
  FaSpinner,
  FaFloppyDisk,
  FaLocationCrosshairs,
} from "react-icons/fa6";

import toast from "react-hot-toast";
import api from "../../../config/Api";

const EditRiderProfileModal = ({ isOpen, onClose, user, onProfileUpdated }) => {
  const [loading, setLoading] = useState(false);

  const initialFormData = {
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",

    address: "",
    city: "",
    pin: "",

    paymentDetail: {
      upi: "",
      account_number: "",
      IFSC: "",
    },

    document: {
      dl: "",
      rc: "",
      uidai: "",
      pan: "",
      gst: "",
    },

    geoLocation: {
      lat: "",
      lon: "",
    },
  };

  const [formData, setFormData] = useState(initialFormData);

  // Format DOB for input type="date"
  const formatDateForInput = (date) => {
    if (!date) return "";

    try {
      const parsedDate = new Date(date);

      if (Number.isNaN(parsedDate.getTime())) {
        return "";
      }

      return parsedDate.toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  // Set user data when modal opens
  useEffect(() => {
    if (!isOpen || !user) return;

    setFormData({
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      dob: formatDateForInput(user?.dob),
      gender: user?.gender || "",

      address: user?.address || "",
      city: user?.city || "",
      pin: user?.pin || "",

      paymentDetail: {
        upi: user?.paymentDetail?.upi || "",
        account_number: user?.paymentDetail?.account_number || "",
        IFSC: user?.paymentDetail?.IFSC || "",
      },

      document: {
        dl: user?.document?.dl || "",
        rc: user?.document?.rc || "",
        uidai: user?.document?.uidai || "",
        pan: user?.document?.pan || "",
        gst: user?.document?.gst || "",
      },

      geoLocation: {
        lat: user?.geoLocation?.lat ?? user?.geolocation?.lat ?? "",

        lon: user?.geoLocation?.lon ?? user?.geolocation?.lon ?? "",
      },
    });
  }, [isOpen, user]);

  // Lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Normal input change
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Payment input change
  const handlePaymentChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      paymentDetail: {
        ...prev.paymentDetail,
        [name]: value,
      },
    }));
  };

  // Document input change
  const handleDocumentChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      document: {
        ...prev.document,
        [name]: value,
      },
    }));
  };

  // Geo Location change
  const handleLocationChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      geoLocation: {
        ...prev.geoLocation,
        [name]: value,
      },
    }));
  };

  // Close modal
  const handleClose = () => {
    if (loading) return;

    setFormData(initialFormData);

    onClose();
  };

  // Submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (user?.email === "partner@gmail.com") {
      toast.error("Dummy Rider cannot update profile");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...formData,

        phone: formData.phone?.replace(/\D/g, ""),

        pin: String(formData.pin || "").trim(),

        document: {
          ...formData.document,
          pan: formData.document.pan?.toUpperCase().trim(),
        },

        paymentDetail: {
          ...formData.paymentDetail,
          IFSC: formData.paymentDetail.IFSC?.toUpperCase().trim(),
        },
      };

      const response = await api.put("/rider/update-profile", payload);

      const updatedUser = response?.data?.data;

      toast.success(response?.data?.message || "Profile updated successfully");

      // Update Auth Context / Parent State
      if (onProfileUpdated && updatedUser) {
        await onProfileUpdated(updatedUser);
      }

      // Reset form
      setFormData(initialFormData);

      // Close Modal
      onClose();
    } catch (error) {
      console.error("Profile update error:", error);

      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-end bg-black/80 sm:items-center sm:justify-center sm:p-5">
      <div className="flex max-h-[92vh] w-full flex-col bg-[#FBF3E7] sm:max-w-3xl">
        {/* Header */}

        <div className="flex shrink-0 items-center justify-between bg-[#1F1811] px-5 py-4 text-[#FBF3E7]">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
              Rider Account
            </p>

            <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase">
              Edit Profile
            </h2>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="flex size-9 cursor-pointer items-center justify-center transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaXmark />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          {/* Scrollable Content */}

          <div className="min-h-0 flex-1 overflow-y-auto p-5">
            {/* Personal Information */}

            <section>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center bg-[#E8491D] text-[#FBF3E7]">
                  <FaUser />
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#E8491D]">
                    Personal Details
                  </p>

                  <h3 className="font-[Archivo_Black] text-lg uppercase text-[#1F1811]">
                    Basic Information
                  </h3>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <InputField
                  icon={FaUser}
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                />

                <InputField
                  icon={FaEnvelope}
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />

                <InputField
                  icon={FaPhone}
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                />

                <InputField
                  icon={FaCalendarDays}
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                />

                {/* Gender */}

                <div>
                  <label className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[#8A7C6A]">
                    <FaVenusMars className="text-[#E8491D]" />
                    Gender
                  </label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="mt-2 w-full border border-[#1F1811]/15 bg-white px-4 py-3 text-sm text-[#1F1811] outline-none transition focus:border-[#E8491D]"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Address */}

            <section className="mt-8 border-t border-[#1F1811]/10 pt-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center bg-[#E8491D] text-[#FBF3E7]">
                  <FaLocationDot />
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#E8491D]">
                    Delivery Location
                  </p>

                  <h3 className="font-[Archivo_Black] text-lg uppercase text-[#1F1811]">
                    Address Details
                  </h3>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <InputField
                  icon={FaLocationDot}
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  required
                />

                <InputField
                  icon={FaMapLocationDot}
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  required
                />

                <InputField
                  icon={FaLocationDot}
                  label="PIN Code"
                  name="pin"
                  value={formData.pin}
                  onChange={handleChange}
                  placeholder="Enter PIN code"
                  required
                />
              </div>
            </section>

            {/* Geo Location */}

            <section className="mt-8 border-t border-[#1F1811]/10 pt-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center bg-[#1F1811] text-[#FBF3E7]">
                  <FaLocationCrosshairs />
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#E8491D]">
                    Coordinates
                  </p>

                  <h3 className="font-[Archivo_Black] text-lg uppercase text-[#1F1811]">
                    Geo Location
                  </h3>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <InputField
                  icon={FaLocationCrosshairs}
                  label="Latitude"
                  name="lat"
                  type="number"
                  value={formData.geoLocation.lat}
                  onChange={handleLocationChange}
                  placeholder="Enter latitude"
                />

                <InputField
                  icon={FaLocationCrosshairs}
                  label="Longitude"
                  name="lon"
                  type="number"
                  value={formData.geoLocation.lon}
                  onChange={handleLocationChange}
                  placeholder="Enter longitude"
                />
              </div>
            </section>

            {/* Payment */}

            <section className="mt-8 border-t border-[#1F1811]/10 pt-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center bg-[#E8491D] text-[#FBF3E7]">
                  <FaWallet />
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#E8491D]">
                    Payment Information
                  </p>

                  <h3 className="font-[Archivo_Black] text-lg uppercase text-[#1F1811]">
                    Bank & UPI Details
                  </h3>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <InputField
                  icon={FaWallet}
                  label="UPI ID"
                  name="upi"
                  value={formData.paymentDetail.upi}
                  onChange={handlePaymentChange}
                  placeholder="example@upi"
                />

                <InputField
                  icon={FaCreditCard}
                  label="Account Number"
                  name="account_number"
                  value={formData.paymentDetail.account_number}
                  onChange={handlePaymentChange}
                  placeholder="Enter account number"
                />

                <InputField
                  icon={FaBuildingColumns}
                  label="IFSC Code"
                  name="IFSC"
                  value={formData.paymentDetail.IFSC}
                  onChange={handlePaymentChange}
                  placeholder="Enter IFSC code"
                />
              </div>
            </section>

            {/* Documents */}

            <section className="mt-8 border-t border-[#1F1811]/10 pt-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center bg-[#1F1811] text-[#FBF3E7]">
                  <FaFileLines />
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#E8491D]">
                    Verification
                  </p>

                  <h3 className="font-[Archivo_Black] text-lg uppercase text-[#1F1811]">
                    Documents
                  </h3>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <InputField
                  icon={FaIdCard}
                  label="Driving License"
                  name="dl"
                  value={formData.document.dl}
                  onChange={handleDocumentChange}
                  placeholder="Enter driving license number"
                />

                <InputField
                  icon={FaFileLines}
                  label="RC Number"
                  name="rc"
                  value={formData.document.rc}
                  onChange={handleDocumentChange}
                  placeholder="Enter RC number"
                />

                <InputField
                  icon={FaIdCard}
                  label="Aadhaar / UIDAI"
                  name="uidai"
                  value={formData.document.uidai}
                  onChange={handleDocumentChange}
                  placeholder="Enter Aadhaar number"
                />

                <InputField
                  icon={FaIdCard}
                  label="PAN Card"
                  name="pan"
                  value={formData.document.pan}
                  onChange={handleDocumentChange}
                  placeholder="Enter PAN number"
                />

                <InputField
                  icon={FaFileLines}
                  label="GST Number"
                  name="gst"
                  value={formData.document.gst}
                  onChange={handleDocumentChange}
                  placeholder="Enter GST number"
                />
              </div>
            </section>
          </div>

          {/* Actions */}

          <div className="shrink-0 border-t border-[#1F1811]/10 bg-[#FBF3E7] p-5">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="cursor-pointer border border-[#1F1811]/20 px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-[#1F1811] transition hover:bg-[#1F1811]/5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex cursor-pointer items-center justify-center gap-2 bg-[#E8491D] px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-[#FBF3E7] transition hover:bg-[#C93B16] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Saving
                  </>
                ) : (
                  <>
                    <FaFloppyDisk />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

/* Reusable Input */

const InputField = ({
  icon: Icon,
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) => {
  return (
    <div>
      <label className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[#8A7C6A]">
        <Icon className="text-[#E8491D]" />
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full border border-[#1F1811]/15 bg-white px-4 py-3 text-sm text-[#1F1811] outline-none transition placeholder:text-[#8A7C6A]/60 focus:border-[#E8491D]"
      />
    </div>
  );
};

export default EditRiderProfileModal;
