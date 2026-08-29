import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "../../components/userDashboard/UserSideBar";
import UserHeader from "../../components/userDashboard/UserHeader";

const UserDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FBF3E7]">
      {/* Sidebar */}
      <UserSidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Area */}
      <div className="flex min-h-screen flex-1 flex-col lg:pl-64">
        {/* User Header */}
        <UserHeader onMenuClick={() => setSidebarOpen(true)} />

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

export default UserDashboard;
