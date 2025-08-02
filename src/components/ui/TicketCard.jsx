// components/TicketCard.jsx
import React from "react";
import { Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TicketCard = ({ event }) => {
  const navigate = useNavigate();

const handleClick = () => {
  navigate(`/ticket/${event.id}`);
};


  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
      className="cursor-pointer bg-[#000] p-4 flex items-center justify-between gap-4 rounded-xl shadow-xl"
    >
      <div className="flex-1">
        <h1 className="font-bold text-white">{event.event_title}</h1>
        <h2 className="flex items-center gap-2 text-white text-sm mt-1">
          <Calendar className="w-4 h-4" />
          {new Date(event.event_date).toLocaleString()}
        </h2>
        <h2 className="flex items-center gap-2 text-white text-sm mt-1">
          <MapPin className="w-4 h-4" />
          {event.event_location}
        </h2>
        <h2 className="mt-6 text-[#FC6435] text-sm font-medium">
          ${event.event_ticket_price}
        </h2>
      </div>
      <motion.div
        className="w-24 h-24 flex-shrink-0"
        initial={{ scale: 0.9 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={event.event_thumbnail_url}
          alt={event.event_title}
          className="w-full h-full object-cover rounded-md"
        />
      </motion.div>
    </motion.div>
  );
};

export default TicketCard;
