import React, { useEffect, useState } from "react";
import TicketCard from "../components/ui/TicketCard";
import FeaturedEvents from "../components/FeaturedEvents";
import AfroLoader from "../components/AfroLoader";
const token = import.meta.env.VITE_API_TOKEN;
const Events = () => {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {


    fetch("https://afrophuket-backend.onrender.com/events/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch events");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setEventData(data);
          console.log("Fetched data:", data);
        } else {
          console.error("Expected array, got:", data);
        }
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full">
      <div className="max-w-[1296px] mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-16">
        <div className="text-center mt-0 md:mt-5 flex flex-col items-center">
          <h1 className="text-[42px] sm:text-[55px] md:text-[67.13px] font-[300] font-sans">
            AFROPHUKET
          </h1>
          <h1
            className="text-[42px] sm:text-[55px] md:text-[67.13px] font-[300] bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(234, 67, 11, 1), rgba(79, 61, 236, 1))",
            }}
          >
            EVENTS
          </h1>
          <p className="text-center text-sm w-full max-w-[409px] mt-4">
            Discover a lineup of upcoming AfroPhuket events or dive into the
            past to relive the magic of our most recent events.
          </p>
        </div>
        <div>
          <FeaturedEvents />
        </div>

        <div className="mt-10">
          {loading ? (
            <div className="text-white text-center py-16 animate-pulse">
              <AfroLoader />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eventData.length > 0 ? (
                eventData.map((event, idx) => (
                  <TicketCard key={idx} event={event} />
                ))
              ) : (
                <p className="text-white text-center">
                  No events found or error loading.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
