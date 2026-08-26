import React from "react";
import { FaUtensils } from "react-icons/fa6";

const Loading = () => {
  return (
    <div className="flex min-h-[calc(100vh-64px)] w-full flex-col items-center justify-center bg-[#F7FCFE] px-4">
      <div className="flex flex-col items-center">
        {/* Animated Icon */}
        <div className="relative flex h-16 w-16 items-center justify-center bg-[#161E54] shadow-lg shadow-[#161E54]/20">
          <FaUtensils className="h-7 w-7 animate-pulse text-[#F16D34]" />

          <div className="absolute -inset-2 border border-[#F16D34]/30 animate-ping" />
        </div>

        {/* Brand */}
        <h1 className="mt-5 text-2xl font-bold tracking-tight text-[#161E54]">
          Crave<span className="text-[#F16D34]">IT</span>
        </h1>

        {/* Loading Text */}
        <p className="mt-2 text-sm text-[#161E54]/60">
          Preparing something delicious...
        </p>

        {/* Loading Dots */}
        <div className="mt-5 flex items-center gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#F16D34]" />

          <span className="h-2 w-2 animate-bounce rounded-full bg-[#FF986A] [animation-delay:150ms]" />

          <span className="h-2 w-2 animate-bounce rounded-full bg-[#161E54] [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
