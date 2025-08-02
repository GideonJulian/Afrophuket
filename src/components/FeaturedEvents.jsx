import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import EventCard from "./ui/EventCard";

const FeaturedEvents = () => {
  const [eventData, setEventData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const eventsPerPage = 3;

  useEffect(() => {
    fetch("https://afrophuket-backend.onrender.com/events/")
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

  const totalPages = Math.ceil(eventData.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const currentEvents = eventData.slice(startIndex, endIndex);

  const goToPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="w-full p-4 py-10">
      <div className="max-w-[1296px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-[300]">FEATURED EVENTS</h1>

          {totalPages > 1 && (
            <div className="border border-white rounded-full px-3 py-2 md:flex items-center justify-between hidden">
              <button onClick={goToPrev} disabled={currentPage === 1}>
                <ChevronLeft className={`cursor-pointer ${currentPage === 1 ? "opacity-30" : ""}`} />
              </button>
              <span className="text-sm">
                {currentPage} of {totalPages}
              </span>
              <button onClick={goToNext} disabled={currentPage === totalPages}>
                <ChevronRight className={`cursor-pointer ${currentPage === totalPages ? "opacity-30" : ""}`} />
              </button>
            </div>
          )}
        </div>

        {/* Loader or Events */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-white animate-pulse">Loading featured events...</p>
          </div>
        ) : (
          <>
            {/* ✅ Mobile Carousel */}
            <div className="md:hidden mt-10 flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth">
              {eventData.map((item, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 snap-start w-[80%]"
                >
                  <EventCard
                    name={item.event_title}
                    date={item.event_date}
                    img={item.event_thumbnail}
                  />
                </div>
              ))}
            </div>

            {/* ✅ Desktop Pagination */}
            <div className="mt-10 hidden md:block overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="flex gap-6"
                >
                  {currentEvents.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex-shrink-0 w-[calc(33.333%-16px)]"
                    >
                      <EventCard
                        name={item.event_title}
                        date={item.event_date}
                        img={item.event_thumbnail}
                      />
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FeaturedEvents;
