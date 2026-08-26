import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaBolt,
  FaClock,
  FaHeart,
  FaCheck,
} from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";

const features = [
  {
    icon: FaBolt,
    title: "Order with ease",
    description:
      "Browse restaurants, explore menus, and place your order in just a few clicks.",
  },
  {
    icon: FaClock,
    title: "Fresh & fast",
    description:
      "From the kitchen to your doorstep, stay updated throughout your order.",
  },
  {
    icon: FaHeart,
    title: "Made for cravings",
    description:
      "Discover food, restaurants, and flavors you'll keep coming back to.",
  },
];

const offers = [
  "Discover restaurants around you",
  "Explore menus before you order",
  "Track your order with ease",
  "Enjoy a smooth ordering experience",
];

const About = () => {
  const navigate = useNavigate();

  return (
    <main className="text-[#1F1811]">
      {/* About : Hero */}
      <section className="relative overflow-hidden bg-[#1F1811]">
        {/* Decorative elements */}
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#E8491D]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#E8491D]/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E8491D]">
              ABOUT CRAVEIT
            </p>

            <h1 className="mt-4 font-[Archivo_Black] text-4xl uppercase leading-[0.95] tracking-tight text-[#FBF3E7] sm:text-6xl lg:text-7xl">
              FOOD YOU LOVE.
              <br />
              <span className="text-[#E8491D]">WITHOUT THE WAIT.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#C9BEB0] sm:text-base">
              CraveIt brings your favorite restaurants, delicious meals, and a
              smooth ordering experience together in one place.
            </p>

            <button
              type="button"
              onClick={() => navigate("/restaurants")}
              className="mt-7 inline-flex cursor-pointer items-center gap-2 bg-[#E8491D] px-5 py-3 text-sm font-bold text-[#FBF3E7] transition-colors hover:bg-[#FBF3E7] hover:text-[#1F1811]"
            >
              Explore restaurants
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>
      </section>

      {/* What we Do */}
      <section className="bg-[#E8491D] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.5fr] lg:gap-16">
            {/* Left */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1F1811]/70">
                WHAT WE DO
              </p>

              <h2 className="mt-4 font-[Archivo_Black] text-3xl uppercase leading-tight text-[#FBF3E7] sm:text-4xl">
                MORE THAN
                <br />
                JUST FOOD DELIVERY.
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-[#FBF3E7]/85">
                Whether you're looking for a quick meal, your favorite comfort
                food, or something completely new, CraveIt makes discovering and
                ordering food simple.
              </p>

              <div className="mt-7 space-y-3">
                {offers.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-[#FBF3E7]"
                  >
                    <FiCheckCircle className="shrink-0 text-sm text-[#1F1811]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Features */}
            <div className="grid gap-px bg-[#1F1811]/20 sm:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div key={feature.title} className="bg-[#E8491D] p-6 sm:p-7">
                    <Icon className="text-xl text-[#1F1811]" />

                    <h3 className="mt-6 text-base font-bold uppercase text-[#FBF3E7]">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-xs leading-6 text-[#FBF3E7]/75">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FBF3E7] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_0.6fr]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E8491D]">
                OUR MISSION
              </p>

              <h2 className="mt-4 max-w-3xl font-[Archivo_Black] text-4xl uppercase leading-[0.95] tracking-tight text-[#1F1811] sm:text-5xl lg:text-6xl">
                MAKING EVERY
                <br />
                CRAVING EASY TO
                <br />
                SATISFY.
              </h2>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-[#6E6256] sm:text-base">
                Our goal is simple — connect people with great food and make
                every step, from discovering a restaurant to placing an order,
                feel effortless.
              </p>
            </div>

            <div className="lg:text-right">
              <button
                type="button"
                onClick={() => navigate("/restaurants")}
                className="inline-flex cursor-pointer items-center gap-2 bg-[#1F1811] px-5 py-3 text-sm font-bold text-[#FBF3E7] transition-colors hover:bg-[#E8491D]"
              >
                Start exploring
                <FaArrowRight className="text-xs" />
              </button>

              <p className="mt-4 text-xs text-[#6E6256]">
                Good food is only a few clicks away.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
