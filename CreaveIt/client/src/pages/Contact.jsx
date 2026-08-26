import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api";

import { FiSend, FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

const contactInfo = [
  {
    icon: FiMail,
    label: "Email us",
    value: "sarainitish@zohomail.in",
    href: "mailto:sarainitish@zohomail.in",
    description: "We'll get back to you within 24 hours.",
  },
  {
    icon: FiPhone,
    label: "Call us",
    value: "+91 9153109330",
    href: "tel:9153109330",
    description: "For urgent queries and assistance.",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: "+91 7645956734",
    href: "https://wa.me/917645956734",
    description: "Chat with our support team directly.",
    external: true,
  },
];

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [contactUs, setContactUs] = useState({
    fullName: "",
    email: "",
    subject: "",
    query: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleClear = () => {
    setContactUs({
      fullName: "",
      email: "",
      subject: "",
      query: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setContactUs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitContact = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/public/new-contact", contactUs);
      toast.success(res.data.message || "Message sent successfully!", {
        position: "bottom-center",
      });

      handleClear();
      setIsSubmitted(true);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FBF3E7]">
      {/* HERO */}

      <section className="relative overflow-hidden bg-[#1F1811]">
        {/* subtle texture */}

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#E8491D]">
              We're here to help
            </p>

            <h1 className="mt-3 font-[Archivo_Black] text-4xl uppercase leading-[0.95] tracking-tight text-[#FBF3E7] sm:text-5xl lg:text-6xl">
              LET'S TALK
              <br />
              ABOUT FOOD.
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-6 text-[#C9BEB0] sm:text-base">
              Have a question, need support, or want to share feedback? Send us
              a message and the CraveIt team will get back to you.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT CONTENT */}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* LEFT SIDE */}

          <div>
            <div className="border-b border-dashed border-[#1F1811]/20 pb-5">
              <p className="font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
                Contact details
              </p>

              <h2 className="mt-2 font-[Archivo_Black] text-2xl uppercase text-[#1F1811]">
                REACH OUT
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#8A7C6A]">
                Choose the easiest way to connect with us.
              </p>
            </div>

            <div className="divide-y divide-dashed divide-[#1F1811]/15">
              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    className="group flex items-start gap-4 py-5"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center border border-[#1F1811]/15 bg-[#F3E9DB] text-[#E8491D] transition-transform duration-200 group-hover:-translate-y-1">
                      <Icon className="text-base" />
                    </span>

                    <div className="min-w-0">
                      <p className="font-[JetBrains_Mono] text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                        {item.label}
                      </p>

                      <p className="mt-1 text-sm font-bold text-[#1F1811] transition-colors group-hover:text-[#E8491D]">
                        {item.value}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#8A7C6A]">
                        {item.description}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* ADDRESS */}

            <div className="border-t border-dashed border-[#1F1811]/20 py-5">
              <div className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center border border-[#1F1811]/15 bg-[#F3E9DB] text-[#E8491D]">
                  <FiMapPin className="text-base" />
                </span>

                <div>
                  <p className="font-[JetBrains_Mono] text-[9px] font-bold uppercase tracking-[0.16em] text-[#8A7C6A]">
                    Our location
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#1F1811]">
                    CraveIt - Food on Demand
                  </p>

                  <p className="mt-1 max-w-sm text-xs leading-5 text-[#8A7C6A]">
                    1st Floor, H.No. 00, Balaji Nagar, Aayodhya Bypass Road,
                    Bhopal, Madhya Pradesh, 462023
                  </p>
                </div>
              </div>
            </div>

            {/* SUPPORT HOURS */}

            <div className="mt-2 bg-[#1F1811] p-5">
              <div className="flex items-start gap-3">
                <FiClock className="mt-0.5 text-base text-[#E8491D]" />

                <div>
                  <p className="font-[JetBrains_Mono] text-[9px] font-bold uppercase tracking-[0.16em] text-[#C9BEB0]">
                    Support hours
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#FBF3E7]">
                    Every day · 11:00 AM - 8:00 PM
                  </p>

                  <p className="mt-1 text-xs text-[#C9BEB0]/70">
                    Indian Standard Time
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - FORM */}

          <div className="bg-white p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)] sm:p-7 lg:p-8">
            {isSubmitted ? (
              <div className="flex min-h-125 flex-col items-center justify-center text-center">
                {/* Success Icon */}
                <div className="flex size-16 items-center justify-center bg-[#E8491D] text-3xl text-[#FBF3E7]">
                  ✓
                </div>

                <p className="mt-6 font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8491D]">
                  Message received
                </p>

                <h2 className="mt-3 font-[Archivo_Black] text-3xl uppercase leading-tight text-[#1F1811] sm:text-4xl">
                  THANKS FOR
                  <br />
                  REACHING OUT!
                </h2>

                <p className="mt-4 max-w-md text-sm leading-6 text-[#8A7C6A]">
                  Your message has been successfully sent to the CraveIt team.
                  We'll get back to you as soon as possible.
                </p>

                <div className="mt-8 border-t border-dashed border-[#1F1811]/20 pt-6">
                  <p className="font-[JetBrains_Mono] text-[10px] uppercase tracking-wider text-[#8A7C6A]">
                    Usually responds within
                  </p>

                  <p className="mt-1 font-[Archivo_Black] text-xl text-[#1F1811]">
                    24 HOURS
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 cursor-pointer bg-[#1F1811] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#FBF3E7] transition-colors hover:bg-[#E8491D]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                {/* EXISTING FORM HEADER */}
                <div className="border-b border-dashed border-[#1F1811]/20 pb-5">
                  <p className="font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
                    Send a message
                  </p>

                  <h2 className="mt-2 font-[Archivo_Black] text-2xl uppercase text-[#1F1811] sm:text-3xl">
                    HOW CAN WE HELP?
                  </h2>

                  <p className="mt-2 text-sm text-[#8A7C6A]">
                    Fill in the details below and we'll take it from there.
                  </p>
                </div>

                <form
                  onSubmit={submitContact}
                  onReset={handleClear}
                  className="mt-6"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    {/* FULL NAME */}

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="fullName"
                        className="font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-wider text-[#1F1811]"
                      >
                        Full name <span className="text-[#E8491D]">*</span>
                      </label>

                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={contactUs.fullName}
                        onChange={handleChange}
                        placeholder="Your name"
                        disabled={isLoading}
                        required
                        className="w-full border border-[#1F1811]/20 bg-[#FBF3E7]/50 px-4 py-3 text-sm text-[#1F1811] outline-none transition-colors placeholder:text-[#8A7C6A]/60 focus:border-[#E8491D] disabled:cursor-not-allowed disabled:opacity-60"
                      />
                    </div>

                    {/* EMAIL */}

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="email"
                        className="font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-wider text-[#1F1811]"
                      >
                        Email address <span className="text-[#E8491D]">*</span>
                      </label>

                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={contactUs.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        disabled={isLoading}
                        required
                        className="w-full border border-[#1F1811]/20 bg-[#FBF3E7]/50 px-4 py-3 text-sm text-[#1F1811] outline-none transition-colors placeholder:text-[#8A7C6A]/60 focus:border-[#E8491D] disabled:cursor-not-allowed disabled:opacity-60"
                      />
                    </div>
                  </div>

                  {/* SUBJECT */}

                  <div className="mt-5 flex flex-col gap-2">
                    <label
                      htmlFor="subject"
                      className="font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-wider text-[#1F1811]"
                    >
                      Subject <span className="text-[#E8491D]">*</span>
                    </label>

                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={contactUs.subject}
                      onChange={handleChange}
                      placeholder="What can we help you with?"
                      disabled={isLoading}
                      required
                      className="w-full border border-[#1F1811]/20 bg-[#FBF3E7]/50 px-4 py-3 text-sm text-[#1F1811] outline-none transition-colors placeholder:text-[#8A7C6A]/60 focus:border-[#E8491D] disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>

                  {/* MESSAGE */}

                  <div className="mt-5 flex flex-col gap-2">
                    <label
                      htmlFor="query"
                      className="font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-wider text-[#1F1811]"
                    >
                      Message <span className="text-[#E8491D]">*</span>
                    </label>

                    <textarea
                      id="query"
                      name="query"
                      value={contactUs.query}
                      onChange={handleChange}
                      placeholder="Tell us more about your question..."
                      disabled={isLoading}
                      required
                      rows={6}
                      className="w-full resize-none border border-[#1F1811]/20 bg-[#FBF3E7]/50 px-4 py-3 text-sm leading-6 text-[#1F1811] outline-none transition-colors placeholder:text-[#8A7C6A]/60 focus:border-[#E8491D] disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>

                  {/* ACTIONS */}

                  <div className="mt-6 flex flex-col gap-3 border-t border-dashed border-[#1F1811]/20 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs leading-5 text-[#8A7C6A]">
                      Our support team usually responds within 24 hours.
                    </p>

                    <div className="flex items-center gap-3">
                      <button
                        type="reset"
                        disabled={isLoading}
                        className="cursor-pointer px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#8A7C6A] transition-colors hover:text-[#1F1811] disabled:cursor-not-allowed"
                      >
                        Clear
                      </button>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex cursor-pointer items-center justify-center gap-2 bg-[#E8491D] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#FBF3E7] transition-all hover:bg-[#cf3d16] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <FiSend className="text-sm" />

                        {isLoading ? "Sending..." : "Send message"}
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
