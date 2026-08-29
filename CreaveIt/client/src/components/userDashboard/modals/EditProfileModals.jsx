import React, { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaBuildingColumns,
  FaCalendarDays,
  FaCamera,
  FaCreditCard,
  FaMoneyBillTransfer,
  FaUser,
  FaVenusMars,
  FaXmark,
} from "react-icons/fa6";
import { toast } from "react-hot-toast";
import api from "../../../config/Api";
import { useAuth } from "../../../context/AuthContext";

const EditProfileModal = ({ isOpen, onClose}) => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    dob: user?.dob || "",
    gender: user?.gender || "N/A",
    photo: "",
    paymentDetail: {
      upi: "",
      account_number: "",
      IFSC: "",
    },
  });

  const [loading, setLoading] = useState(false);

  // Populate existing user data
  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        fullName: user?.fullName || "",
        phone: user?.phone || "",
        dob: user?.dob || "",
        gender: user?.gender || "N/A",
        photo: user?.photo?.url || "",
        paymentDetail: {
          upi:
            user?.paymentDetail?.upi === "N/A"
              ? ""
              : user?.paymentDetail?.upi || "",

          account_number:
            user?.paymentDetail?.account_number === "N/A"
              ? ""
              : user?.paymentDetail?.account_number || "",

          IFSC:
            user?.paymentDetail?.IFSC === "N/A"
              ? ""
              : user?.paymentDetail?.IFSC || "",
        },
      });
    }
  }, [user, isOpen]);

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    if (loading) return;
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      paymentDetail: {
        ...prev.paymentDetail,
        [name]: value,
      },
    }));
  };

  const validate = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }

    if (!formData.phone.trim()) {
      toast.error("Phone number is required");
      return false;
    }

    if (formData.phone.length < 10) {
      toast.error("Enter a valid phone number");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const res = await api.patch("/user/update", formData);
      toast.success(res?.data?.message || "Profile updated successfully");
      setUser(res?.data?.data);
      onClose();
    } catch (error) {
      console.log("Update profile error:", error);
      toast.error(error?.response?.data?.message || "Unable to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-[#1F1811]/60 px-4 py-6 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden bg-[#FFF9F2] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#1F1811]/10 bg-[#1F1811] px-5 py-3">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
              Customer Account
            </p>

            <h2 className="mt-0.5 font-[Archivo_Black] text-base uppercase text-[#FBF3E7]">
              Edit Profile
            </h2>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="flex size-8 cursor-pointer items-center justify-center text-[#C9BEB0] transition hover:bg-white/10 hover:text-[#E8491D] disabled:cursor-not-allowed"
          >
            <FaXmark className="text-lg" />
          </button>
        </div>

        {/* Scrollable Content */}
        <form onSubmit={handleSubmit} className="overflow-y-auto">
          <div className="p-5 sm:p-6">
            {/* Basic Information */}
            <div>
              <div className="mb-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
                  Personal Information
                </p>

                <h3 className="mt-1 font-[Archivo_Black] text-lg uppercase text-[#1F1811]">
                  Basic Details
                </h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-[#8A7C6A]">
                    Full Name
                  </label>

                  <div className="relative">
                    <FaUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#8A7C6A]" />

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full border border-[#1F1811]/15 bg-white py-3 pl-10 pr-4 text-sm text-[#1F1811] outline-none transition focus:border-[#E8491D]"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-[#8A7C6A]">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className="w-full border border-[#1F1811]/15 bg-white px-4 py-3 text-sm text-[#1F1811] outline-none transition focus:border-[#E8491D]"
                  />
                </div>

                {/* DOB */}
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-[#8A7C6A]">
                    Date of Birth
                  </label>

                  <div className="relative">
                    <FaCalendarDays className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#8A7C6A]" />

                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="w-full border border-[#1F1811]/15 bg-white py-3 pl-10 pr-3 text-sm text-[#1F1811] outline-none transition focus:border-[#E8491D]"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-[#8A7C6A]">
                    Gender
                  </label>

                  <div className="relative">
                    <FaVenusMars className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#8A7C6A]" />

                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full cursor-pointer appearance-none border border-[#1F1811]/15 bg-white py-3 pl-10 pr-4 text-sm text-[#1F1811] outline-none transition focus:border-[#E8491D]"
                    >
                      <option value="N/A">Prefer not to say</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="mt-8 border-t border-dashed border-[#1F1811]/15 pt-7">
              <div className="mb-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
                  Payment Information
                </p>

                <h3 className="mt-1 font-[Archivo_Black] text-lg uppercase text-[#1F1811]">
                  Payment Details
                </h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* UPI */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-[#8A7C6A]">
                    UPI ID
                  </label>

                  <div className="relative">
                    <FaMoneyBillTransfer className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#8A7C6A]" />

                    <input
                      type="text"
                      name="upi"
                      value={formData.paymentDetail.upi}
                      onChange={handlePaymentChange}
                      placeholder="example@upi"
                      className="w-full border border-[#1F1811]/15 bg-white py-3 pl-10 pr-4 text-sm text-[#1F1811] outline-none transition focus:border-[#E8491D]"
                    />
                  </div>
                </div>

                {/* Account Number */}
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-[#8A7C6A]">
                    Account Number
                  </label>

                  <div className="relative">
                    <FaCreditCard className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#8A7C6A]" />

                    <input
                      type="text"
                      name="account_number"
                      value={formData.paymentDetail.account_number}
                      onChange={handlePaymentChange}
                      placeholder="Enter account number"
                      className="w-full border border-[#1F1811]/15 bg-white py-3 pl-10 pr-4 text-sm text-[#1F1811] outline-none transition focus:border-[#E8491D]"
                    />
                  </div>
                </div>

                {/* IFSC */}
                <div>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.15em] text-[#8A7C6A]">
                    IFSC Code
                  </label>

                  <div className="relative">
                    <FaBuildingColumns className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-[#8A7C6A]" />

                    <input
                      type="text"
                      name="IFSC"
                      value={formData.paymentDetail.IFSC}
                      onChange={handlePaymentChange}
                      placeholder="Enter IFSC code"
                      className="w-full border border-[#1F1811]/15 bg-white py-3 pl-10 pr-4 text-sm uppercase text-[#1F1811] outline-none transition focus:border-[#E8491D]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t border-[#1F1811]/10 bg-[#FFF9F2] px-5 py-4 sm:px-6">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="cursor-pointer px-5 py-2.5 text-xs font-bold text-[#5F5143] transition hover:text-[#E8491D] disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex cursor-pointer items-center gap-2 bg-[#E8491D] px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-[#FBF3E7] transition hover:bg-[#C93B16] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Saving...
                </>
              ) : (
                <>
                  Save Changes
                  <FaArrowRight className="text-[10px]" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
