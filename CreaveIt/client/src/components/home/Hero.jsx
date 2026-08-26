import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowRight,
  FaBowlFood,
  FaBurger,
  FaPizzaSlice,
  FaIceCream,
  FaClock,
  FaCheck,
} from "react-icons/fa6";

const categories = [
  { name: "Indian", icon: FaBowlFood },
  { name: "Burgers", icon: FaBurger },
  { name: "Pizza", icon: FaPizzaSlice },
  { name: "Desserts", icon: FaIceCream },
];

const orderItems = [
  { qty: "1x", name: "Butter Chicken", price: "\u20B9320" },
  { qty: "1x", name: "Garlic Naan", price: "\u20B960" },
  { qty: "1x", name: "Mango Lassi", price: "\u20B990" },
];

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#1F1811] py-12">
      {/* faint grain so the flat charcoal doesn't feel dead */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
          {/* Left content */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E8491D]/40 bg-[#E8491D]/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F2895A]">
              Today's craving, delivered hot
            </div>

            <h1 className="mt-5 font-[Archivo_Black] text-[2.75rem] leading-[0.95] tracking-tight text-[#FBF3E7] sm:text-[3.5rem] lg:text-[4rem]">
              CRAVING
              <br />
              SOMETHING
              <br />
              <span className="text-[#E8491D]">DELICIOUS?</span>
            </h1>

            <p className="mt-6 max-w-md font-[Inter] text-base leading-7 text-[#C9BEB0] sm:text-lg">
              Discover restaurants, explore your favorite dishes, and get
              delicious food delivered right to your door with CraveIt.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#E8491D] px-6 py-3.5 text-sm font-bold text-[#FBF3E7] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#F2895A] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                Login to Enjoy
                <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" />
              </button>

              <button
                type="button"
                onClick={() => navigate("/restaurants")}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#C9BEB0]/30 px-6 py-3.5 text-sm font-bold text-[#FBF3E7] transition-colors hover:border-[#6B8E4E] hover:text-[#9DBF7E] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#6B8E4E]"
              >
                Explore Restaurants
              </button>
            </div>

            {/* Category tags */}
            <div className="mt-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A7C6A]">
                On the menu today
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {categories.map((category) => {
                  const Icon = category.icon;

                  return (
                    <div
                      key={category.name}
                      className="flex items-center gap-1.5 rounded-full border border-dashed border-[#C9BEB0]/30 px-3 py-1.5 text-xs font-semibold text-[#E4D9C8]"
                    >
                      <Icon className="text-[#E8491D]" />
                      {category.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: signature order ticket */}
          <div className="relative flex items-center justify-center py-6">
            <div className="relative w-full max-w-sm -rotate-3 rounded-sm bg-[#FBF3E7] px-7 pb-9 pt-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:rotate-0 motion-reduce:transition-none">
              {/* perforated top edge */}
              <div className="absolute -top-2.5 left-0 right-0 flex justify-between px-3">
                {Array.from({ length: 14 }).map((_, i) => (
                  <span
                    key={i}
                    className="size-2.5 rounded-full bg-[#1F1811]"
                  />
                ))}
              </div>

              <p className="text-center font-[Archivo_Black] text-sm tracking-widest text-[#1F1811]">
                CRAVE<span className="text-[#E8491D]">IT</span>
              </p>
              <p className="mt-1 text-center font-[JetBrains_Mono] text-[10px] uppercase tracking-[0.2em] text-[#8A7C6A]">
                Order #4471
              </p>

              <div className="my-5 border-t border-dashed border-[#1F1811]/25" />

              <div className="space-y-2.5 font-[JetBrains_Mono] text-[13px] text-[#1F1811]">
                {orderItems.map((item) => (
                  <div key={item.name} className="flex justify-between">
                    <span className="text-[#8A7C6A]">{item.qty}</span>
                    <span className="flex-1 px-3">{item.name}</span>
                    <span>{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="my-5 border-t border-dashed border-[#1F1811]/25" />

              <div className="flex items-center justify-between font-[JetBrains_Mono] text-sm font-bold text-[#1F1811]">
                <span>TOTAL</span>
                <span>{"\u20B9470"}</span>
              </div>

              <div className="mt-2 flex items-center gap-1.5 font-[JetBrains_Mono] text-[11px] text-[#8A7C6A]">
                <FaClock className="text-[#E8491D]" />
                {"25\u201330 MIN"}
              </div>

              {/* ink stamp */}
              <div className="absolute -bottom-5 -right-5 flex size-20 -rotate-6 items-center justify-center rounded-full border-[3px] border-[#6B8E4E] bg-[#FBF3E7] text-[#6B8E4E]">
                <span className="text-center text-[9px] font-black uppercase leading-tight tracking-wider">
                  <FaCheck className="mx-auto mb-0.5 text-base" />
                  On the
                  <br />
                  way
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
