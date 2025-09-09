import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import TicketCard from "../components/ui/TicketCard";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const BrowseTickets = () => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationFilter, setLocationFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [toShow, setToShow] = useState(true);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const navigate = useNavigate();

  useEffect(() => {
    const token = import.meta.env.VITE_API_TOKEN;
    fetch("https://afrophuket-backend-gr4j.onrender.com/events/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Token ${token}` : "",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEventData(data);
        } else {
          console.error("Expected array, got:", data);
        }
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredEvents = eventData.filter((event) => {
    const matchesLocation =
      locationFilter === "All" ||
      locationFilter === "" ||
      event.event_location === locationFilter;

    const matchesDate =
      dateFilter === "All" ||
      dateFilter === "" ||
      event.event_date?.startsWith(dateFilter);

    return matchesLocation && matchesDate;
  });

  const eventsToShow = showAll ? filteredEvents : filteredEvents.slice(0, 4);

  const uniqueLocations = [
    "All",
    ...Array.from(new Set(eventData.map((e) => e.event_location))),
  ];

  const handleCardClick = (eventTitle) => {
    const slug = eventTitle.toLowerCase().replace(/\s+/g, "-");
    navigate(`/ticket/${slug}`);
  };

  return (
    <div className="w-full">
      <div className="max-w-[1296px] mx-auto px-4">
        {/* Filter Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-6"
        >
          <p className="text-[#F7F6F2]">Browse Events</p>
          <h1 className="font-bold text-2xl py-3">
            {locationFilter === "All" || locationFilter === ""
              ? "All Locations"
              : locationFilter}
          </h1>

          <div className="flex flex-wrap gap-4 w-full">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="rounded-full border px-3 py-2 bg-black text-white"
            >
              <option value="" disabled>
                Change Location
              </option>
              <option value="All">All</option>
              {uniqueLocations.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="rounded-full border px-2 py-2 bg-black text-white"
            />
          </div>
        </motion.div>

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-white animate-pulse">Loading events...</p>
          </div>
        ) : (
          <>
            {/* Tickets Grid */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6"
            >
              {eventsToShow.map((event, index) => (
                <TicketCard
                  key={index}
                  event={event}
                  onClick={() => handleCardClick(event.event_title)}
                />
              ))}
            </motion.div>

            {/* View All Button */}

            <motion.div
              className="flex items-center justify-center mt-10"
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
            >
              <div className="relative inline-block m group">
                <span
                  className="absolute inset-0 bg-black rounded-lg translate-x-2 translate-y-2 border-2 
               transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
                ></span>
                <button
                  onClick={() => navigate("/event")}
                  className="relative text-sm font-semibold uppercase px-6 py-3 
               bg-white text-black rounded-lg border-2 border-black shadow-md 
               scale-105 transition-all duration-300 group-hover:scale-100"
                >
                  VIEW ALL EVENTS
                </button>
              </div>
            </motion.div>

            {/* No Events Message */}
            {filteredEvents.length === 0 && (
              <p className="text-white text-center py-10">No events found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BrowseTickets;
