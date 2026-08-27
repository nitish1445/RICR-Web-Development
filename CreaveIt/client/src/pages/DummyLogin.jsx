import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  FaArrowRight,
  FaUser,
  FaStore,
  FaMotorcycle,
  FaUserShield,
} from "react-icons/fa6";

import api from "../config/Api";
import { useAuth } from "../context/AuthContext";

const DummyLogin = () => {
  const navigate = useNavigate();
  const { setUser, setIsLogin } = useAuth();
  const [loadingEmail, setLoadingEmail] = useState(null);

  const dummyUsers = [
    {
      name: "Customer Account",
      email: "customer@gmail.com",
      password: "qwerty",
      role: "customer",
      icon: FaUser,
      description: "Explore restaurants, add food to cart and place orders.",
    },
    {
      name: "Restaurant Manager",
      email: "manager@gmail.com",
      password: "qwerty",
      role: "manager",
      icon: FaStore,
      description: "Manage your restaurant, menu items and incoming orders.",
    },
    {
      name: "Delivery Partner",
      email: "partner@gmail.com",
      password: "qwerty",
      role: "partner",
      icon: FaMotorcycle,
      description: "Manage assigned orders and delivery activities.",
    },
    {
      name: "Admin Account",
      email: "admin@gmail.com",
      password: "qwerty",
      role: "admin",
      icon: FaUserShield,
      description:
        "Access the CraveIt administration panel and manage platform activities.",
    },
  ];

  const handleDummyLogin = async (selectedUser) => {
    setLoadingEmail(selectedUser.email);

    try {
      const res = await api.post("/auth/login", {
        email: selectedUser.email,
        password: selectedUser.password,
      });
      const loggedInUser =
        res?.data?.data?.user || res?.data?.user || res?.data?.data;
      if (!loggedInUser) {
        toast.error("User data not received");
        return;
      }

      setUser(loggedInUser);
      setIsLogin(true);
      toast.success(
        `Logged in as ${loggedInUser.fullName || selectedUser.name}`,
      );

      if (loggedInUser.role === "customer") {
        navigate("/user-dashboard");
        return;
      }

      if (loggedInUser.role === "manager") {
        navigate("/restaurant-dashboard");
        return;
      }

      if (loggedInUser.role === "partner") {
        navigate("/rider-dashboard");
        return;
      }

      if (loggedInUser.role === "admin") {
        navigate("/admin-dashboard");
        return;
      }

      navigate("/");
    } catch (error) {
      console.log("Dummy login error:", error);
      toast.error(error?.response?.data?.message || "Unable to login");
    } finally {
      setLoadingEmail(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#E8491D]/30 px-4 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center justify-center">
        <div className="w-full">
          {/* Header */}
          <div className="text-center">
            <p className="font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-[0.25em] text-[#B73515]">
              Development Access
            </p>

            <h1 className="mt-3 font-[Archivo_Black] text-3xl uppercase text-[#1F1811] sm:text-5xl">
              Choose Your Account
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#5F5143]">
              Select an account to quickly test the CraveIt platform with
              different user roles.
            </p>
          </div>

          {/* User Cards */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {dummyUsers.map((user) => {
              const Icon = user.icon;

              const isLoading = loadingEmail === user.email;

              return (
                <button
                  key={user.email}
                  type="button"
                  disabled={loadingEmail !== null}
                  onClick={() => handleDummyLogin(user)}
                  className="group cursor-pointer bg-[#FFF9F2] p-6 text-left shadow-[0_12px_30px_-18px_rgba(31,24,17,0.35)] transition duration-300 hover:-translate-y-1 hover:bg-[#1F1811] disabled:cursor-not-allowed disabled:opacity-60
                  "
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between">
                    <div
                      className="flex size-12 items-center justify-center bg-[#F3E9DB] text-[#E8491D] transition-colors group-hover:bg-[#E8491D] group-hover:text-[#FBF3E7]
                      "
                    >
                      <Icon className="text-lg" />
                    </div>

                    <FaArrowRight
                      className="text-sm text-[#8A7C6A] transition-colors group-hover:text-[#FBF3E7]
                      "
                    />
                  </div>

                  {/* Role */}
                  <p className="mt-7 font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-wider text-[#C93B16]">
                    {user.role}
                  </p>

                  {/* Account Name */}
                  <h2
                    className="
                      mt-2 font-[Archivo_Black] text-xl uppercase text-[#1F1811] transition-colors group-hover:text-[#FBF3E7]
                    "
                  >
                    {user.name}
                  </h2>

                  {/* Description */}
                  <p
                    className="
                      mt-3 text-sm leading-6 text-[#756756] transition-colors group-hover:text-[#D8CFC2]
                    "
                  >
                    {user.description}
                  </p>

                  {/* Credentials */}
                  <div
                    className="
                      mt-6 border-t border-dashed border-[#1F1811]/15 pt-4 transition-colors group-hover:border-[#FBF3E7]/20
                    "
                  >
                    <p
                      className="
                        text-xs font-semibold text-[#1F1811] transition-colors group-hover:text-[#FBF3E7]
                      "
                    >
                      {user.email}
                    </p>

                    <p
                      className="
                        mt-1 text-[10px] uppercase tracking-wider text-[#8A7C6A] transition-colors group-hover:text-[#D8CFC2]
                      "
                    >
                      Password: {user.password}
                    </p>
                  </div>

                  {/* Login Action */}
                  <div
                    className="
                      mt-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#E8491D] transition-colors group-hover:text-[#FBF3E7]
                    "
                  >
                    {isLoading ? (
                      <>
                        <span className="size-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Logging in...
                      </>
                    ) : (
                      <>
                        Login as {user.role}
                        <FaArrowRight />
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-[#5F5143]">
            Select a Customer, Restaurant Manager, Delivery Partner or Admin
            account to continue.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DummyLogin;
