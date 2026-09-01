import React, { useRef, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaCalendarDays,
  FaVenusMars,
  FaMotorcycle,
  FaWallet,
  FaLocationCrosshairs,
  FaFileLines,
  FaBuildingColumns,
  FaCreditCard,
  FaIdCard,
  FaMapLocationDot,
  FaCamera,
  FaSpinner,
  FaPen,
  FaKey,
} from "react-icons/fa6";

import { useAuth } from "../../context/AuthContext";
import api from "../../config/Api";
import toast from "react-hot-toast";
import EditRiderProfileModal from "./modals/EditRiderProfileDetail"
import ResetPasswordModal from "./modals/ResetPasswordModal";

const RiderProfile = () => {
  const { user, setUser } = useAuth();

  const fileInputRef = useRef(null);

  const [photoLoading, setPhotoLoading] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);

  // Safe Date Format
  const formatDate = (date) => {
    if (!date) return "N/A";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "N/A";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Initial
  const getInitial = () => {
    return user?.fullName?.charAt(0)?.toUpperCase() || "R";
  };

  // Upload Photo
  const handlePhotoChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      return;
    }

    try {
      setPhotoLoading(true);

      const formData = new FormData();
      formData.append("photo", file);

      const response = await api.patch(
        "/rider/upload-photo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response?.data?.success) {
        toast.success("Profile photo updated");

        const updatedPhoto =
          response?.data?.data?.photo ||
          response?.data?.photo;

        if (updatedPhoto && setUser) {
          setUser((prev) => ({
            ...prev,
            photo: updatedPhoto,
          }));
        }
      }
    } catch (error) {
      console.error("Photo upload error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to upload profile photo",
      );
    } finally {
      setPhotoLoading(false);

      event.target.value = "";
    }
  };

  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="bg-[#FBF3E7] p-4">
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center bg-[#1F1811] text-[#FBF3E7]">
          <Icon className="text-xs" />
        </div>

        <div className="min-w-0">
          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#8A7C6A]">
            {label}
          </p>

          <p className="mt-1 truncate text-sm font-bold text-[#1F1811]">
            {value || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );

  const DocumentItem = ({ label, value }) => (
    <div className="flex items-center justify-between border-b border-[#1F1811]/10 py-3 last:border-none">
      <span className="text-xs font-bold text-[#5F5143]">
        {label}
      </span>

      <span
        className={`text-[10px] font-bold ${
          value && value !== "N/A"
            ? "text-[#6B8E4E]"
            : "text-[#8A7C6A]"
        }`}
      >
        {value || "N/A"}
      </span>
    </div>
  );

  return (
    <main>
      {/* Hero Section */}

      <section className="overflow-hidden bg-[#1F1811]">
        <div className="relative p-5 sm:p-8">
          {/* Decorative Text */}

          <span className="pointer-events-none absolute right-3 top-0 font-[Archivo_Black] text-5xl uppercase tracking-tight text-white/[0.035] sm:right-5 sm:text-8xl">
            Profile
          </span>

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Rider Information */}

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              {/* Profile Image */}

              <div className="relative self-start">
                <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden border-2 border-[#E8491D] bg-[#FBF3E7] text-2xl font-black text-[#1F1811] sm:size-28">
                  {user?.photo?.url ? (
                    <img
                      src={user.photo.url}
                      alt={user?.fullName || "Rider"}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    getInitial()
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />

                {/* Camera */}

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={photoLoading}
                  className="absolute -bottom-2 -right-2 flex size-9 cursor-pointer items-center justify-center rounded-full bg-[#E8491D] text-sm text-[#FBF3E7] transition hover:bg-[#C93B16] disabled:cursor-not-allowed disabled:opacity-60"
                  title="Change profile photo"
                >
                  {photoLoading ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaCamera />
                  )}
                </button>
              </div>

              {/* Details */}

              <div className="min-w-0">
                {/* Name + Role */}

                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="font-[Archivo_Black] text-2xl uppercase leading-tight text-[#FBF3E7] sm:text-3xl">
                    {user?.fullName || "Delivery Partner"}
                  </h1>

                  <span className="flex items-center gap-1.5 bg-[#E8491D] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#FBF3E7]">
                    <FaMotorcycle className="text-[9px]" />
                    Rider
                  </span>
                </div>

                {/* Email */}

                <p className="mt-2 text-sm font-medium text-[#C9BEB0]">
                  {user?.email || "No email available"}
                </p>

                {/* Location */}

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
                  <span className="flex items-center gap-2">
                    <FaLocationDot className="text-[#E8491D]" />

                    {user?.city ||
                      user?.address ||
                      "Location unavailable"}
                  </span>

                  <span className="flex items-center gap-2">
                    <FaMotorcycle className="text-[#E8491D]" />

                    Delivery Partner
                  </span>
                </div>

                {/* Change Photo */}

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={photoLoading}
                  className="mt-4 cursor-pointer text-[10px] font-bold uppercase tracking-wider text-[#E8491D] transition hover:text-[#FBF3E7] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {photoLoading
                    ? "Uploading..."
                    : "Change Profile Photo"}
                </button>
              </div>
            </div>

            {/* Actions */}

            <div className="grid grid-cols-2 gap-3 lg:flex lg:flex-wrap">
              <button
                type="button"
                onClick={() => setIsEditProfileOpen(true)}
                className="inline-flex cursor-pointer items-center justify-center gap-2 bg-[#E8491D] px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#FBF3E7] transition hover:bg-[#C93B16] sm:px-5"
              >
                <FaPen className="text-[11px]" />

                <span>Edit Profile</span>
              </button>

              <button
                type="button"
                onClick={() => setIsResetPasswordOpen(true)}
                className="inline-flex cursor-pointer items-center justify-center gap-2 border border-white/15 px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#FBF3E7] transition hover:bg-white/10 sm:px-5"
              >
                <FaKey className="text-[11px]" />

                <span>Security</span>
              </button>
            </div>
          </div>
        </div>

        {/* Status Bar */}

        <div className="flex flex-col gap-2 border-t border-dashed border-white/10 bg-black/10 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#C9BEB0]">
            <span className="size-2 bg-[#6B8E4E]" />

            Rider Account Active
          </div>

          <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8A7C6A]">
            Role • {user?.role || "rider"}
          </div>
        </div>
      </section>

      {/* Profile Content */}

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Left Side */}

        <div className="space-y-6 lg:col-span-2">
          {/* Personal Information */}

          <div className="bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center bg-[#E8491D] text-[#FBF3E7]">
                <FaUser />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
                  Account Details
                </p>

                <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase text-[#1F1811]">
                  Personal Information
                </h2>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <InfoItem
                icon={FaUser}
                label="Full Name"
                value={user?.fullName}
              />

              <InfoItem
                icon={FaEnvelope}
                label="Email Address"
                value={user?.email}
              />

              <InfoItem
                icon={FaPhone}
                label="Phone Number"
                value={user?.phone}
              />

              <InfoItem
                icon={FaCalendarDays}
                label="Date of Birth"
                value={formatDate(user?.dob)}
              />

              <InfoItem
                icon={FaVenusMars}
                label="Gender"
                value={
                  user?.gender
                    ? user.gender.charAt(0).toUpperCase() +
                      user.gender.slice(1)
                    : "N/A"
                }
              />

              <InfoItem
                icon={FaMotorcycle}
                label="Partner Role"
                value="Delivery Partner"
              />
            </div>
          </div>

          {/* Address */}

          <div className="bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center bg-[#E8491D] text-[#FBF3E7]">
                <FaLocationDot />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
                  Delivery Location
                </p>

                <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase text-[#1F1811]">
                  Address Details
                </h2>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <InfoItem
                icon={FaLocationDot}
                label="Address"
                value={user?.address}
              />

              <InfoItem
                icon={FaMapLocationDot}
                label="City"
                value={user?.city}
              />

              <InfoItem
                icon={FaLocationDot}
                label="PIN Code"
                value={user?.pin}
              />

              <InfoItem
                icon={FaLocationCrosshairs}
                label="Current Coordinates"
                value={
                  user?.geolocation?.lat &&
                  user?.geolocation?.lon
                    ? `${user.geolocation.lat}, ${user.geolocation.lon}`
                    : "N/A"
                }
              />
            </div>
          </div>

          {/* Payment Details */}

          <div className="bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center bg-[#E8491D] text-[#FBF3E7]">
                <FaWallet />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
                  Payment Information
                </p>

                <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase text-[#1F1811]">
                  Payment Details
                </h2>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <InfoItem
                icon={FaWallet}
                label="UPI ID"
                value={user?.paymentDetail?.upi}
              />

              <InfoItem
                icon={FaCreditCard}
                label="Account Number"
                value={user?.paymentDetail?.account_number}
              />

              <InfoItem
                icon={FaBuildingColumns}
                label="IFSC Code"
                value={user?.paymentDetail?.IFSC}
              />
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className="space-y-6">
          {/* Partner Status */}

          <div className="bg-[#E8491D] p-5 text-[#FBF3E7]">
            <div className="flex size-10 items-center justify-center bg-[#1F1811]">
              <FaMotorcycle />
            </div>

            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
              Partner Account
            </p>

            <h3 className="mt-2 font-[Archivo_Black] text-2xl uppercase">
              Delivery Partner
            </h3>

            <div className="mt-4 border-t border-white/20 pt-4">
              <p className="text-[9px] font-bold uppercase tracking-wider text-white/70">
                Account Status
              </p>

              <p className="mt-1 text-sm font-bold uppercase">
                {user?.isActive ? "Active" : "Inactive"}
              </p>
            </div>

            <div className="mt-4 border-t border-white/20 pt-4">
              <p className="text-[9px] font-bold uppercase tracking-wider text-white/70">
                Member Since
              </p>

              <p className="mt-1 text-sm font-bold">
                {formatDate(user?.createdAt)}
              </p>
            </div>
          </div>

          {/* Documents */}

          <div className="bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center bg-[#1F1811] text-[#FBF3E7]">
                <FaFileLines />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
                  Verification
                </p>

                <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase text-[#1F1811]">
                  Documents
                </h2>
              </div>
            </div>

            <div className="mt-5">
              <DocumentItem
                label="Driving License"
                value={user?.document?.dl}
              />

              <DocumentItem
                label="RC Document"
                value={user?.document?.rc}
              />

              <DocumentItem
                label="Aadhaar / UIDAI"
                value={user?.document?.uidai}
              />

              <DocumentItem
                label="PAN Card"
                value={user?.document?.pan}
              />

              <DocumentItem
                label="GST Number"
                value={user?.document?.gst}
              />
            </div>
          </div>

          {/* Account ID */}

          <div className="bg-[#1F1811] p-5">
            <div className="flex items-center gap-3">
              <FaIdCard className="text-[#E8491D]" />

              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#8A7C6A]">
                Partner ID
              </p>
            </div>

            <p className="mt-3 break-all text-xs font-bold text-[#FBF3E7]">
              {user?._id || "N/A"}
            </p>
          </div>
        </div>
      </section>

      {/* Edit Profile Modal */}

      <EditRiderProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        user={user}
      />

      {/* Reset Password Modal */}

      <ResetPasswordModal
        isOpen={isResetPasswordOpen}
        onClose={() => setIsResetPasswordOpen(false)}
      />
    </main>
  );
};

export default RiderProfile;