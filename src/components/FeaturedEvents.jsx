import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EventCard from "./ui/EventCard";

const FeaturedEvents = () => {
  const eventData = [
    {
      name: "Sail Away Foam Boat Party Phuket",
      date: "Sat, Aug 23rd, 5PM",
      img: "/events/event1.png",
    },
    {
      name: "Sunset Yacht Vibes",
      date: "Sun, Aug 24th, 6PM",
      img: "/events/event1.png",
    },
    {
      name: "Afro Beach Bash",
      date: "Mon, Aug 25th, 2PM",
      img: "/events/event1.png",
    },
  ];

  return (
    <div className="w-full p-4">
      <div className="max-w-[1296px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-[300]">FEATURED EVENTS</h1>

          {/* Pagination controls only on medium+ screens */}
          <div className="border border-white rounded-full px-3 py-2 md:flex items-center justify-between hidden">
            <ChevronLeft />
            <span className="text-sm">1 of 2</span>
            <ChevronRight />
          </div>
        </div>

        {/* Carousel */}
        <div className="mt-10">
          <div
            className="flex md:flex-wrap gap-6 overflow-x-auto md:overflow-visible scroll-smooth snap-x snap-mandatory scrollbar-hide"
          >
            {eventData.map((item, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[80%] sm:w-auto snap-start"
              >
                <EventCard
                  name={item.name}
                  date={item.date}
                  img={item.img}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvents;
