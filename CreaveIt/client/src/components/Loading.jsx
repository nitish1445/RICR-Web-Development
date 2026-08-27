import React from "react";
import Logo from "../assets/craveIt-logo.png";

const Loading = () => {
  return (
    <div className="flex min-h-[calc(100vh-64px)] w-full flex-col items-center justify-center bg-[#F7FCFE] px-4">
      <div className="flex flex-col items-center">
        {/* Animated Icon */}
        <div className="relative flex h-16 w-16 items-center justify-center bg-[#161E54] shadow-lg shadow-[#161E54]/20">
          <img
            src={Logo}
            alt="Logo"
            className="h-10 w-10 animate-pulse object-contain"
          />

          <div className="absolute -inset-2 animate-ping border border-[#F16D34]/30" />
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
          <span className="sine-dot h-2 w-2 rounded-full bg-[#F16D34]" />
          <span
            className="sine-dot h-2 w-2 rounded-full bg-[#FF986A]"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="sine-dot h-2 w-2 rounded-full bg-[#161E54]"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
