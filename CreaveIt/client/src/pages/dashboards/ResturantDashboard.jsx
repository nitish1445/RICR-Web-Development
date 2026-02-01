import React, { useState, useEffect } from "react";
import ResturantSidebar from "../../components/resturantDashboard/ResturantSidebar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ResturantMenu from "../../components/resturantDashboard/ResturantMenu";
import ResturantOrder from "../../components/resturantDashboard/ResturantOrder";
import ResturantSales from "../../components/resturantDashboard/ResturantSales";
import ResturantStock from "../../components/resturantDashboard/ResturantStock";
import ResutrantCustomer from "../../components/resturantDashboard/ResutrantCustomer";
import ResturantManager from "../../components/resturantDashboard/ResturantManager";

const ResturantDashboard = () => {
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
              You are not login as Resturant Manager. Please Login again.
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
          <ResturantSidebar
            active={active}
            setActive={setActive}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        </div>
        <div
          className={`bg-(--color-primary)/10 duration-300 ${isCollapsed ? "w-57/60" : " w-50/60"}`}
        >
          {active === "menu" && <ResturantMenu />}
          {active === "order" && <ResturantOrder />}
          {active === "sales" && <ResturantSales />}
          {active === "stock" && <ResturantStock />}
          {active === "customer" && <ResutrantCustomer />}
          {active === "manager" && <ResturantManager />}
        </div>
      </div>
    </>
  );
};

export default ResturantDashboard;