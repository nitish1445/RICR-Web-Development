import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api";
import { FiSend } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const [contactUs, setContactUs] = useState({
    fullName: "",
    email: "",
    subject: "",
    query: "",
  });

  const handleClear = () => {
    setContactUs({
      fullName: "",
      email: "",
      subject: "",
      query: "",
    });
  };
  const [isLoading, setIsLoading] = useState(false);
  const [validError, setValidError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactUs((prev) => ({ ...prev, [name]: value }));
  };
  const validate = () => {
    let Error = {};

    // Name validation

    if (contactUs.fullName.length == 0) {
      Error.fullName = "Please Enter your name here";
    } else {
      if (contactUs.fullName.length < 3) {
        Error.fullName = "Name should contain atleast three letters.";
      } else {
        if (!/^[A-z ]+$/.test(contactUs.fullName)) {
          Error.fullName = "Name should contains only A-Z, a-z and space.";
        }
      }
    }

    // email validation

    if (contactUs.email.length == 0) {
      Error.email = "Please enter your email first.";
    } else {
      if (
        !/^[\w.+-]+@(gmail|outlook|ricr|yahoo)\.(com|in|co\.in)$/.test(
          contactUs.email
        )
      ) {
        Error.email = "Use registered email only.";
      }
    }

    setValidError(Error);
    return Object.keys(Error).length > 0 ? true : false;
  };

  const submitContact = async (e) => {
    e.preventDefault();

    // Checks Any missing fields
    if (validate()) {
      toast.error("Use proper Name and Email.");
      return;
    }
    try {
      const res = await api.post("/public/new-contact", contactUs);
      setIsLoading(true);
      toast.success(res.data.message, { position: "bottom-center" });
      handleClear();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Unkown Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-5 px-4">
        {/* This isi Header */}

        <div className="text-center">
          <h1 className="text-4xl font-bold text-(--color-text)">
            Contact Us{" "}
          </h1>
        </div>

        {/* contact box */}

        <div className="flex justify-center mt-5 ">
          <div className="container max-w-6xl px-8 py-6 ">
            <div className="grid grid-cols-2 gap-10">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden p-8">
                <h1 className="text-2xl font-semibold text-(--color-primary) mb-5 ">
                  Reach us
                </h1>
                <div className="space-y-8">
                  {/* email */}

                  <div className="flex gap-5 items-center">
                    <div className="text-blue-700 font-bold text-2xl border border-none bg-blue-100 rounded-[50%] p-3">
                      <MdOutlineMail />
                    </div>
                    <div>
                      <a
                        href="mailto:sarainitish@gmail.com"
                        className="text-blue-600 hover:underline text-[17px]"
                      >
                        nitish@gmail.com
                      </a>
                      <div className="text-gray-600 text-[14px]">
                        We'll respond you within 24 hours
                      </div>
                    </div>
                  </div>

                  {/* phone number */}

                  <div className="flex gap-5 items-center">
                    <div className="text-blue-700 font-bold text-2xl border border-none bg-blue-100 rounded-[50%] p-3">
                      <IoCallOutline />
                    </div>
                    <div>
                      <div className="flex gap-5">
                        <a href="tel:9153109330" className="hover:underline ">
                          +91 999999XXXX
                        </a>
                      </div>

                      <div className="text-gray-600 text-[14px]">
                        For urgent queries only
                      </div>
                    </div>
                  </div>

                  {/* whatsapp link */}

                  <div className="flex gap-5 items-center">
                    <div className="text-green-700 font-bold text-2xl border border-none bg-green-100 rounded-[50%] p-3">
                      <FaWhatsapp />
                    </div>
                    <div>
                      <div className="flex gap-5">
                        <a
                          href="https://wa.me/7645956734"
                          target="blank"
                          className="hover:underline "
                        >
                          764595XXX
                        </a>
                      </div>

                      <div className="text-gray-600 text-[14px]">
                        Chat with us instantly
                      </div>
                      <div className="text-[12px] text-gray-500">
                        Fastest response
                      </div>
                    </div>
                  </div>

                  {/* address */}

                  <div className="flex gap-5 items-center">
                    <div className="text-violet-700 font-bold text-2xl border border-none bg-violet-100 rounded-[50%] p-3">
                      <MdOutlineLocationOn />
                    </div>
                    <div>
                      <div>CraveIt - Food you on demand</div>
                      <div className="text-gray-600 text-[14px]">
                        1st Floor, H.No. 00, Balaji Nagar, Aayodhya Bypass Road,
                        Bhopal, MP - 462023
                      </div>
                    </div>
                  </div>

                  {/* Office time */}

                  <div className="px-5 pt-3 pb-6 bg-(--color-background) rounded">
                    <div className="flex flex-col gap-3">
                      <h1 className="font-bold text-[18px]">Support Hours</h1>
                      <div className="flex gap-2">
                        <h3 className="font-bold ">Daily</h3>
                        <p>11:00 AM - 8:00 PM IST</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* User queries box */}

              <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                <form
                  onSubmit={submitContact}
                  onReset={handleClear}
                  className="p-8"
                >
                  <h1 className="text-2xl font-semibold text-(--color-primary) mb-5">
                    Send us a message
                  </h1>

                  <div className="space-y-3">
                    {/* Contact name */}

                    <div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="fullName" name="fullName" id="fullName">
                          Full Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          placeholder="Nitish Kumar"
                          value={contactUs.fullName}
                          onChange={handleChange}
                          disabled={isLoading}
                          required
                          className="w-full h-fit px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                        />
                      </div>
                      {validError.fullName && (
                        <span className="text-xs text-red-500">
                          {validError.fullName}
                        </span>
                      )}
                    </div>

                    {/* Contact email */}

                    <div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" name="email" id="email">
                          Email <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          value={contactUs.email}
                          placeholder="nitish@example.com"
                          onChange={handleChange}
                          disabled={isLoading}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                        />
                      </div>
                      {validError.email && (
                        <span className="text-xs text-red-500">
                          {validError.email}
                        </span>
                      )}
                    </div>

                    {/* Contact subject/topic */}

                    <div className="flex flex-col gap-2">
                      <label htmlFor="subject" name="subject" id="subject">
                        Subject <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        value={contactUs.subject}
                        placeholder="Request Help"
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                      />
                    </div>

                    {/* Contact query in detail */}

                    <div className="flex flex-col gap-2">
                      <label htmlFor="query" name="query" id="query">
                        Message <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        type="text"
                        name="query"
                        id="query"
                        value={contactUs.query}
                        placeholder="Please describe your query in detail.."
                        onChange={handleChange}
                        disabled={isLoading}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}

                  <div className=" text-center mt-5">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-(--color-secondary) text-black font-bold py-3 px-6 rounded-lg hover:bg-(--color-secondary-hover) shadow-lg cursor-pointer w-full disabled:cursor-not-alloweddisabled:bg-(--color-secondary)"
                    >
                      <div className="flex gap-2 items-center justify-center">
                        {<FiSend />} <span>Send Message</span>
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
