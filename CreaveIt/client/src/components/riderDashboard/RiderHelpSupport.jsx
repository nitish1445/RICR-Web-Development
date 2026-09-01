import React, { useState } from "react";
import {
  FaHeadset,
  FaChevronDown,
  FaChevronUp,
  FaCircleQuestion,
  FaMotorcycle,
  FaBoxOpen,
  FaIndianRupeeSign,
  FaShieldHalved,
  FaTriangleExclamation,
} from "react-icons/fa6";

const RiderHelpSupport = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "How do I accept a delivery order?",
      answer:
        "Go to the Current Orders section and review the assigned order. You can view restaurant and delivery details before proceeding with the delivery.",
    },
    {
      question: "When will I receive my earnings?",
      answer:
        "Your earnings are calculated based on successfully delivered orders. Settlement details and payment schedules are reflected in your rider dashboard.",
    },
    {
      question: "What should I do if I cannot deliver an order?",
      answer:
        "Follow the delivery workflow and update the order status appropriately. Make sure order information is reviewed carefully before proceeding.",
    },
    {
      question: "How can I update my profile information?",
      answer:
        "Go to your Rider Profile page and use the Edit Profile option to update your personal and delivery information.",
    },
    {
      question: "What if the restaurant order is not ready?",
      answer:
        "Wait for the restaurant to prepare the order before pickup. Keep checking the order status and proceed once the order is ready.",
    },
  ];

  const supportCategories = [
    {
      title: "Delivery Issues",
      description: "Guidance related to pickup and delivery workflow.",
      icon: FaMotorcycle,
    },
    {
      title: "Order Issues",
      description: "Information about assigned and completed orders.",
      icon: FaBoxOpen,
    },
    {
      title: "Payment & Earnings",
      description: "Understand delivery earnings and payments.",
      icon: FaIndianRupeeSign,
    },
    {
      title: "Account & Safety",
      description: "Help regarding your rider account and safety.",
      icon: FaShieldHalved,
    },
  ];

  return (
    <main className="pb-10">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
          Rider Assistance
        </p>

        <h1 className="mt-1 font-[Archivo_Black] text-2xl uppercase text-[#1F1811] sm:text-3xl">
          Help & Support
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-[#8A7C6A]">
          Find helpful information and answers to common questions about
          deliveries, orders, earnings and your rider account.
        </p>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#1F1811] p-6 sm:p-8">
        <span className="pointer-events-none absolute right-5 top-0 font-[Archivo_Black] text-7xl uppercase text-white/[0.035] sm:text-9xl">
          Support
        </span>

        <div className="relative flex items-center gap-5">
          <div className="flex size-16 shrink-0 items-center justify-center bg-[#E8491D] text-[#FBF3E7]">
            <FaHeadset className="text-2xl" />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
              Rider Assistance Center
            </p>

            <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase text-[#FBF3E7] sm:text-2xl">
              Everything You Need To Know
            </h2>

            <p className="mt-2 max-w-xl text-sm text-[#C9BEB0]">
              Explore helpful guidance for managing deliveries, tracking
              earnings, handling orders and maintaining your rider account.
            </p>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="mt-8">
        <div className="mb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
            Quick Help
          </p>

          <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase text-[#1F1811]">
            Explore By Category
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {supportCategories.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="bg-white p-5">
                <div className="flex size-11 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
                  <Icon />
                </div>

                <h3 className="mt-5 text-sm font-bold text-[#1F1811]">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-[#8A7C6A]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-8">
        <div className="mb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
            Common Questions
          </p>

          <h2 className="mt-1 font-[Archivo_Black] text-xl uppercase text-[#1F1811]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <div key={index} className="bg-white">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center bg-[#FBF3E7] text-[#E8491D]">
                      <FaCircleQuestion className="text-xs" />
                    </div>

                    <span className="text-sm font-bold text-[#1F1811]">
                      {faq.question}
                    </span>
                  </div>

                  {isOpen ? (
                    <FaChevronUp className="shrink-0 text-xs text-[#E8491D]" />
                  ) : (
                    <FaChevronDown className="shrink-0 text-xs text-[#8A7C6A]" />
                  )}
                </button>

                {isOpen && (
                  <div className="border-t border-dashed border-[#1F1811]/10 px-5 pb-5 pt-4">
                    <p className="pl-11 text-sm leading-6 text-[#8A7C6A]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Important Information */}
      <section className="mt-8 flex items-start gap-4 bg-[#E8491D] p-6 text-[#FBF3E7] sm:p-8">
        <div className="flex size-12 shrink-0 items-center justify-center bg-[#1F1811]">
          <FaTriangleExclamation className="text-lg" />
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
            Important Information
          </p>

          <h2 className="mt-1 font-[Archivo_Black] text-lg uppercase">
            Deliver Safely & Responsibly
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-white/80">
            Always verify order details before pickup, follow the correct
            delivery workflow and ensure safe handling of food orders during
            every delivery.
          </p>
        </div>
      </section>
    </main>
  );
};

export default RiderHelpSupport;
