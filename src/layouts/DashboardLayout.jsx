import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboadSidebar from "../components/Dashboard/DashboadSidebar";
import Header from "../components/Dashboard/Header";
import { Menu, X } from "lucide-react";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-[280px] bg-[#111111]  transform transition-transform duration-300 md:hidden
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-screen py-20 pl-2">
          <DashboadSidebar />
        </div>
      </div>

      {/* Background Drop for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Desktop Sidebar */}
      <div className="h-screen border-r-[0.3px]  border-gray-600 py-20 pl-10 w-[280px] hidden md:block">
        <DashboadSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Header with Menu Button for Mobile */}
        <div className="sticky top-0 z-10 border-b-[0.3px] border-gray-600 flex items-center">
          <div className="flex justify-between w-full items-center relative">
            <Header
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto md:p-5 p-3">
          <Outlet />
          <div className="mt-12 flex items-center justify-center md:hidden">
            <div className="relative  md:inline-block w-full sm:w-auto ">
              <span className="absolute inset-0 bg-black rounded-lg translate-x-1.5 translate-y-1.5 border-2"></span>
              <button
                onClick={() => navigate("/create-event")}
                className="relative w-full sm:w-auto text-xs sm:text-sm md:text-base font-semibold uppercase cursor-pointer px-4 sm:px-6 py-2 sm:py-3 bg-white text-black rounded-lg border-2 border-black shadow-md scale-105 hover:scale-[1.03] transition-all duration-300"
              >
                CREATE NEW EVENT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
