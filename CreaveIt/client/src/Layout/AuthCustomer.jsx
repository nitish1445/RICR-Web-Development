import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FaLock, FaArrowRight } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";

const CustomerRoute = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Logged in but not customer
  if (user?.role !== "customer") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FBF3E7] px-4">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#1F1811] text-[#E8491D]">
            <FaLock className="text-xl" />
          </div>

          <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.2em] text-[#E8491D]">
            Access Restricted
          </p>

          <h1 className="mt-3 text-3xl font-black uppercase text-[#1F1811] sm:text-4xl">
            Customer Access Only
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#8A7C6A]">
            You are logged in as a{" "}
            <span className="font-bold uppercase text-[#1F1811]">
              {user?.role}
            </span>{" "}
            account. Please login as a customer to access checkout.
          </p>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-7 inline-flex cursor-pointer items-center gap-2 bg-[#E8491D] px-6 py-3 text-sm font-bold text-[#FBF3E7]"
          >
            Back to Home
            <FaArrowRight className="text-xs" />
          </button>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default CustomerRoute;
