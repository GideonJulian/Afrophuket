import React from "react";
import { Calendar, MapPin, SquarePen, Ticket } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const Events = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ticket/${event.id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
      className="cursor-pointer bg-[#000] p-4 flex  justify-between gap-4 rounded-xl shadow-xl"
    >
      <motion.div
        className="w-34 h-34 flex-shrink-0"
        initial={{ scale: 0.9 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={event.thumbnail_url}
          alt={event.title}
          className="w-full h-full object-cover rounded-md"
        />
      </motion.div>
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <h1 className="font-bold text-white">{event.title}</h1>
            <h2 className="flex items-center gap-2 text-white text-sm mt-1">
              <Calendar className="w-4 h-4" />
              {new Date(event.event_date).toLocaleString()}
            </h2>
          </div>
          <div className="text-gray-600 ">
            <SquarePen />
          </div>
        </div>

        <h2 className="mt-16 text-[#FC6435] text-sm font-medium flex items-center gap-2">
          <span className="text-gray-600 ">
            <Ticket />
          </span>
          {event.ticket_sold}
        </h2>
      </div>
    </motion.div>
  );
};

export default Events;
