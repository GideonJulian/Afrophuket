import React from "react";
import event4 from "../assets/images/events/event4.png";
import { Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Tickets = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const ticketsData = [
    {
      name: "Tribe Pool Party",
      date: "Sat, Aug 2nd, 12PM",
      location: "TRIBE Sky Beach Club",
      price: "$6,580",
      img: event4,
    },
    {
      name: "Tribe Pool Party",
      date: "Sat, Aug 2nd, 12PM",
      location: "TRIBE Sky Beach Club",
      price: "$6,580",
      img: event4,
    },
    {
      name: "Tribe Pool Party",
      date: "Sat, Aug 2nd, 12PM",
      location: "TRIBE Sky Beach Club",
      price: "$6,580",
      img: event4,
    },
    {
      name: "Tribe Pool Party",
      date: "Sat, Aug 2nd, 12PM",
      location: "TRIBE Sky Beach Club",
      price: "$6,580",
      img: event4,
    },
  ];

  return (
    <div className="w-full">
      <div className="max-w-[1296px] mx-auto px-4">
        <div>
          <p className="text-[#F7F6F2]">Browse Events</p>
          <h1 className="font-bold text-2xl py-3">Lagos</h1>
          <div className="flex items-center gap-4 flex-wrap">
            <button className="rounded-full border px-3 py-1">
              Change Location
            </button>
            <button className="rounded-full border px-3 py-1">
              Filter by Date
            </button>
          </div>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6"
        >
          {ticketsData.map((items, index) => (
            <div
              key={index}
              className="bg-[#000] p-4 flex items-center justify-between gap-4"
            >
              <div className="flex-1">
                <h1 className="font-bold text-white">{items.name}</h1>
                <h2 className="flex items-center gap-2 text-white text-sm mt-1">
                  <Calendar className="w-4 h-4" />
                  {items.date}
                </h2>
                <h2 className="flex items-center gap-2 text-white text-sm mt-1">
                  <MapPin className="w-4 h-4" />
                  {items.location}
                </h2>
                <h2 className="mt-6 text-[#FC6435] text-sm font-medium">
                  {items.price}
                </h2>
              </div>
              <div className="w-34 h-34 flex-shrink-0">
                <img
                  src={items.img}
                  alt={items.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Tickets;
