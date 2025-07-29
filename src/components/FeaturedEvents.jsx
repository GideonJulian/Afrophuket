import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EventCard from "./ui/EventCard";
import event1 from '../../public/events/event1.png'
import event2 from '../../public/events/event2.png'
import event3 from '../../public/events/event3.png'
const FeaturedEvents = () => {
  const eventData = [
    {
      name: "Sail Away Foam Boat Party Phuket",
      date: "Sat, Aug 23rd, 5PM",
      img: event1,
    },
    {
      name: "Don't Tell Mami - Ladies Night",
      date: "Sat, Aug 23rd, 5PM",
      img: event2,
    },
    {
      name: "Flame Dining Show Phuket Town",
      date: "Sat, Aug 23rd, 5PM",
      img: event3,
    },
  ];

  // Duplicate items for looping effect
  const loopedEvents = [...eventData, ...eventData];

  return (
    <div className="w-full p-4 py-10">
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
        <div className="mt-10 relative">
          <div
            className={`
              flex gap-6 
              overflow-x-auto md:overflow-visible 
              scroll-smooth snap-x snap-mandatory 
              scrollbar-hide md:flex-nowrap 
              animate-scroll-slow md:animate-none
            `}
          >
            {loopedEvents.map((item, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[80%] sm:w-[60%] md:w-[calc(33.333%-16px)] snap-start"
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
