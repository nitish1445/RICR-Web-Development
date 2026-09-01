import React, { useRef, useState } from "react";
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
  FaCamera,
  FaSpinner,
  FaStore,
  FaUtensils,
  FaIdCard,
  FaFileInvoice,
  FaClock,
  FaCircleCheck,
} from "react-icons/fa6";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/Api";
import RestaurantEditProfileModal from "./modals/RestaurantEditProfileModal";
import RestaurantResetPassword from "./modals/RestaurantResetPassword";

const RestaurantProfile = () => {
  const { user, setUser } = useAuth();
  const [photoLoading, setPhotoLoading] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);

  const fileInputRef = useRef(null);

  const restaurantName = user?.restaurantName || "N/A";
  const managerName = user?.fullName || "N/A";
  const cuisine = user?.cuisine || "N/A";
  const address =
    user?.address && user.address !== "N/A"
      ? `${user.address}${user?.city ? `, ${user.city}` : ""}${
          user?.pin ? ` - ${user.pin}` : ""
        }`
      : "No address available";
  const paymentDetails = user?.paymentDetail || user?.paymentDetails || {};
  const documents = user?.document || {};
  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    try {
      setPhotoLoading(true);
      const formData = new FormData();
      formData.append("image", file);
      const res = await api.patch("/user/changePhoto", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res?.data?.data) {
        setUser(res.data.data);
      }
      toast.success(res?.data?.message || "Restaurant photo updated");
    } catch (error) {
      console.log("Photo upload error:", error);
      toast.error(
        error?.response?.data?.message || "Unable to update restaurant photo",
      );
    } finally {
      setPhotoLoading(false);
      e.target.value = "";
    }
  };

  return (
    <main className="pb-10">
      {/* Headre */}

      <div className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
          Restaurant Management
        </p>

        <h1 className="mt-1 font-[Archivo_Black] text-2xl uppercase text-[#1F1811] sm:text-3xl">
          Restaurant Profile
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-[#8A7C6A]">
          Manage your restaurant information, business details, payment account
          and location.
        </p>
      </div>

      {/* Res Hero */}

     <section className="overflow-hidden bg-[#1F1811]">
  <div className="relative p-5 sm:p-6 md:p-8">
    {/* Decorative text */}

    <span className="pointer-events-none absolute right-3 top-0 font-[Archivo_Black] text-5xl uppercase tracking-tight text-white/[0.035] sm:right-5 sm:text-7xl lg:text-8xl">
      Restaurant
    </span>

    <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      {/* Restaurant information */}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        {/* Restaurant Image */}

        <div className="relative w-fit shrink-0">
          <div className="flex size-20 items-center justify-center overflow-hidden border-2 border-[#E8491D] bg-[#FBF3E7] sm:size-24 md:size-28">
            {user?.photo?.url ? (
              <img
                src={user.photo.url}
                alt={restaurantName}
                className="h-full w-full object-cover"
              />
            ) : (
              <FaStore className="text-3xl text-[#E8491D] sm:text-4xl" />
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={photoLoading}
            className="absolute -bottom-2 -right-2 flex size-8 cursor-pointer items-center justify-center rounded-full bg-[#E8491D] text-xs text-[#FBF3E7] transition hover:bg-[#C93B16] disabled:cursor-not-allowed disabled:opacity-60 sm:size-9 sm:text-sm"
          >
            {photoLoading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaCamera />
            )}
          </button>
        </div>

        {/* Details */}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <h2 className="wrap-break-word font-[Archivo_Black] text-xl uppercase leading-tight text-[#FBF3E7] sm:text-2xl md:text-3xl">
              {restaurantName}
            </h2>

            <span className="flex shrink-0 items-center gap-1 bg-[#6B8E4E] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white sm:px-3 sm:text-[10px]">
              <span className="size-1.5 rounded-full bg-white" />
              Active
            </span>
          </div>

          <p className="mt-2 text-sm font-medium text-[#C9BEB0]">
            {cuisine}
          </p>

          {/* Role + Location */}

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
            <span className="flex items-center gap-2">
              <FaUser className="shrink-0 text-[#E8491D]" />
              {user?.role || "Manager"}
            </span>

            <span className="flex items-center gap-2">
              <FaLocationDot className="shrink-0 text-[#E8491D]" />
              {user?.city || "Bhopal"}
            </span>
          </div>

          {/* Change Photo */}

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={photoLoading}
            className="mt-4 cursor-pointer text-[10px] font-bold uppercase tracking-wider text-[#E8491D] transition hover:text-[#FBF3E7] disabled:opacity-60"
          >
            {photoLoading ? "Uploading..." : "Change Restaurant Photo"}
          </button>
        </div>
      </div>

      {/* Actions */}

      <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto lg:shrink-0">
        <button
          type="button"
          onClick={() => setIsEditProfileOpen(true)}
          className="inline-flex cursor-pointer items-center justify-center gap-2 bg-[#E8491D] px-3 py-3 text-[10px] font-bold uppercase tracking-wide text-[#FBF3E7] transition hover:bg-[#C93B16] sm:px-5 sm:text-xs"
        >
          <FaPen className="text-[11px]" />
          Edit Profile
        </button>

        <button
          type="button"
          onClick={() => setIsResetPasswordOpen(true)}
          className="inline-flex cursor-pointer items-center justify-center gap-2 border border-white/15 px-3 py-3 text-[10px] font-bold uppercase tracking-wide text-[#FBF3E7] transition hover:bg-white/10 sm:px-5 sm:text-xs"
        >
          <FaKey className="text-[11px]" />
          Security
        </button>
      </div>
    </div>
  </div>

  {/* Status bar */}

  <div className="flex flex-col gap-2 border-t border-dashed border-white/10 bg-black/10 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
    <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[#C9BEB0] sm:text-[10px] sm:tracking-[0.15em]">
      <span className="size-2 shrink-0 bg-[#6B8E4E]" />
      Restaurant Account Active
    </div>

    <div className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#8A7C6A] sm:text-[10px] sm:tracking-[0.15em]">
      Manager • {user?.role || "manager"}
    </div>
  </div>
</section>

      {/* Restaurant Info */}

      <ProfileSection eyebrow="Business Information" title="Restaurant Details">
        <div className="grid grid-cols-1 gap-px bg-[#1F1811]/10 sm:grid-cols-2">
          <InfoCard
            icon={FaStore}
            label="Restaurant Name"
            value={restaurantName}
          />

          <InfoCard icon={FaUtensils} label="Cuisine" value={cuisine} />

          <InfoCard
            icon={FaCircleCheck}
            label="Restaurant Status"
            value={user?.isActive || "active"}
            capitalize
          />

          <InfoCard icon={FaUser} label="Manager" value={managerName} />
        </div>
      </ProfileSection>

      {/* Manager Info */}

      <ProfileSection eyebrow="Personal Information" title="Manager Details">
        <div className="grid grid-cols-1 gap-px bg-[#1F1811]/10 sm:grid-cols-2">
          <InfoCard icon={FaUser} label="Full Name" value={managerName} />

          <InfoCard
            icon={FaEnvelope}
            label="Email Address"
            value={user?.email || "Not available"}
          />

          <InfoCard
            icon={FaPhone}
            label="Phone Number"
            value={user?.phone || "Not available"}
          />

          <InfoCard
            icon={FaVenusMars}
            label="Gender"
            value={user?.gender || "Not specified"}
            capitalize
          />

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

          <InfoCard
            icon={FaIdCard}
            label="Account Role"
            value={user?.role || "manager"}
            capitalize
          />
        </div>
      </ProfileSection>

      {/* Bussiness Doc */}

      <ProfileSection eyebrow="Verification" title="Business Documents">
        <div className="grid grid-cols-1 gap-px bg-[#1F1811]/10 sm:grid-cols-2 lg:grid-cols-3">
          <DocumentCard
            icon={FaFileInvoice}
            label="GST Number"
            value={documents?.gst || "N/A"}
          />

          <DocumentCard
            icon={FaIdCard}
            label="FSSAI License"
            value={documents?.fssai || "N/A"}
          />

          <DocumentCard
            icon={FaIdCard}
            label="UIDAI"
            value={documents?.uidai || "N/A"}
          />
        </div>
      </ProfileSection>

      {/* Payment */}

      <ProfileSection
        eyebrow="Financial Information"
        title="Payment & Settlement"
      >
        <div className="grid grid-cols-1 gap-px bg-[#1F1811]/10 sm:grid-cols-2">
          <InfoCard
            icon={FaMoneyCheckDollar}
            label="UPI ID"
            value={paymentDetails?.upi || "Not available"}
          />

          <InfoCard
            icon={FaCreditCard}
            label="Account Number"
            value={paymentDetails?.account_number || "Not available"}
          />

          <InfoCard
            icon={FaBuildingColumns}
            label="IFSC Code"
            value={paymentDetails?.IFSC || "Not available"}
          />

          <InfoCard
            icon={FaCircleCheck}
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
      </ProfileSection>

      {/* Address */}

      <ProfileSection
        eyebrow="Location Information"
        title="Restaurant Location"
      >
        <div className="grid grid-cols-1 gap-px bg-[#1F1811]/10 sm:grid-cols-2">
          <div className="bg-white p-5 sm:col-span-2 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
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

          <InfoCard
            icon={FaLocationDot}
            label="Latitude"
            value={user?.geolocation?.lat || "Not available"}
          />

          <InfoCard
            icon={FaLocationDot}
            label="Longitude"
            value={user?.geolocation?.lon || "Not available"}
          />
        </div>
      </ProfileSection>

      {/* Timeline */}

      <ProfileSection eyebrow="Account Information" title="Account Activity">
        <div className="grid grid-cols-1 gap-px bg-[#1F1811]/10 sm:grid-cols-2">
          <InfoCard
            icon={FaClock}
            label="Registered On"
            value={
              user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Not available"
            }
          />

          <InfoCard
            icon={FaClock}
            label="Last Updated"
            value={
              user?.updatedAt
                ? new Date(user.updatedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Not available"
            }
          />
        </div>
      </ProfileSection>

      {/* Modals */}

      {isEditProfileOpen && (
        <RestaurantEditProfileModal
          onClose={() => setIsEditProfileOpen(false)}
        />
      )}

      {isResetPasswordOpen && (
        <RestaurantResetPassword
          onClose={() => setIsResetPasswordOpen(false)}
        />
      )}
    </main>
  );
};

/* Section */

const ProfileSection = ({ eyebrow, title, children }) => {
  return (
    <section className="mt-8">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
            {eyebrow}
          </p>

          <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase text-[#1F1811]">
            {title}
          </h2>
        </div>
      </div>

      {children}
    </section>
  );
};

/* Info Card */

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

/* Document Card */

const DocumentCard = ({ icon: Icon, label, value }) => {
  const verified = value && value !== "N/A" && value !== "Not available";

  return (
    <div className="bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
            <Icon />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
              {label}
            </p>

            <p className="mt-2 truncate text-sm font-bold text-[#1F1811]">
              {value}
            </p>
          </div>
        </div>

        <span
          className={`mt-1 size-2 shrink-0 ${
            verified ? "bg-[#6B8E4E]" : "bg-[#C9BEB0]"
          }`}
        />
      </div>
    </div>
  );
};

export default RestaurantProfile;
