import React, { useState } from "react";
import event4 from "../assets/images/events/event4.png";
import event5 from "../assets/images/events/event5.png";
import event6 from "../assets/images/events/event6.png";
import event7 from "../assets/images/events/event7.png";
import { Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const allEvents = [
  {
    name: "Tribe Pool Party",
    date: "2025-08-02T12:00",
    location: "Lagos",
    price: "$6,580",
    img: event4,
  },
  {
    name: "Tribe Pool Party",
    date: "2025-09-05T16:00",
    location: "Abuja",
    price: "$5,100",
    img: event5,
  },
  {
    name: "Halfmoon Festival",
    date: "Fri, Aug 15th, 3PM",
    location: "HalfMoon Club",
    price: "$7,000",
    img: event6,
  },
  {
    name: "ZOO DEL MAR",
    date: "Sat, Aug 2nd, 12PM",
    location: "Cafe Del Mar Phuket",
    price: "$6,250",
    img: event7,
  },
];

const Tickets = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const [locationFilter, setLocationFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filteredEvents = allEvents.filter((event) => {
    const matchesLocation =
      locationFilter === "All" ||
      locationFilter === "" ||
      event.location === locationFilter;
    const matchesDate =
      dateFilter === "All" ||
      dateFilter === "" ||
      event.date.startsWith(dateFilter);
    return matchesLocation && matchesDate;
  });

  const eventsToShow = showAll ? filteredEvents : filteredEvents.slice(0, 3);

  const uniqueLocations = [
    "All",
    ...Array.from(new Set(allEvents.map((e) => e.location))),
  ];

  return (
    <div className="w-full">
      <div className="max-w-[1296px] mx-auto px-4">
        <div>
          <p className="text-[#F7F6F2]">Browse Events</p>
          <h1 className="font-bold text-2xl py-3">
            {locationFilter === "All" || locationFilter === ""
              ? "All Locations"
              : locationFilter}
          </h1>

          <div className="flex items-center gap-4 w-full">
            {/* Change Location */}
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="rounded-full border px-3 py-2 bg-black text-white"
            >
              <option value="" disabled>
                Change Location
              </option>
              <option value="All">All</option>
              {uniqueLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            {/* Filter by Date */}
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="rounded-full border px-2 py-2 bg-black text-white"
            />
          </div>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6"
        >
          {eventsToShow.map((event, index) => (
            <div
              key={index}
              className="bg-[#000] p-4 flex items-center justify-between gap-4"
            >
              <div className="flex-1">
                <h1 className="font-bold text-white">{event.name}</h1>
                <h2 className="flex items-center gap-2 text-white text-sm mt-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(event.date).toLocaleString()}
                </h2>
                <h2 className="flex items-center gap-2 text-white text-sm mt-1">
                  <MapPin className="w-4 h-4" />
                  {event.location}
                </h2>
                <h2 className="mt-6 text-[#FC6435] text-sm font-medium">
                  {event.price}
                </h2>
              </div>
              <div className="w-24 h-24 flex-shrink-0">
                <img
                  src={event.img}
                  alt={event.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Show More Button */}
        {!showAll && filteredEvents.length > 3 && (
          <div className="flex items-center justify-center mt-10">
            <div className="relative inline-block m">
              <span className="absolute inset-0 bg-black rounded-lg translate-x-2 translate-y-2 border-2 "></span>
              <button
                onClick={() => {
                    setShowAll(true)
                }}
                className="relative text-sm font-semibold uppercase px-6 py-3 bg-white text-black rounded-lg border-2 border-black shadow-md scale-105 hover:scale-110 transition-all duration-300"
              >
                VIEW ALL EVENTS
              </button>
            </div>
          </div>
        )}

        {filteredEvents.length === 0 && (
          <p className="text-white text-center py-10">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default Tickets;
