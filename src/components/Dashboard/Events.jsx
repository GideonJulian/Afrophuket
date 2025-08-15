import React from "react";
import { Calendar, SquarePen, Ticket } from "lucide-react";
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
      className="cursor-pointer bg-black p-4 flex flex-row-reverse justify-between gap-4 rounded-xl shadow-xl"
    >
      {/* Event Image */}
      <motion.div
        className="w-36 h-40 sm:h-36 flex-shrink-0"
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

      {/* Event Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <h1 className="font-bold text-white text-base sm:text-lg">
              {event.title}
            </h1>
            <h2 className="flex items-center gap-2 text-white text-sm mt-1">
              <Calendar className="w-4 h-4" />
              {event.event_date}
            </h2>
          </div>
          <div className="text-gray-600 hover:text-[#FC6435] transition-colors duration-300 hidden md:block">
            <SquarePen className="w-5 h-5" />
          </div>
        </div>

        {/* Ticket Sold */}
      <div>
          <h2 className="mt-4 sm:mt-16 text-[#FC6435] text-sm font-medium flex items-center gap-2">
          <Ticket className="text-gray-600 w-4 h-4" />
          {event.ticket_sold}
        </h2>
        <h2>Ticket sold</h2>
      </div>
      </div>
    </motion.div>
  );
};

export default Events;
    