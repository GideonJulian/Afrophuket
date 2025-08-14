import React from "react";
import { Funnel } from "lucide-react";

const Header = () => {
  return (
    <div>
      <div className="flex justify-between items-center pt-14 px-5">
        <h1 className="font-bold text-[23px] ">Events</h1>
        <div className="relative inline-block ">
          <span className="absolute inset-0 bg-black rounded-lg translate-x-2 translate-y-2 border-2 "></span>
          <button
            onClick={() => navigate()}
            className="relative text-sm font-semibold uppercase cursor-pointer px-6 py-3 bg-white text-black rounded-lg border-2 border-black shadow-md scale-105 hover:scale-103 transition-all duration-300"
          >
            CREATE NEW EVENT
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center pt-20 pb-4  px-5">
        <h1 className="text-[#E55934]">All Events</h1>
        <div className="flex items-center gap-3">
          <Funnel />
          <h1>Filter</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
