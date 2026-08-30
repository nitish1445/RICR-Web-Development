import React from "react";
import {
  FaHeadset,
  FaBagShopping,
  FaLocationDot,
  FaCircleQuestion,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const HelpDesk = () => {
  const navigate = useNavigate();
  const supportOptions = [
    {
      title: "Order Issues",
      description: "Having trouble with an order or delivery?",
      icon: FaBagShopping,
    },
    {
      title: "Delivery Support",
      description: "Get help regarding delivery and tracking.",
      icon: FaLocationDot,
    },
    {
      title: "General Support",
      description: "Questions about your CraveIt account?",
      icon: FaCircleQuestion,
    },
  ];

  return (
    <main>
      {/* Header */}
      <section className="bg-[#1F1811] p-6 sm:p-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8491D]">
          Customer Support
        </p>

        <h1 className="mt-2 font-[Archivo_Black] text-3xl uppercase text-[#FBF3E7] sm:text-4xl">
          How Can We Help?
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-6 text-[#C9BEB0]">
          Find answers to common questions or get in touch with our support
          team.
        </p>
      </section>

      {/* Support Options */}
      <section className="mt-6">
        <div className="grid gap-4 md:grid-cols-3">
          {supportOptions.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.title}
                type="button"
                onClick={() => navigate("/contact")}
                className="group cursor-pointer bg-white p-6 text-left transition hover:bg-[#1F1811]"
              >
                <div className="flex size-11 items-center justify-center bg-[#FBF3E7] text-[#E8491D] transition group-hover:bg-[#E8491D] group-hover:text-[#FBF3E7]">
                  <Icon />
                </div>

                <h3 className="mt-5 font-[Archivo_Black] text-lg uppercase text-[#1F1811] transition group-hover:text-[#FBF3E7]">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#8A7C6A] transition group-hover:text-[#C9BEB0]">
                  {item.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-xs font-bold text-[#E8491D]">
                  Get Help
                  <FaArrowRight />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Contact */}
      <section className="mt-6 bg-[#E8491D] p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center bg-[#1F1811] text-[#FBF3E7]">
              <FaHeadset />
            </div>

            <div>
              <h2 className="font-[Archivo_Black] text-xl uppercase text-[#FBF3E7]">
                Still Need Help?
              </h2>

              <p className="mt-1 text-sm text-white/80">
                Our support team is ready to assist you.
              </p>
            </div>
          </div>

          <a
            href="mailto:nitishroy.dz@gmail.com"
            className="inline-flex items-center justify-center gap-2 bg-[#1F1811] px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#FBF3E7]"
          >
            <FaEnvelope />
            Contact Support
          </a>
        </div>
      </section>
    </main>
  );
};

export default HelpDesk;
