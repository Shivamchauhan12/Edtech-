import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from "react-router-dom";
import Sidebar from '../components/core/Dashboard/Sidebar';
import { HiMenu } from "react-icons/hi";

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
    <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col lg:flex-row">
      {/* Mobile Menu Button */}
      <button
        className="relative top-4 left-4 z-20 lg:hidden h-8 w-8 bg-richblack-800 text-white rounded-full shadow-md flex items-center justify-center"
        onClick={toggleSidebar}
      >
        <HiMenu className="h-5 w-5" />
      </button>


      {/* Sidebar */}
      <div
        className={`absolute lg:relative z-10 ${sidebarOpen ? "block" : "hidden lg:block"
          } w-64 bg-richblack-800 text-white lg:h-[calc(100vh-3.5rem)] h-full max-h-[calc(100vh-3.5rem)] overflow-auto`}
      >
        <Sidebar toggleSidebar={toggleSidebar} />
      </div>

      {/* Overlay for Sidebar on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-5 bg-black/50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

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
