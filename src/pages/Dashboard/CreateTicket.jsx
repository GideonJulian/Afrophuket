import { ChevronLeft, Menu } from "lucide-react";
import React from "react";

const CreateTicket = () => {
  return (
    <div className="p-4 sm:p-3">
      <div className="w-full flex items-center justify-between mt-3 px-2 sm:px-4">
        {/* Back button */}
        <div className="flex items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center cursor-pointer"
          >
            <div className="flex items-center justify-center h-6 w-6 sm:h-8 sm:w-8 rounded-md bg-[#E55934]">
              <ChevronLeft className="text-black w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </button>
          <h1 className="ml-2 text-base sm:text-lg md:text-xl font-bold">
            Ticket details
          </h1>
        </div>
        <div className="md:hidden block">
          <button
            // onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
