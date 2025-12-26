import react from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className=" d-flex justify-content-between bg-primary p-2">
        <h3>My Website</h3>
        <div className=" d-flex gap-3 align-items-center">
          <Link to={"/"} className="text-decoration-none text-light">Home</Link>
          <Link to={"/about"} className="text-decoration-none text-light">About</Link>
          <Link to={"/product"} className="text-decoration-none text-light">Product</Link>
          <Link to={"/contact"} className="text-decoration-none text-light">Contact</Link>
        </div>
      </div>
    </>
  );
};

export default Header;
