import React from "react";

import {
  FaEnvelope,
  FaLocationDot,
  FaPhone,
  FaUser,
  FaUserShield,
} from "react-icons/fa6";

import { useAuth } from "../../context/AuthContext";

const AdminProfile = () => {
  const { user } = useAuth();

  const getInitial = () => {
    return user?.fullName?.charAt(0)?.toUpperCase() || "A";
  };

  const address =
    user?.address && user.address !== "N/A"
      ? `${user.address}${
          user?.city && user.city !== "N/A" ? `, ${user.city}` : ""
        }${user?.pin && user.pin !== "N/A" ? ` - ${user.pin}` : ""}`
      : "No address available";

  return (
    <main className="min-h-full bg-[#FBF3E7]">
      <div className="mx-auto max-w-4xl">
        {/* Profile Hero */}

        <section className="overflow-hidden bg-[#1F1811]">
          <div className="relative p-6 sm:p-8">
            {/* Decorative text */}
            <span className="absolute right-4 top-2 font-[Archivo_Black] text-6xl uppercase text-white/4 sm:right-8 sm:text-8xl">
              Admin
            </span>

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
              {/* Avatar */}
              <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden border-2 border-[#E8491D] bg-[#FBF3E7] text-2xl font-black text-[#1F1811]">
                {user?.photo?.url ? (
                  <img
                    src={user.photo.url}
                    alt={user?.fullName || "Admin"}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  getInitial()
                )}
              </div>

              {/* Profile Info */}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="truncate font-[Archivo_Black] text-2xl uppercase text-[#FBF3E7] sm:text-3xl">
                    {user?.fullName || "Admin"}
                  </h2>

                  <span className="flex items-center gap-1.5 bg-[#E8491D] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#FBF3E7]">
                    <FaUserShield />
                    Administrator
                  </span>
                </div>

                <p className="mt-2 text-sm text-[#C9BEB0]">
                  Full access to the CraveIt administration panel.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom status */}
          <div className="flex items-center gap-2 border-t border-dashed border-white/10 bg-black/10 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#C9BEB0] sm:px-8">
            <span className="size-2 bg-[#6B8E4E]" />
            Administrator Account Active
          </div>
        </section>

        {/* Information */}
        <section className="mt-6">
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
              Account Information
            </p>

            <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase text-[#1F1811]">
              Profile Details
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-px bg-[#1F1811]/10 sm:grid-cols-2">
            {/* Name */}
            <div className="bg-white p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
                  <FaUser />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                    Full Name
                  </p>

                  <p className="mt-2 truncate text-sm font-bold text-[#1F1811]">
                    {user?.fullName || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Role */}
            <div className="bg-white p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
                  <FaUserShield />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                    Role
                  </p>

                  <p className="mt-2 text-sm font-bold capitalize text-[#1F1811]">
                    {user?.role || "Admin"}
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
                  <FaEnvelope />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                    Email Address
                  </p>

                  <p className="mt-2 truncate text-sm font-bold text-[#1F1811]">
                    {user?.email || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
                  <FaPhone />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                    Phone Number
                  </p>

                  <p className="mt-2 text-sm font-bold text-[#1F1811]">
                    {user?.phone || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white p-5 sm:col-span-2 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
                  <FaLocationDot />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                    Address
                  </p>

                  <p className="mt-2 text-sm font-bold text-[#1F1811]">
                    {address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminProfile;
