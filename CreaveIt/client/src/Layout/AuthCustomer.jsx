import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaLock } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";
import UserDashboard from "../pages/dashboards/UserDashBoard";

const AuthUserLayout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Not logged in or not a customer
  if (user?.role !== "customer") {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#E8491D]/30 px-4 py-10">
        <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-6xl items-center justify-center">
          <div className="w-full max-w-md text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#1F1811] text-[#E8491D]">
              <FaLock className="text-xl" />
            </div>

            <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.2em] text-[#B73515]">
              Access Restricted
            </p>

            <h1 className="mt-3 text-3xl font-black uppercase text-[#1F1811] sm:text-4xl">
              Customer Access Only
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#5F5143]">
              {user ? (
                <>
                  You are currently logged in as a{" "}
                  <span className="font-bold uppercase text-[#1F1811]">
                    {user?.role}
                  </span>{" "}
                  account. Please login with a customer account to access the
                  user dashboard.
                </>
              ) : (
                <>
                  You need to login with a customer account to access this area.
                </>
              )}
            </p>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="mt-7 inline-flex cursor-pointer items-center gap-2 bg-[#E8491D] px-6 py-3 text-sm font-bold text-[#FBF3E7] transition-colors hover:bg-[#C93B16]"
            >
              Back to Home
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <UserDashboard />;
};

export default AuthUserLayout;
