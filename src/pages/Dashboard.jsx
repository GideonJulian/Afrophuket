import React from "react";
import Header from "../components/Dashboard/Header";
import img from "../assets/images/events/event1.png";
import Events from "../components/Dashboard/Events";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
const Dashboard = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useOutletContext();
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://afrophuket-backend.onrender.com/events/")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
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

  return (
    <div>
      <div className="sticky top-0 z-10 border-b-[0.3px] border-gray-600 flex items-center">
        <div className="flex justify-between w-full items-center relative">
          <Header
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-3">
        {eventData.map((item, index) => (
          <Events key={index} event={item}  />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-center md:hidden p-7">
        <div className="relative  md:inline-block w-full sm:w-auto ">
          <span className="absolute inset-0 bg-black rounded-lg translate-x-1.5 translate-y-1.5 border-2"></span>
          <button
            onClick={() => navigate("/create-event")}
            className="relative w-full sm:w-auto text-xs sm:text-sm md:text-base font-semibold uppercase cursor-pointer px-4 sm:px-6 py-2 sm:py-3 bg-white text-black rounded-lg border-2 border-black shadow-md scale-105 hover:scale-[1.03] transition-all duration-300"
          >
            CREATE NEW EVENT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
