import React from "react";
import {
  FaMoneyBillWave,
  FaCreditCard,
} from "react-icons/fa6";

const PaymentMethod = ({
  paymentMethod,
  setPaymentMethod,
}) => {
  const methods = [
    {
      id: "COD",
      label: "Cash on Delivery",
      description: "Pay when your food arrives.",
      icon: FaMoneyBillWave,
    },
    {
      id: "ONLINE",
      label: "Online Payment",
      description: "Pay securely using your preferred method.",
      icon: FaCreditCard,
    },
  ];

  return (
    <section className="bg-white p-5 shadow-[0_10px_30px_-18px_rgba(31,24,17,0.3)] sm:p-6">
      <div className="border-b border-dashed border-[#1F1811]/15 pb-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
          Payment
        </p>

        <h2 className="mt-1 font-[Archivo_Black] text-xl text-[#1F1811]">
          PAYMENT METHOD
        </h2>
      </div>

      <div className="mt-5 space-y-3">
        {methods.map((method) => {
          const Icon = method.icon;
          const isSelected =
            paymentMethod === method.id;

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => setPaymentMethod(method.id)}
              className={`flex w-full cursor-pointer items-center gap-4 border p-4 text-left transition-colors ${
                isSelected
                  ? "border-[#E8491D] bg-[#FFF7F2]"
                  : "border-[#1F1811]/10 hover:border-[#1F1811]/30"
              }`}
            >
              <span
                className={`flex size-10 shrink-0 items-center justify-center ${
                  isSelected
                    ? "bg-[#E8491D] text-[#FBF3E7]"
                    : "bg-[#FBF3E7] text-[#1F1811]"
                }`}
              >
                <Icon />
              </span>

              <span className="flex-1">
                <span className="block text-sm font-bold text-[#1F1811]">
                  {method.label}
                </span>

                <span className="mt-1 block text-xs text-[#8A7C6A]">
                  {method.description}
                </span>
              </span>

              <span
                className={`flex size-4 items-center justify-center rounded-full border ${
                  isSelected
                    ? "border-[#E8491D]"
                    : "border-[#1F1811]/30"
                }`}
              >
                {isSelected && (
                  <span className="size-2 rounded-full bg-[#E8491D]" />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default PaymentMethod;