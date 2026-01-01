import React from "react";

import { FaDollarSign } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { FaPoundSign } from "react-icons/fa";
import { FaEuroSign } from "react-icons/fa";

const Header = () => {
  return (
    <>
      <div className="flex justify-center bg-blue-600 py-3 text-amber-50 items-center text-2xl font-bold">
        <FaRupeeSign className="animate-spin" />
        <FaPoundSign className="animate-pulse" />
        <span className="px-1 text-3xl">Currency Converter</span>
        <FaDollarSign className="animate-bounce" />
        <FaEuroSign className="animate-ping" />
      </div>
    </>
  );
};

export default Header;
