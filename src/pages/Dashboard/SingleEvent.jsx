import {
  Calendar,
  ChevronLeft,
  CircleAlert,
  Clock,
  MapPin,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SingleEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://afrophuket-backend.onrender.com/events/${id}/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Event not found");
        }
        return res.json();
      })
      .then((data) => setEvent(data))
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const navigate = useNavigate();

  if (loading)
    return <p className="text-white text-center py-20">Loading Details...</p>;
  if (error) return <p className="text-red-400 text-center py-20">{error}</p>;
  if (!event)
    return <p className="text-white text-center py-20">Event not found.</p>;

  // Format date nicely
  const formatDate = (dateStr) => {
    const options = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString("en-US", options);
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="header md:border-b border-gray-400 pb-4">
        <div className="w-full">
          <button
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <span className="text-gray-600">
              <ChevronLeft />
            </span>
            <h1 className="ml-1 text-sm sm:text-base">Back</h1>
          </button>
        </div>

        {/* Event Info + Checklist */}
        <div className="w-full flex flex-col lg:flex-row justify-between mt-8 lg:mt-12 gap-6 lg:gap-0">
          {/* Left Side: Event Details */}
          <div>
            <h1 className="font-[700] text-lg sm:text-xl lg:text-[21.7px] mb-5 sm:mb-7">
              {event.title}
            </h1>
            <ul className="flex flex-col gap-4">
              {/* Date */}
              <div className="flex gap-2 items-center">
                <span className="text-gray-600">
                  <Calendar size={20} />
                </span>
                <h1 className="text-sm sm:text-[14px]">
                  {formatDate(event.date)}
                </h1>
              </div>
              {/* Time */}
              <div className="flex gap-2 items-center">
                <span className="text-gray-600">
                  <Clock size={20} />
                </span>
                <h1 className="text-sm sm:text-[14px]">
                  {event.start_time} - {event.end_time} WAT
                </h1>
              </div>
              {/* Location */}
              <div className="flex gap-2 items-center">
                <span className="text-gray-600">
                  <MapPin size={20} />
                </span>
                <h1 className="text-sm sm:text-[14px]">{event.location}</h1>
              </div>
            </ul>
          </div>

          {/* Right Side: Checklist */}
          <div className="bg-black text-white px-4 sm:px-6 lg:px-8 rounded-xl lg:rounded-2xl py-4 max-w-full sm:max-w-md">
            <div className="flex gap-3 mb-3">
              <CircleAlert size={20} className="flex-shrink-0" />
              <h1 className="text-sm sm:text-[14px]">
                Things to do before you publish your event:
              </h1>
            </div>
            {/* Checklist item */}
            {event.tickets.length === 0 ? (
              <li className="text-[#E55934] text-sm sm:text-[14px]">
                Create some tickets
              </li>
            ) : (
              <li className="text-green-400 text-sm sm:text-[14px]">
                ✅ Tickets available
              </li>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEvent;
