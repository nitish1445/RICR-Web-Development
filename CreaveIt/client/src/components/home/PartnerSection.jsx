import React from "react";
import { useNavigate } from "react-router-dom";

import { FaStore, FaMotorcycle, FaArrowRight } from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";

const PartnerSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#FBF3E7] py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-dashed border-[#1F1811]/20 pb-5">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E8491D]">
              Grow with CraveIt
            </p>

            <h2 className="mt-2 font-[Archivo_Black] text-2xl leading-tight text-[#1F1811] sm:text-3xl">
              LET'S GROW TOGETHER
            </h2>

            <p className="mt-2 font-[Inter] text-sm leading-6 text-[#8A7C6A]">
              Whether you run a restaurant or want to deliver, there is a place
              for you in the CraveIt journey.
            </p>
          </div>
        </div>

        {/* Partner Cards */}
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {/* Restaurant Partner */}
          <div className="group relative overflow-hidden bg-[#1F1811] px-6 py-7 sm:px-8">
            {/* Ticket Label */}
            <div className="flex items-center justify-between border-b border-dashed border-[#FBF3E7]/20 pb-4">
              <div className="flex items-center gap-2">
                <FaStore className="text-[#E8491D]" />

                <span className="font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9BEB0]">
                  Restaurant Partner
                </span>
              </div>

              <span className="font-[JetBrains_Mono] text-[10px] text-[#8A7C6A]">
                #JOIN01
              </span>
            </div>

            <div className="relative z-10 pt-5">
              <h3 className="max-w-sm font-[Archivo_Black] text-xl leading-tight text-[#FBF3E7] sm:text-2xl">
                SERVE MORE.
                <br />
                REACH MORE.
              </h3>

              <p className="mt-3 max-w-md font-[Inter] text-sm leading-6 text-[#C9BEB0]">
                Put your restaurant in front of more hungry customers, manage
                orders, and grow your business with CraveIt.
              </p>

              {/* Benefits */}
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                {[
                  "Reach more customers",
                  "Manage orders easily",
                  "Grow your business",
                ].map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-1.5 font-[JetBrains_Mono] text-[10px] text-[#C9BEB0]"
                  >
                    <FiCheckCircle className="text-[#E8491D]" />
                    {item}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => navigate("/restaurant-signup")}
                className="group/btn mt-6 inline-flex cursor-pointer items-center gap-2 bg-[#E8491D] px-5 py-3 text-sm font-bold text-[#FBF3E7] transition-transform duration-200 hover:-translate-y-0.5"
              >
                List Your Restaurant
                <FaArrowRight className="text-xs transition-transform duration-200 group-hover/btn:translate-x-1" />
              </button>
            </div>

            {/* Decorative Number */}
            <span className="pointer-events-none absolute -bottom-8 -right-2 font-[Archivo_Black] text-[11rem] leading-none text-white/3">
              01
            </span>
          </div>

          {/* Delivery Partner */}
          <div className="group relative overflow-hidden bg-[#6B8E4E] px-6 py-7 sm:px-8">
            {/* Ticket Label */}
            <div className="flex items-center justify-between border-b border-dashed border-[#FBF3E7]/25 pb-4">
              <div className="flex items-center gap-2">
                <FaMotorcycle className="text-[#FBF3E7]" />

                <span className="font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-[0.18em] text-[#FBF3E7]/80">
                  Delivery Partner
                </span>
              </div>

              <span className="font-[JetBrains_Mono] text-[10px] text-[#FBF3E7]/60">
                #JOIN02
              </span>
            </div>

            <div className="relative z-10 pt-5">
              <h3 className="max-w-sm font-[Archivo_Black] text-xl leading-tight text-[#FBF3E7] sm:text-2xl">
                RIDE MORE.
                <br />
                EARN MORE.
              </h3>

              <p className="mt-3 max-w-md font-[Inter] text-sm leading-6 text-[#FBF3E7]/75">
                Deliver great food, earn on your own schedule, and help bring
                every craving straight to someone's door.
              </p>

              {/* Benefits */}
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                {[
                  "Flexible schedule",
                  "Earn while you deliver",
                  "Join the CraveIt network",
                ].map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-1.5 font-[JetBrains_Mono] text-[10px] text-[#FBF3E7]/80"
                  >
                    <FiCheckCircle className="text-[#FBF3E7]" />
                    {item}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => navigate("/partner-signup")}
                className="group/btn mt-6 inline-flex cursor-pointer items-center gap-2 bg-[#FBF3E7] px-5 py-3 text-sm font-bold text-[#1F1811] transition-transform duration-200 hover:-translate-y-0.5"
              >
                Become a Delivery Partner
                <FaArrowRight className="text-xs transition-transform duration-200 group-hover/btn:translate-x-1" />
              </button>
            </div>

            {/* Decorative Number */}
            <span className="pointer-events-none absolute -bottom-8 -right-2 font-[Archivo_Black] text-[11rem] leading-none text-white/8">
              02
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
