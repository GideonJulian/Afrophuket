import React from "react";
import { Outlet } from "react-router-dom";
import DashboadSidebar from "../components/Dashboard/DashboadSidebar";
import Header from "../components/Dashboard/Header";
import { useState } from "react";
const DashboardLayout = () => {


  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
    <div className="h-screen border-r py-20 pl-10 w-[280px] hidden md:block ">
        <DashboadSidebar  />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        <div className="sticky top-0 z-10  border-b">
          <Header  />
        </div>
        <div className="flex-1 overflow-auto md:p-5 p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
