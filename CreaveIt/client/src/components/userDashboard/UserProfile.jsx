import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaUser,
  FaCalendarDays,
  FaVenusMars,
  FaPen,
  FaKey,
  FaLocationDot,
  FaMoneyCheckDollar,
  FaBuildingColumns,
  FaCreditCard,
} from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";
import EditProfileModal from "../userDashboard/modals/EditProfileModals";
import EditAddressModal from "../userDashboard/modals/EditAddressModal";
import ResetPasswordModal from "../userDashboard/modals/ResetPasswordModal";

const UserProfile = () => {
  const { user } = useAuth();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isEditAddressOpen, setIsEditAddressOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const getInitial = () => {
    return user?.fullName?.charAt(0)?.toUpperCase() || "U";
  };

  const address =
    user?.address && user.address !== "N/A"
      ? `${user.address}${user?.city ? `, ${user.city}` : ""}${
          user?.pin ? ` - ${user.pin}` : ""
        }`
      : "No address available";
  const paymentDetails = user?.paymentDetail || user?.paymentDetails || {};

  return (
    <>
      <main>
        {/* Page Heading */}
        <div className="mb-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
            Account Settings
          </p>

          <h1 className="mt-1 font-[Archivo_Black] text-2xl uppercase text-[#1F1811] sm:text-3xl">
            My Profile
          </h1>
        </div>

        {/* Profile Hero */}
        <section className="overflow-hidden bg-[#1F1811]">
          <div className="relative p-6 sm:p-8">
            {/* Decorative Text */}
            <span className="pointer-events-none absolute right-5 top-2 font-[Archivo_Black] text-7xl uppercase text-white/3 sm:text-8xl">
              Profile
            </span>

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              {/* User Info */}
              <div className="flex items-center gap-5">
                {/* Avatar */}
                <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden border-2 border-[#E8491D] bg-[#FBF3E7] text-2xl font-black text-[#1F1811]">
                  {user?.photo?.url ? (
                    <img
                      src={user.photo.url}
                      alt={user?.fullName || "User"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    getInitial()
                  )}
                </div>

                {/* Details */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="truncate font-[Archivo_Black] text-2xl uppercase text-[#FBF3E7] sm:text-3xl">
                      {user?.fullName || "Customer"}
                    </h2>

                    <span className="bg-[#E8491D] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#FBF3E7]">
                      Customer
                    </span>
                  </div>

                  <p className="mt-2 truncate text-sm text-[#C9BEB0]">
                    {user?.email || "No email available"}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(true)}
                  className="inline-flex cursor-pointer items-center gap-2 bg-[#E8491D] px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#FBF3E7] transition hover:bg-[#C93B16]"
                >
                  <FaPen className="text-[11px]" />
                  Edit Profile
                </button>

                <button
                  type="button"
                  onClick={() => setIsResetPasswordOpen(true)}
                  className="inline-flex cursor-pointer items-center gap-2 border border-white/15 px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#FBF3E7] transition hover:bg-white/10"
                >
                  <FaKey className="text-[11px]" />
                  Reset Password
                </button>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="flex items-center gap-2 border-t border-dashed border-white/10 bg-black/10 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#C9BEB0] sm:px-8">
            <span className="size-2 bg-[#6B8E4E]" />
            Account Active
          </div>
        </section>

        {/* Basic Details */}
        <section className="mt-8">
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
              Personal Information
            </p>

            <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase text-[#1F1811]">
              Basic Details
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-px bg-[#1F1811]/10 sm:grid-cols-2">
            {/* Full Name */}
            <InfoCard
              icon={FaUser}
              label="Full Name"
              value={user?.fullName || "Not available"}
            />

            {/* Email */}
            <InfoCard
              icon={FaEnvelope}
              label="Email Address"
              value={user?.email || "Not available"}
            />

            {/* Phone */}
            <InfoCard
              icon={FaPhone}
              label="Phone Number"
              value={user?.phone || "Not available"}
            />

            {/* Gender */}
            <InfoCard
              icon={FaVenusMars}
              label="Gender"
              value={user?.gender || "Not specified"}
              capitalize
            />

            {/* DOB */}
            <InfoCard
              icon={FaCalendarDays}
              label="Date of Birth"
              value={
                user?.dob
                  ? new Date(user.dob).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "Not available"
              }
            />

            {/* Role */}
            <InfoCard
              icon={FaUser}
              label="Account Type"
              value={user?.role || "Customer"}
              capitalize
            />
          </div>
        </section>

        {/* Payment Details */}
        <section className="mt-8">
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
              Financial Information
            </p>

            <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase text-[#1F1811]">
              Payment Details
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-px bg-[#1F1811]/10 sm:grid-cols-2">
            {/* UPI */}
            <InfoCard
              icon={FaMoneyCheckDollar}
              label="UPI ID"
              value={paymentDetails?.upi || "Not available"}
            />

            {/* Account Number */}
            <InfoCard
              icon={FaCreditCard}
              label="Account Number"
              value={paymentDetails?.account_number || "Not available"}
            />

            {/* IFSC */}
            <InfoCard
              icon={FaBuildingColumns}
              label="IFSC Code"
              value={paymentDetails?.IFSC || "Not available"}
            />

            {/* Payment Status */}
            <InfoCard
              icon={FaMoneyCheckDollar}
              label="Payment Account"
              value={
                paymentDetails?.upi ||
                paymentDetails?.account_number ||
                paymentDetails?.IFSC
                  ? "Configured"
                  : "Not configured"
              }
            />
          </div>
        </section>

        {/* Address */}
        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
                Location Information
              </p>

              <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase text-[#1F1811]">
                Address
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setIsEditAddressOpen(true)}
              className="inline-flex cursor-pointer items-center gap-2 text-xs font-bold text-[#E8491D] transition hover:text-[#C93B16]"
            >
              <FaPen className="text-[10px]" />
              Edit Address
            </button>
          </div>

          <div className="grid grid-cols-1 gap-px bg-[#1F1811]/10 sm:grid-cols-2">
            {/* Complete Address */}
            <div className="bg-white p-5 sm:col-span-2 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
                  <FaLocationDot />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                    Complete Address
                  </p>

                  <p className="mt-2 text-sm font-bold leading-6 text-[#1F1811]">
                    {address}
                  </p>
                </div>
              </div>
            </div>

            <InfoCard
              icon={FaLocationDot}
              label="City"
              value={user?.city || "Not available"}
            />

            <InfoCard
              icon={FaLocationDot}
              label="PIN Code"
              value={user?.pin || "Not available"}
            />
          </div>
        </section>
      </main>

      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
      />

      <EditAddressModal
        isOpen={isEditAddressOpen}
        onClose={() => setIsEditAddressOpen(false)}
      />

      <ResetPasswordModal
        isOpen={isResetPasswordOpen}
        onClose={() => setIsResetPasswordOpen(false)}
      />
    </>
  );
};

/* Reusable Information Card */

const InfoCard = ({ icon: Icon, label, value, capitalize = false }) => {
  return (
    <div className="bg-white p-5 sm:p-6">
      <div className="flex items-start gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
          <Icon />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
            {label}
          </p>

          <p
            className={`mt-2 truncate text-sm font-bold text-[#1F1811] ${
              capitalize ? "capitalize" : ""
            }`}
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
