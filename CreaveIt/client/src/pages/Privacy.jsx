import React from "react";
import {
  FaShieldHalved,
  FaLock,
  FaUserShield,
  FaArrowLeft,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const Privacy = () => {
  const sections = [
    {
      number: "01",
      title: "Information We Collect",
      content:
        "We collect information you provide when creating an account, placing an order, contacting us, or using CraveIt. This may include your name, email address, phone number, delivery address, and other information required to provide our services.",
    },
    {
      number: "02",
      title: "How We Use Your Information",
      content:
        "Your information helps us process orders, manage deliveries, provide customer support, improve the CraveIt experience, and communicate important updates related to your account or orders.",
    },
    {
      number: "03",
      title: "Payments & Transactions",
      content:
        "Payment information is used only for processing transactions and managing orders. CraveIt does not intentionally expose sensitive payment details to other users or restaurants.",
    },
    {
      number: "04",
      title: "Sharing Information",
      content:
        "We may share necessary order and delivery information with restaurants, delivery partners, and service providers when required to complete and support your order.",
    },
    {
      number: "05",
      title: "Data Security",
      content:
        "We take reasonable measures to protect your personal information. However, no method of online storage or transmission can be guaranteed to be completely secure.",
    },
    {
      number: "06",
      title: "Your Choices",
      content:
        "You may review or update your account information through your CraveIt account or dashboard. If you need assistance with your information, you can contact our support team.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF3E7]">
      {/* Hero */}
      <section className="bg-[#1F1811]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <Link
            to={"/restaurants"}
            className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FBF3E7]/70 transition-colors hover:text-[#E8491D]"
          >
            <FaArrowLeft className="text-[10px]" />
            Back to Orders
          </Link>

          <div className="mt-8 max-w-3xl">
            <div className="flex size-12 items-center justify-center rounded-sm bg-[#E8491D] text-[#FBF3E7]">
              <FaShieldHalved className="text-xl" />
            </div>

            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#E8491D]">
              CraveIt Policies
            </p>

            <h1 className="mt-3 font-[Archivo_Black] text-4xl leading-tight text-[#FBF3E7] sm:text-5xl">
              PRIVACY POLICY
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#C9BEB0] sm:text-base">
              Your privacy matters to us. This policy explains what information
              CraveIt collects, how we use it, and the choices available to you.
            </p>

            <p className="mt-6 font-[JetBrains_Mono] text-[11px] uppercase tracking-wider text-[#8A7C6A]">
              Last updated: August 2026
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.5fr]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E8491D]">
                Your information
              </p>

              <h2 className="mt-3 font-[Archivo_Black] text-2xl leading-tight text-[#1F1811] sm:text-3xl">
                SIMPLE, CLEAR & TRANSPARENT.
              </h2>
            </div>

            <div className="border-l-2 border-[#E8491D] pl-6">
              <p className="text-sm leading-7 text-[#6F6254] sm:text-base">
                At CraveIt, we use your information to make ordering food,
                managing deliveries, and using our platform easier and more
                reliable. We only use information when it is necessary for
                providing and improving our services.
              </p>

              <p className="mt-4 text-sm leading-7 text-[#6F6254] sm:text-base">
                By using CraveIt, you agree to the practices described in this
                Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Sections */}
      <section className="border-t border-dashed border-[#1F1811]/20">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-x-10 gap-y-0 md:grid-cols-2">
            {sections.map((section) => (
              <article
                key={section.number}
                className="border-b border-dashed border-[#1F1811]/20 py-8"
              >
                <div className="flex items-start gap-5">
                  <span className="font-[JetBrains_Mono] text-xs font-bold text-[#E8491D]">
                    {section.number}
                  </span>

                  <div>
                    <h2 className="font-[Archivo_Black] text-lg text-[#1F1811]">
                      {section.title.toUpperCase()}
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-[#6F6254]">
                      {section.content}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Security Note */}
      <section className="bg-[#E8491D]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center bg-[#1F1811] text-[#FBF3E7]">
                <FaLock className="text-sm" />
              </div>

              <div>
                <h2 className="font-[Archivo_Black] text-xl text-[#FBF3E7]">
                  QUESTIONS ABOUT YOUR PRIVACY?
                </h2>

                <p className="mt-2 text-sm text-[#FBF3E7]/80">
                  Contact our team if you need help regarding your personal
                  information or privacy on CraveIt.
                </p>
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 bg-[#1F1811] px-5 py-3 text-sm font-bold text-[#FBF3E7] transition-colors hover:bg-[#2B231B]"
            >
              <FaUserShield />
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
