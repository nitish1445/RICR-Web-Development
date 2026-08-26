import React from "react";

import {
  FaMagnifyingGlass,
  FaCartShopping,
  FaMotorcycle,
} from "react-icons/fa6";

const steps = [
  {
    number: "01",
    title: "Discover",
    description: "Explore restaurants and find exactly what you're craving.",
    icon: FaMagnifyingGlass,
  },
  {
    number: "02",
    title: "Order",
    description:
      "Choose your favorites and place your order in just a few clicks.",
    icon: FaCartShopping,
  },
  {
    number: "03",
    title: "Enjoy",
    description: "Sit back while your food is delivered straight to your door.",
    icon: FaMotorcycle,
  },
];

const HowItWorks = () => {
  return (
    <section className="relative overflow-hidden bg-[#1F1811] py-16 sm:py-20">
      {/* Subtle Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="border-b border-dashed border-[#FBF3E7]/20 pb-6">
          <p className="font-[JetBrains_Mono] text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E8491D]">
            HOW IT WORKS
          </p>

          <h2 className="mt-2 font-[Archivo_Black] text-2xl leading-tight text-[#FBF3E7] sm:text-3xl">
            FROM CRAVING TO YOUR DOORSTEP
          </h2>

          <p className="mt-2 max-w-md font-[Inter] text-sm text-[#C9BEB0]">
            Getting your favorite food delivered is simple with CraveIt.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-8 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="group relative overflow-hidden bg-[#FBF3E7] px-6 py-6 shadow-[0_16px_40px_-18px_rgba(0,0,0,0.6)]"
              >
                {/* Step Number */}
                <span className="absolute right-5 top-4 font-[Archivo_Black] text-5xl leading-none text-[#1F1811]/5">
                  {step.number}
                </span>

                {/* Ticket Header */}
                <div className="flex items-center justify-between border-b border-dashed border-[#1F1811]/20 pb-4">
                  <span className="font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A7C6A]">
                    STEP {step.number}
                  </span>

                  <span
                    className={`size-2 rounded-full ${
                      index === 1 ? "bg-[#6B8E4E]" : "bg-[#E8491D]"
                    }`}
                  />
                </div>

                {/* Icon */}
                <div className="mt-6 text-3xl text-[#E8491D]">
                  <Icon />
                </div>

                {/* Content */}
                <h3 className="mt-5 font-[Archivo_Black] text-xl text-[#1F1811]">
                  {step.title.toUpperCase()}
                </h3>

                <p className="mt-2 max-w-xs font-[Inter] text-sm leading-6 text-[#8A7C6A]">
                  {step.description}
                </p>

                {/* Bottom Line */}
                <div className="mt-6 border-t border-dashed border-[#1F1811]/20 pt-3">
                  <span className="font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-[0.16em] text-[#6B8E4E]">
                    {index === 0 && "FIND YOUR FAVORITES"}
                    {index === 1 && "PLACE YOUR ORDER"}
                    {index === 2 && "FOOD ON THE WAY"}
                  </span>
                </div>

                {/* Receipt Cut */}
                <div className="absolute -bottom-1 left-0 right-0 flex justify-between px-1">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <span
                      key={i}
                      className="size-2 rounded-full bg-[#1F1811]"
                    />
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
