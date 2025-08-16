import { ArrowLeft, Calendar, ChevronLeft, Clock, MapPin } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const SingleEvent = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6">
      <div className="w-full">
        <button
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <span className="text-gray-600">
            <ChevronLeft />
          </span>
          <h1>Back</h1>
        </button>
      </div>
      <div className="w-full flex items-center justify between mt-12">
        <div>
          <h1 className="font-[700]  text-[21.7px] mb-7">Amapiano Night </h1>
          <ul className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <span className="text-gray-600">
                {" "}
                <Calendar size={20}/>
              </span>
              <h1 className="text-[14px]">Friday,Aug 25th, 2025</h1>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-gray-600">
                {" "}
                <Clock size={20}/>
              </span>
              <h1 className="text-[14px]"> 2:01AM-5:04 PM WAT</h1>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-gray-600">
                <MapPin size={20}/>
              </span>
              <h1 className="text-[14px]"> Asaba</h1>
            </div>
          </ul>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default SingleEvent;
