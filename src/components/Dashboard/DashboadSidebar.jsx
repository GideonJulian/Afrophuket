import React from "react";
import { Calendar, User, LogOut, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";

const DashboadSidebar = ({ activePath }) => {
  const menuitems = [
    {
      name: "Event",
      icon: Calendar,
      path: "", // This should be your exact dashboard path
    },
    // {
    //   name: "Account",
    //   icon: User,
    //   path: "account",
    // },
    {
      name: "Shop",
      icon: ShoppingCart,
      path: "shop",
    },
  ];

  return (
    <div className="h-full flex flex-col justify-between p-4">
      {/* Top Section */}
      <div>
        <div>
          <img src="/afrologo.png" className="w-20" alt="Logo" />
        </div>

        <div className="mt-4 flex flex-col space-y-8">
          {menuitems.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              end
              className={({ isActive }) =>
                `
    flex items-center gap-6 text-[17px] py-3 px-2
    transition-all duration-200
   
    ${
      isActive
        ? "border-r-[5px] border-[#E55934] text-[#E55934]"
        : "border-r-0 text-gray-600 hover:text-[#E55934]"
    }
    `
              }
            >
              <item.icon />
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Bottom Section - Logout */}
      <button className="flex items-center gap-3 text-[#E55934] cursor-pointer hover:text-[#E55934] transition-colors duration-200">
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default DashboadSidebar;
