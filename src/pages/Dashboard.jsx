import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from "react-router-dom";
import Sidebar from '../components/core/Dashboard/Sidebar';

const Dashboard = () => {

  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to toggle sidebar visibility

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        Loading...
      </div>
    );
  }

  // Toggle sidebar open/close
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col lg:flex-row ">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden absolute top-4 left-4 z-50 p-2 bg-gray-700 text-white rounded-full"
      >
        ☰
      </button>

      {/* Sidebar: Show on large screens and toggle on small screens */}
      <Sidebar className={`${sidebarOpen ? "block" : "hidden"} lg:block`} />

      {/* Content */}
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto px-4 lg:px-10">
        <div className="mx-auto w-full max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
