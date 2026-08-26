import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaLocationDot,
  FaArrowRight,
  FaPhone,
} from "react-icons/fa6";

const DeliveryAddress = ({ user, hasValidAddress }) => {
  const navigate = useNavigate();

  return (
    <section className="bg-white p-5 shadow-[0_10px_30px_-18px_rgba(31,24,17,0.3)] sm:p-6">
      <div className="flex items-start justify-between gap-4 border-b border-dashed border-[#1F1811]/15 pb-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8491D]">
            Delivery details
          </p>

          <h2 className="mt-1 font-[Archivo_Black] text-xl text-[#1F1811]">
            DELIVERY ADDRESS
          </h2>
        </div>

        <FaLocationDot className="text-lg text-[#E8491D]" />
      </div>

      {hasValidAddress ? (
        <div className="mt-5">
          <h3 className="font-bold text-[#1F1811]">
            {user?.fullName}
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#8A7C6A]">
            {user?.address}
            <br />
            {user?.city} - {user?.pin}
          </p>

          {user?.phone && (
            <div className="mt-3 flex items-center gap-2 text-sm text-[#8A7C6A]">
              <FaPhone className="text-xs text-[#E8491D]" />
              {user.phone}
            </div>
          )}

          <button
            type="button"
            onClick={() => navigate("/user-dashboard")}
            className="mt-5 inline-flex cursor-pointer items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1F1811] transition-colors hover:text-[#E8491D]"
          >
            Update address
            <FaArrowRight />
          </button>
        </div>
      ) : (
        <div className="mt-5">
          <p className="text-sm leading-6 text-[#8A7C6A]">
            You haven't added a delivery address yet. Please update
            your profile before placing the order.
          </p>

          <button
            type="button"
            onClick={() => navigate("/user-dashboard")}
            className="mt-5 inline-flex cursor-pointer items-center gap-2 bg-[#E8491D] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#FBF3E7] transition-opacity hover:opacity-90"
          >
            Update Address
            <FaArrowRight />
          </button>
        </div>
      )}
    </section>
  );
};

export default DeliveryAddress;