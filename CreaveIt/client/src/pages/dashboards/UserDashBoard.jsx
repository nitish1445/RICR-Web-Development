import React, { useState, useEffect } from "react";
import UserSideBar from "../../components/userDashboard/UserSideBar";
import UserOverview from "../../components/userDashboard/UserOverview";
import UserProfile from "../../components/userDashboard/UserProfile";
import UserOrder from "../../components/userDashboard/UserOrder";
import UserTransaction from "../../components/userDashboard/UserPayment";
import UserHelpDesk from "../../components/userDashboard/UserHelpDesk";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const UserDashBoard = () => {
  const { role, isLogin } = useAuth();
  const ActiveTab = useLocation().state?.tab;
  const navigate = useNavigate();
  const [active, setActive] = useState(ActiveTab || "overview");
  const [isCollapsed, setIsCollapsed] = useState(false);
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  });

  if (role !== "customer") {
    return (
      <>
        <div className="p-3">
          <div className="border rounded shadow p-5 w-4xl mx-auto text-center bg-gray-100">
            <div className="text-5xl text-red-600">⊗</div>
            <div className="text-xl">
              You are not login as Customer. Please Login again.
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="w-full flex h-screen">
        <div
          className={`bg-(--color-background) duration-300 ${isCollapsed ? "w-3/60" : "w-10/60"}`}
        >
          <UserSideBar
            active={active}
            setActive={setActive}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        </div>
        <div
          className={`bg-(--color-primary)/10 duration-300 ${isCollapsed ? "w-57/60" : " w-50/60"}`}
        >
          {active === "overview" && <UserOverview />}
          {active === "profile" && <UserProfile />}
          {active === "order" && <UserOrder />}
          {active === "transaction" && <UserTransaction />}
          {active === "helpDesk" && <UserHelpDesk />}
        </div>
      </div>
    </>
  );
};

export default UserDashBoard;
