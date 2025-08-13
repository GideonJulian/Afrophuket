import React from "react";
import { Outlet } from "react-router-dom";
import DashboadSidebar from "../components/Dashboard/DashboadSidebar";
import Header from "../components/Dashboard/Header";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-[280px] fixed left-0 top-0 h-screen z-20">
        <DashboadSidebar />
      </div>
      <div className="ml-[280px] flex-1 flex flex-col h-screen">
        <div className="sticky top-0 z-10 ">
          <Header />
        </div>
        <div className="flex-1 overflow-auto md:p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
