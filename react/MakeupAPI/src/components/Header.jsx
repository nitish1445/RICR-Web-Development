import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="flex justify-around items-center bg-teal-600 py-3 sticky top-0 w-full">
        <div className=" font-bold text-[24px]">Glow More</div>
        <div className="flex gap-3 text-[18px]">
          <Link to={"/"}>Home</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/contact"}>Contact</Link>
          <Link to={"/login"}>Login</Link>
        </div>
      </div>
    </>
  );
};

export default Header;
