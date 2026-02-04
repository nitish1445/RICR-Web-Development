import React, { useState, useEffect } from "react";
import RestaurantSidebar from "../../components/resturantDashboard/RestaurantSidebar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import RestaurantMenu from "../../components/resturantDashboard/RestaurantMenu";
import RestaurantOrder from "../../components/resturantDashboard/RestaurantOrder";
import RestaurantOverview from "../../components/resturantDashboard/RestaurantOverview"
import RestaurantHelp from "../../components/resturantDashboard/RestaurantHelp";
import RestaurantProfile from "../../components/resturantDashboard/RestaurantProfile";
import RestaurantEarnings from "../../components/resturantDashboard/RestaurantEarnings"

const RestaurantDashboard = () => {
  const { role, isLogin } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  });

  if (role !== "manager") {
    return (
      <>
        <div className="p-3">
          <div className="border rounded shadow p-5 w-4xl mx-auto text-center bg-gray-100">
            <div className="text-5xl text-red-600">⊗</div>
            <div className="text-xl">
              You are not login as Restaurant Manager. Please Login again.
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="w-full flex h-[90.6vh]">
        <div
          className={`bg-(--color-background) duration-300 ${isCollapsed ? "w-3/60" : "w-10/60"}`}
        >
          <RestaurantSidebar
            active={active}
            setActive={setActive}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        </div>
        <div
          className={`bg-(--color-primary)/10 duration-300 ${isCollapsed ? "w-57/60" : " w-50/60"}`}
        >
          {active === "menu" && <RestaurantMenu />}
          {active === "order" && <RestaurantOrder />}
          {active === "overview" && <RestaurantOverview />}
          {active === "profile" && <RestaurantProfile />}
          {active === "help" && <RestaurantHelp />}
          {active === "earnings" && <RestaurantEarnings />}
        </div>
      </div>
    </>
  );
};

export default RestaurantDashboard;