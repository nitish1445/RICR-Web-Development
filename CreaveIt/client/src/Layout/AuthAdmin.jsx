import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaLock } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";
import AdminDashboard from "../pages/dashboards/AdminDashboard";

const AuthAdminLayout = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  // Not logged in or not an admin
  if (user?.role !== "admin") {
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
            Admin Access Only
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#8A7C6A]">
            {user ? (
              <>
                You are currently logged in as a{" "}
                <span className="font-bold uppercase text-[#1F1811]">
                  {user?.role}
                </span>{" "}
                account. Please login with an administrator account to access
                the admin dashboard.
              </>
            ) : (
              <>
                You need to login with an administrator account to access this
                area.
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
    );
  }

  return <AdminDashboard />;
};

export default AuthAdminLayout;
