import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const CheckoutHeader = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#1F1811]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex cursor-pointer items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C9BEB0] transition-colors hover:text-[#E8491D]"
        >
          <FaArrowLeft />
          Back
        </button>

        <div className="mt-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8491D]">
            CraveIt Checkout
          </p>

          <h1 className="mt-2 font-[Archivo_Black] text-3xl uppercase text-[#FBF3E7] sm:text-4xl">
            COMPLETE YOUR ORDER
          </h1>

          <p className="mt-2 text-sm text-[#C9BEB0]">
            Confirm your delivery details and payment method.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CheckoutHeader;