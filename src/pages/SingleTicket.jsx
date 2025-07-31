import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import event4 from "../assets/images/events/event4.png";
import event5 from "../assets/images/events/event5.png";
import event6 from "../assets/images/events/event6.png";
import event7 from "../assets/images/events/event7.png";

const SingleTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const eventData = [
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
      date: "2025-08-15T15:00",
      location: "HalfMoon Club",
      price: "$7,000",
      img: event6,
    },
    {
      name: "ZOO DEL MAR",
      date: "2025-08-02T12:00",
      location: "Cafe Del Mar Phuket",
      price: "$6,250",
      img: event7,
    },
  ];

  // Convert event name to slug format to match the URL
  const slugify = (str) => str.toLowerCase().replace(/\s+/g, "-");

  const event = eventData.find((e) => slugify(e.name) === id);

  if (!event) return <p className="text-white text-center">Event not found.</p>;

  return (
    <div className="w-full">
     {event.name}
    </div>
  );
};

export default SingleTicket;
