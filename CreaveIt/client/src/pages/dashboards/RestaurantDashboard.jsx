import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import RestaurantSidebar from "../../components/resturantDashboard/RestaurantSidebar";
import RestaurantHeader from "../../components/resturantDashboard/RestaurantHeader";

const RestaurantDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBF3E7]">
      {/* Sidebar */}
      <RestaurantSidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Area */}
      <div className="flex min-h-screen flex-1 flex-col lg:pl-64">
        {/* Restaurant Header */}
        <RestaurantHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Active Page */}
        <main className="flex-1">
          <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
