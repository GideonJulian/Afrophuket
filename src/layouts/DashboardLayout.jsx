import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboadSidebar from "../components/Dashboard/DashboadSidebar";
import Header from "../components/Dashboard/Header";
import { Calendar, Menu, User, X, LogOut, ShoppingCart } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-[280px]   transform transition-transform duration-300 hidden
        `}
      >
        <div className="h-screen py-20 pl-2">
          <DashboadSidebar activePath={location.pathname} />
        </div>
      </div>

      <div
        className={`fixed left-1/2 top-[20vh] z-50 w-[95%] sm:w-[79%] md:w-[55%] max-w-[760px] -translate-x-1/2 bg-[#111111] rounded-4xl text-white overflow-hidden origin-top transition-all duration-500 ease-in-out ${
          isSidebarOpen ? "h-[350px] opacity-100 -mt-14" : "h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-2 text-lg pt-4 pb-7 pl-5">
          <div className=" flex items-center gap-3 text-[25px] py-3 px-2 transition-colors duration-200">
            <Calendar size={33} />
            <li>
              <NavLink
                to=""
                end
                className={({ isActive }) =>
                  `font-[800] text-2xl ${
                    isActive
                      ? "  text-[#E55934]"
                      : " text-gray-600"
                  }`
                }
              >
                EVENTS
              </NavLink>
            </li>
          </div>{" "}
          <div className=" flex items-center gap-3 text-[25px] py-3 px-2 transition-colors duration-200">
            <User size={33} />
            <NavLink
              to="account"
              end
              className={({ isActive }) =>
                `font-[800] text-2xl ${
                  isActive
                    ? "  text-[#E55934]"
                    : " text-gray-600"
                }`
              }
            >
              ACCOUNTS
            </NavLink>
          </div>  <div className=" flex items-center gap-3 text-[25px] py-3 px-2 transition-colors duration-200">
            <ShoppingCart size={33} />
            <NavLink
              to="shop"
              end
              className={({ isActive }) =>
                `font-[800] text-2xl ${
                  isActive
                    ? "  text-[#E55934]"
                    : " text-gray-600"
                }`
              }
            >
              SHOP
            </NavLink>
          </div>
          <button className="flex items-center gap-3 text-[#E55934] text-[25px] font-[800] cursor-pointer hover:text-[#E55934] transition-colors duration-200 mt-8 pt-4 pb-7 pl-5">
            <LogOut size={33} color="#E55934" />
            Logout
          </button>
        </ul>
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
        <DashboadSidebar activePath={location.pathname} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Header with Menu Button for Mobile */}
     

        <div className="flex-1 overflow-auto px-2">
          <Outlet context={{ isSidebarOpen, setIsSidebarOpen }}/>
    
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
