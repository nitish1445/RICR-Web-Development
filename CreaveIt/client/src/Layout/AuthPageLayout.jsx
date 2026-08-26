import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaLock, FaArrowRight } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import CartSidebar from "../components/CartSidebar";
import { useCart } from "../context/CartContext";

const AuthPageLayout = () => {
  const { isLogin, user } = useAuth();
  const { isCartOpen, closeCart } = useCart();

  const navigate = useNavigate();
  const location = useLocation();

  if (!isLogin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FBF3E7] px-4">
        <div className="w-full max-w-md text-center">
          {/* Icon */}
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#1F1811] text-[#E8491D]">
            <FaLock className="text-xl" />
          </div>

          {/* Content */}
          <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.2em] text-[#E8491D]">
            Authentication required
          </p>

          <h1 className="mt-3 text-3xl font-black uppercase tracking-tight text-[#1F1811] sm:text-4xl">
            Please Login First
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#8A7C6A]">
            You need to login to access this page. Sign in to continue with your
            CraveIt experience.
          </p>

          {/* Login Button */}
          <button
            type="button"
            onClick={() =>
              navigate("/login", {
                state: {
                  from: location.pathname,
                },
              })
            }
            className="mt-7 inline-flex cursor-pointer items-center gap-2 bg-[#E8491D] px-6 py-3 text-sm font-bold text-[#FBF3E7] transition-colors hover:bg-[#C93B16]"
          >
            Login to Continue
            <FaArrowRight className="text-xs" />
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-5 block w-full cursor-pointer text-sm font-semibold text-[#1F1811] transition-colors hover:text-[#E8491D]"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {user?.role !== "admin" && <Header />}
      <Outlet />
      <CartSidebar isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
};

export default AuthPageLayout;
