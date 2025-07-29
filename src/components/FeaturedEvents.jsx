import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
const FeaturedEvents = () => {
  const evnts = [
    {
      name: "   Sail Away Foam Boat Party Phuket",
      date: "Sat, Aug 23rd, 5PM",
      imgSrc: "public/events/event1.png",
    },
    {
      name: "   Sail Away Foam Boat Party Phuket",
      date: "Sat, Aug 23rd, 5PM",
      imgSrc: "public/events/event1.png",
    },
    {
      name: "   Sail Away Foam Boat Party Phuket",
      date: "Sat, Aug 23rd, 5PM",
      imgSrc: "public/events/event1.png",
    },
  ];
  return (
    <div className="w-full p-4">
      <div className="max-w-[1296px] mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-[300]">FEATURED EVENTS</h1>
          <div className="border border-white rounded-full px-3 py-2 md:flex items-center justify-between hidden ">
            <ChevronLeft />
            <span className="text-sm">1 of 2</span>
            <ChevronRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvents;
