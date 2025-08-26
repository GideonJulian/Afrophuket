import React, { useEffect, useState } from "react";
import Header from "../components/Dashboard/Header";
import Events from "../components/Dashboard/Events";
import { useOutletContext, useNavigate } from "react-router-dom";
import AfroLoader from "../components/AfroLoader";

const Dashboard = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useOutletContext();
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const token = import.meta.env.VITE_API_TOKEN;
      const res = await fetch(
        "https://afrophuket-backend.onrender.com/events/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`, // ✅ Attach token
          },
        }
      );

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setEventData(data);
      } else {
        console.error("Expected array, got:", data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token"); // ✅ Get token
      const res = await fetch(
        `https://afrophuket-backend.onrender.com/events/${id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`, // ✅ Attach token
          },
        }
      );

      if (!res.ok) throw new Error("Failed to delete event");

      // Refresh events after successful delete
      await fetchEvents();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete event. Try again.");
    }
  };

  if (loading) return <AfroLoader />;

  return (
    <div>
      {/* Navbar/Header */}
      <div className="sticky top-0 bg-opacity-80 backdrop-blur-md z-10 border-b-[0.3px] border-gray-600 flex items-center">
        <div className="flex justify-between w-full items-center relative top-0 p-0">
          <Header
            buttonText={"  CREATE NEW EVENT"}
            route={"create-event"}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-3">
        {eventData.map((item, index) => (
          <Events key={index} event={item} handleDelete={handleDelete} />
        ))}
      </div>

      {/* Create Event Button (Mobile only) */}
      <div className="mt-4 flex items-center justify-center md:hidden p-7">
        <div className="relative w-full sm:w-auto">
          <span className="absolute inset-0 bg-black rounded-lg translate-x-1.5 translate-y-1.5 border-2"></span>
          <button
            onClick={() => navigate("create-event")}
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
