import { Link } from "react-router-dom";

import {
  FaUtensils,
  FaArrowLeft,
  FaHouse,
  FaArrowRight,
} from "react-icons/fa6";

const NotFound = () => {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#FBF3E7] px-4">
      {/* Background decorative text */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute -left-10 top-10 font-[Archivo_Black] text-[180px] leading-none text-[#1F1811]/3 sm:text-[280px]">
          404
        </span>

        <span className="absolute -right-16 bottom-0 font-[Archivo_Black] text-[180px] leading-none text-[#E8491D]/4 sm:text-[280px]">
          OOPS
        </span>
      </div>

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(#1F1811 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <section className="relative w-full max-w-2xl text-center">
        {/* Brand */}
        <Link to="/" className="inline-flex items-center gap-2 text-[#1F1811]">
          <span className="flex size-9 items-center justify-center bg-[#1F1811] text-[#FBF3E7]">
            <FaUtensils className="text-sm" />
          </span>

          <span className="font-[Archivo_Black] text-lg tracking-tight">
            CRAVE<span className="text-[#E8491D]">IT</span>
          </span>
        </Link>

        {/* Error Label */}
        <p className="mt-10 font-[JetBrains_Mono] text-[10px] font-bold uppercase tracking-[0.25em] text-[#E8491D]">
          Error 404 - Page Not Found
        </p>

        {/* 404 */}
        <div className="relative mt-2">
          <h1 className="font-[Archivo_Black] text-[110px] leading-none tracking-tight text-[#1F1811] sm:text-[170px]">
            4
            <span className="relative inline-block text-[#E8491D]">
              0
              <span className="absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#FBF3E7] text-[10px] text-[#FBF3E7] sm:size-12 sm:text-xs">
                ?
              </span>
            </span>
            4
          </h1>
        </div>

        {/* Message */}
        <h2 className="mt-2 font-[Archivo_Black] text-2xl uppercase text-[#1F1811] sm:text-3xl">
          This order got lost.
        </h2>

        <p className="mx-auto mt-3 max-w-md font-[Inter] text-sm leading-6 text-[#8A7C6A]">
          Looks like the page you're looking for isn't on our menu anymore.
          Let's get you back to something delicious.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="group inline-flex items-center justify-center gap-2 bg-[#E8491D] px-5 py-3 text-sm font-bold text-[#FBF3E7] transition-transform hover:-translate-y-0.5"
          >
            <FaHouse className="text-xs" />
            Back to Home
            <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-1" />
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex cursor-pointer items-center justify-center gap-2 border border-[#1F1811]/15 px-5 py-3 text-sm font-bold text-[#1F1811] transition-colors hover:bg-[#1F1811] hover:text-[#FBF3E7]"
          >
            <FaArrowLeft className="text-xs" />
            Go Back
          </button>
        </div>

        {/* Bottom note */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#1F1811]/15" />

          <p className="font-[JetBrains_Mono] text-[9px] uppercase tracking-[0.18em] text-[#8A7C6A]">
            © {new Date().getFullYear()} CraveIt
          </p>

          <span className="h-px w-8 bg-[#1F1811]/15" />
        </div>
      </section>
    </main>
  );
};

export default NotFound;
