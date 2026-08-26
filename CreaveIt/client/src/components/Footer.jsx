import { Link } from "react-router-dom";

import {
  FaUtensils,
  FaBolt,
  FaClock,
  FaHeart,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaFacebookF,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Restaurants", path: "/restaurants" },
  { label: "Offers", path: "/" },
  { label: "About Us", path: "/about" },
];

const supportLinks = [
  { label: "Help Center", path: "/contact" },
  { label: "Track Order", path: "/user-dashboard" },
  { label: "Contact Us", path: "/contact" },
  { label: "Privacy Policy", path: "/privacy" },
];

const socials = [
  { icon: FaInstagram, href: "https://instagram.com/nitish_yadvv", label: "Instagram" },
  { icon: FaXTwitter, href: "https:/x.com/nitish_yadvv", label: "X" },
  { icon: FaFacebookF, href: "https://facebook.com/nitishyadvv", label: "Facebook" },
  { icon: FaLinkedinIn, href: "https://linkedin.com/in/nitish1445", label: "LinkedIn" },
];

const benefits = [
  {
    icon: FaBolt,
    title: "Easy ordering",
    description: "Find your favorite food in just a few clicks.",
  },
  {
    icon: FaClock,
    title: "Quick delivery",
    description: "Fresh meals delivered when you need them.",
  },
  {
    icon: FaHeart,
    title: "Made for cravings",
    description: "Discover food and restaurants you'll love.",
  },
];

const Footer = () => {
  return (
    <footer className="overflow-hidden bg-[#1F1811] text-[#FBF3E7]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        {/* Main Footer */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.9fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="group inline-flex items-center gap-2">
              <span className="flex size-9 items-center justify-center bg-[#E8491D] text-[#FBF3E7]">
                <FaUtensils className="text-sm" />
              </span>

              <span className="font-[Archivo_Black] text-xl tracking-tight text-[#FBF3E7]">
                CRAVE
                <span className="text-[#E8491D]">IT</span>
              </span>
            </Link>

            <p className="mt-4 max-w-xs font-[Inter] text-sm leading-6 text-[#C9BEB0]">
              Discover great food from local restaurants and enjoy a better way
              to order what you're craving.
            </p>

            {/* Social Links */}
            <div className="mt-5 flex items-center gap-4">
              {socials.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="group text-[#C9BEB0] transition-colors duration-200 hover:text-[#E8491D]"
                  >
                    <Icon className="text-base transition-transform duration-200 group-hover:-translate-y-0.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Explore */}
          <div>
            <p className="font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
              Explore
            </p>

            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center gap-2 font-[Inter] text-sm text-[#C9BEB0] transition-colors hover:text-[#FBF3E7]"
                  >
                    <span className="h-px w-0 bg-[#E8491D] transition-all duration-200 group-hover:w-3" />

                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
              Support
            </p>

            <ul className="mt-4 space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center gap-2 font-[Inter] text-sm text-[#C9BEB0] transition-colors hover:text-[#FBF3E7]"
                  >
                    <span className="h-px w-0 bg-[#E8491D] transition-all duration-200 group-hover:w-3" />

                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Why CraveIt */}
          <div>
            <p className="font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
              Why CraveIt
            </p>

            <div className="mt-4 space-y-4">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className="group flex items-start gap-3"
                  >
                    <Icon className="mt-0.5 shrink-0 text-sm text-[#E8491D] transition-transform duration-200 group-hover:scale-110" />

                    <div>
                      <p className="font-[Inter] text-sm font-semibold text-[#FBF3E7]">
                        {benefit.title}
                      </p>

                      <p className="mt-0.5 font-[Inter] text-xs leading-5 text-[#C9BEB0]">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-dashed border-[#FBF3E7]/15" />

        {/* Bottom Footer */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-[JetBrains_Mono] text-[10px] text-[#8A7C6A]">
            © {new Date().getFullYear()} CRAVEIT. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-5">
            <Link
              to="/privacy"
              className="font-[Inter] text-xs text-[#8A7C6A] transition-colors hover:text-[#FBF3E7]"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="font-[Inter] text-xs text-[#8A7C6A] transition-colors hover:text-[#FBF3E7]"
            >
              Terms
            </Link>

            <Link
              to="/contact"
              className="group inline-flex items-center gap-1.5 font-[Inter] text-xs text-[#8A7C6A] transition-colors hover:text-[#E8491D]"
            >
              Contact
              <FaArrowUpRightFromSquare className="text-[9px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
