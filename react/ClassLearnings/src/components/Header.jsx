import react from "react";
import { Link } from "react-router-dom";

const Header =  () => {
  return (
    <>
      <div className="flex justify-between bg-blue-700 py-2 sticky top-0">
        <h3 className="px-5 text-3xl font-bold text-amber-50">My Website</h3>
        <div className="flex gap-3 items-center px-2 text-[20px] text-amber-50">
          <Link to={"/"} className="text-decoration-none text-light">
            Home
          </Link>
          <Link to={"/register"} className="text-decoration-none text-light">
            Register
          </Link>
        </div>
      </div>
    </>
  );
}
export default Header;
