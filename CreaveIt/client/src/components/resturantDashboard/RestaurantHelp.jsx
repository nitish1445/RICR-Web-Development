import React, { useState } from "react";
import {
  FaArrowRight,
  FaBookOpen,
  FaChevronDown,
  FaEnvelope,
  FaHeadset,
  FaPhone,
  FaQuestion,
  FaUtensils,
} from "react-icons/fa6";

const RestaurantHelp = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "How do I manage incoming orders?",
      answer:
        "Go to the Orders section from your restaurant dashboard. You can view active orders and update their status based on the current preparation and delivery stage.",
    },
    {
      question: "How can I add new menu items?",
      answer:
        "Open the Menu section from the sidebar and add your food item details, pricing, availability, preparation time and images.",
    },
    {
      question: "How are restaurant earnings calculated?",
      answer:
        "Your earnings are calculated from successfully completed and delivered orders. You can view your order performance and earnings from the Earnings section.",
    },
    {
      question: "Can I update my restaurant details?",
      answer:
        "Yes. Visit your Profile page to manage personal information, restaurant details, profile photo and account settings.",
    },
    {
      question: "What should I do if there is an issue with an order?",
      answer:
        "Review the order details and update its status when appropriate. For technical or account-related issues, contact CraveIt support.",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8491D]">
          Need Assistance?
        </p>

        <h1 className="mt-1 font-[Archivo_Black] text-2xl uppercase text-[#1F1811] sm:text-3xl">
          Help & Support
        </h1>

        <p className="mt-2 text-sm text-[#8A7C6A]">
          Find answers, get assistance and manage any issues with your
          restaurant account.
        </p>
      </div>

      {/* Support Hero */}
      <section className="bg-[#1F1811] p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="flex size-12 items-center justify-center bg-[#E8491D] text-[#FBF3E7]">
              <FaHeadset className="text-xl" />
            </div>

            <h2 className="mt-5 font-[Archivo_Black] text-2xl uppercase text-[#FBF3E7]">
              How Can We Help?
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#C9BEB0]">
              Our support team is here to help you manage your restaurant,
              orders and account without interruption.
            </p>
          </div>

          <a
            href="mailto:nitishroy.dz@gmail.com"
            className="inline-flex shrink-0 items-center justify-center gap-2 bg-[#E8491D] px-5 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#C93B16]"
          >
            Contact Support
            <FaArrowRight className="text-[10px]" />
          </a>
        </div>
      </section>

      {/* Quick Help */}
      <section className="mt-6">
        <div className="mb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
            Quick Access
          </p>

          <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase text-[#1F1811]">
            Explore Help Topics
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <HelpCard
            icon={<FaUtensils />}
            title="Order Management"
            description="Learn how to manage, accept and update customer orders."
          />

          <HelpCard
            icon={<FaBookOpen />}
            title="Menu Management"
            description="Add, update and manage your restaurant menu items."
          />

          <HelpCard
            icon={<FaQuestion />}
            title="Account Support"
            description="Get help with your profile, restaurant and account."
          />
        </div>
      </section>

      {/* FAQ - Full Width */}
      <section className="mt-6 bg-white">
        <div className="border-b border-[#1F1811]/10 p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
            Common Questions
          </p>

          <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase text-[#1F1811]">
            Frequently Asked
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-[#1F1811]/10 last:border-none"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left"
              >
                <span className="text-sm font-bold text-[#1F1811]">
                  {faq.question}
                </span>

                <FaChevronDown
                  className={`shrink-0 text-xs text-[#E8491D] transition-transform ${
                    openFaq === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openFaq === index && (
                <div className="px-5 pb-5">
                  <p className="text-sm leading-6 text-[#8A7C6A]">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Options */}
      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 bg-white p-5">
          <div className="flex size-11 shrink-0 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
            <FaEnvelope />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
              Email Support
            </p>

            <p className="mt-1 text-sm font-bold text-[#1F1811]">
              nitishroy.dz@gmail.com
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-5">
          <div className="flex size-11 shrink-0 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
            <FaPhone />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A7C6A]">
              Restaurant Support
            </p>

            <p className="mt-1 text-sm font-bold text-[#1F1811]">
              Available 24/7 for assistance
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

const HelpCard = ({ icon, title, description }) => {
  return (
    <div className="group bg-white p-5 transition-shadow hover:shadow-[0_12px_30px_rgba(31,24,17,0.08)]">
      <div className="flex size-11 items-center justify-center bg-[#FBF3E7] text-[#E8491D] transition group-hover:bg-[#E8491D] group-hover:text-white">
        {icon}
      </div>

      <h3 className="mt-5 font-[Archivo_Black] text-base uppercase text-[#1F1811]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#8A7C6A]">{description}</p>
    </div>
  );
};

export default RestaurantHelp;
