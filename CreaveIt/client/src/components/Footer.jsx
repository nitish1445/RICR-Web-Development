import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaFacebookF,
  FaArrowRight,
} from "react-icons/fa6";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Order Now", path: "/order" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const supportLinks = [
  { label: "Help Center", path: "/contact" },
  { label: "Track Order", path: "/user-dashboard" },
  { label: "Privacy Policy", path: "/about" },
  { label: "Terms", path: "/about" },
];

const socials = [
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaXTwitter, href: "#", label: "X" },
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-(--color-primary) text-white mt-14">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-(--color-secondary)/20 blur-3xl" />
        <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-(--color-background)/20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-5 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-black leading-tight">
              CraveIt
            </h2>
            <p className="text-white/80 mt-3 text-sm sm:text-base leading-relaxed max-w-md">
              Fast delivery, fresh flavors, and a checkout experience made for
              everyday cravings.
            </p>

            <div className="mt-6">
              <div className="text-sm font-semibold text-(--color-background)">
                Stay in the loop
              </div>
              <div className="mt-3 flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full sm:flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm outline-none placeholder:text-white/60 focus:border-(--color-secondary)"
                />
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-(--color-secondary) px-5 py-3 text-sm font-bold text-white hover:bg-(--color-secondary-hover) transition"
                >
                  Subscribe <FaArrowRight className="text-xs" />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-(--color-background)">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-3">
                {quickLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className="text-white/85 hover:text-(--color-accent) transition"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-(--color-background)">
                Support
              </h3>
              <ul className="mt-4 space-y-3">
                {supportLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className="text-white/85 hover:text-(--color-accent) transition"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/70 text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} CraveIt. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="h-10 w-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center hover:bg-(--color-secondary) hover:border-(--color-secondary) transition"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
