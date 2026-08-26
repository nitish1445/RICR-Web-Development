import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

import { FaShoppingCart, FaUtensils, FaArrowRight } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const { user, isLogin, role } = useAuth();
  const { cartCount, openCart } = useCart();

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = () => {
    switch (role) {
      case "manager":
        navigate("/restaurant-dashboard");
        break;

      case "partner":
        navigate("/rider-dashboard");
        break;

      case "customer":
        navigate("/user-dashboard", {
          state: { tab: "overview" },
        });
        break;

      case "admin":
        navigate("/admin-dashboard");
        break;

      default:
        break;
    }

    setMenuOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navLinks = [
    { label: "Order Now", path: "/restaurants" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1F1811]/10 bg-[#FBF3E7]">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2"
        >
          <div className="flex size-9 items-center justify-center bg-[#E8491D] text-[#FBF3E7]">
            <FaUtensils className="text-sm" />
          </div>

          <span className="font-[Archivo_Black] text-xl tracking-tight text-[#1F1811]">
            CRAVE
            <span className="text-[#E8491D]">IT</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-10 hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="px-3 py-2 font-[Inter] text-sm font-medium text-[#6B5E50] transition-colors hover:text-[#E8491D]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="ml-auto flex items-center gap-2">
          {/* Cart */}
          <button
            type="button"
            onClick={openCart}
            aria-label="Shopping cart"
            className="group relative flex size-10 cursor-pointer items-center justify-center text-[#1F1811] transition-colors hover:text-[#E8491D]"
          >
            <FaShoppingCart className="text-base" />

            <span className="absolute right-0 top-1 flex size-4 items-center justify-center text-sm font-bold text-[#E8491D] transition-colors group-hover:text-[#1F1811]">
              {cartCount}
            </span>
          </button>

          {/* Logged In */}
          {isLogin ? (
            <button
              type="button"
              onClick={handleNavigate}
              className="hidden cursor-pointer items-center gap-2 border-l border-[#1F1811]/10 pl-3 md:flex"
            >
              {user?.photo?.url ? (
                <img
                  src={user?.photo?.url}
                  alt={user?.fullName}
                  className="size-8 object-cover"
                />
              ) : (
                <div className="flex size-8 items-center justify-center bg-[#1F1811] text-[#FBF3E7]">
                  <FaRegCircleUser className="text-base" />
                </div>
              )}

              <div className="hidden min-w-0 text-left xl:block">
                <p className="max-w-28 truncate text-sm font-semibold text-[#1F1811]">
                  {user?.fullName}
                </p>

                <p className="text-[10px] uppercase tracking-wider text-[#8A7C6A]">
                  {user?.role}
                </p>
              </div>
            </button>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="cursor-pointer px-4 py-2 text-sm font-semibold text-[#1F1811] transition-colors hover:text-[#E8491D]"
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => navigate("/customer-signup")}
                className="flex cursor-pointer items-center gap-2 bg-[#E8491D] px-4 py-2 text-sm font-bold text-[#FBF3E7] transition-opacity hover:opacity-90"
              >
                Sign Up
                <FaArrowRight className="text-[10px]" />
              </button>
            </div>
          )}

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="ml-1 flex size-10 cursor-pointer items-center justify-center text-[#1F1811] md:hidden"
          >
            {menuOpen ? (
              <FiX className="text-xl" />
            ) : (
              <FiMenu className="text-xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-[#1F1811]/10 bg-[#FBF3E7] md:hidden">
          <div className="px-4 py-3">
            {/* Logged In User */}
            {isLogin && (
              <button
                type="button"
                onClick={handleNavigate}
                className="mb-3 flex w-full cursor-pointer items-center gap-3 border-b border-[#1F1811]/10 pb-3 text-left"
              >
                {user?.photo?.url ? (
                  <img
                    src={user.photo.url}
                    alt={user?.fullName}
                    className="size-10 object-cover"
                  />
                ) : (
                  <div className="flex size-10 items-center justify-center bg-[#1F1811] text-[#FBF3E7]">
                    <FaRegCircleUser />
                  </div>
                )}

                <div>
                  <p className="text-sm font-semibold text-[#1F1811]">
                    {user?.fullName}
                  </p>

                  <p className="text-xs text-[#8A7C6A]">View your dashboard</p>
                </div>

                <FaArrowRight className="ml-auto text-xs text-[#E8491D]" />
              </button>
            )}

            {/* Navigation */}
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={closeMenu}
                  className="flex items-center justify-between border-b border-[#1F1811]/10 py-3 text-sm font-medium text-[#1F1811]"
                >
                  {link.label}

                  <FaArrowRight className="text-[10px] text-[#E8491D]" />
                </Link>
              ))}
            </nav>

            {/* Mobile Auth */}
            {!isLogin && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigate("/login");
                    closeMenu();
                  }}
                  className="cursor-pointer border border-[#1F1811]/20 px-4 py-3 text-sm font-semibold text-[#1F1811]"
                >
                  Login
                </button>

                <button
                  type="button"
                  onClick={() => {
                    navigate("/customer-signup");
                    closeMenu();
                  }}
                  className="cursor-pointer bg-[#E8491D] px-4 py-3 text-sm font-bold text-[#FBF3E7]"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
