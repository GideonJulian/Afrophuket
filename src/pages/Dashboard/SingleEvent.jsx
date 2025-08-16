import {
  Calendar,
  ChevronLeft,
  CircleAlert,
  Clock,
  MapPin,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const SingleEvent = () => {
  const navigate = useNavigate();
  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="header md:border-b border-gray-400 pb-4">
        <div className="w-full">
          <button
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <span className="text-gray-600">
              <ChevronLeft />
            </span>
            <h1 className="ml-1 text-sm sm:text-base">Back</h1>
          </button>
        </div>

        {/* Event Info + Checklist */}
        <div className="w-full flex flex-col lg:flex-row justify-between mt-8 lg:mt-12 gap-6 lg:gap-0">
          {/* Left Side: Event Details */}
          <div>
            <h1 className="font-[700] text-lg sm:text-xl lg:text-[21.7px] mb-5 sm:mb-7">
              Amapiano Night
            </h1>
            <ul className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <span className="text-gray-600">
                  <Calendar size={20} />
                </span>
                <h1 className="text-sm sm:text-[14px]">
                  Friday, Aug 25th, 2025
                </h1>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-gray-600">
                  <Clock size={20} />
                </span>
                <h1 className="text-sm sm:text-[14px]">2:01AM - 5:04 PM WAT</h1>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-gray-600">
                  <MapPin size={20} />
                </span>
                <h1 className="text-sm sm:text-[14px]">Asaba</h1>
              </div>
            </ul>
          </div>

          {/* Right Side: Checklist */}
          <div className="bg-black text-white px-4 sm:px-6 lg:px-8 rounded-xl lg:rounded-2xl py-4 max-w-full sm:max-w-md ">
            <div className="flex gap-3 mb-3">
              <CircleAlert size={20} className="flex-shrink-0" />
              <h1 className="text-sm sm:text-[14px]">
                Things to do before you publish your event:
              </h1>
            </div>
            <li className="text-[#E55934] text-sm sm:text-[14px]">
              Create some tickets
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEvent;
