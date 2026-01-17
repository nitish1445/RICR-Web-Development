import React, { useState } from "react";
import UserSideBar from "../../components/userDashboard/UserSideBar";
import UserOverview from "../../components/userDashboard/UserOverview";
import UserProfile from "../../components/userDashboard/UserProfile";
import UserOrder from "../../components/userDashboard/UserOrder";
import UserTransaction from "../../components/userDashboard/UserPayment";
import UserHelpDesk from "../../components/userDashboard/UserHelpDesk";

const UserDashBoard = () => {
  const [active, setActive] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>
      <div className="w-full flex h-[89.9vh]">
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
          className={`border border-amber-600 duration-300 ${isCollapsed ? "w-57/60" : " w-50/60"}`}
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
