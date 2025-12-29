import React from "react";
import { FaHome } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const Home = () => {
  return (
    <>
      <div className=" text-2xl text-blue-600 font-bold text-center p-12">
        This is Home
      </div>
      <div className="flex gap-6 justify-center pb-10">
        <button className=" border border-[#fcfafa] rounded py-1 px-8 bg-[#1d7302] text-amber-50 cursor-pointer">
          <div className="flex items-center gap-2">
            <span>Start</span>
            <FaHome />
          </div>
        </button>
        <button className=" border border-[#fcfafa] rounded py-1 px-8 bg-[#e00909] text-amber-50 cursor-pointer">
          <div className="flex items-center gap-2">
            <span>End</span>
            <RxCross2 />
          </div>
        </button>
      </div>
    </>
  );
};

export default Home;
