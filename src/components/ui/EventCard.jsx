import React from "react";

const EventCard = ({ name, img, date }) => {
  return (
    <div className="w-full max-w-[300px] sm:max-w-[360px] rounded-2xl overflow-hidden shadow-lg bg-black relative">
      {/* Background Image */}
      <div className="relative h-[300px]">
        <img
          src={img} // replace with your image path
          alt="Foam Boat Party"
          className="w-full h-full object-cover"
        />

        {/* Overlay gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-black to-transparent z-10" />
      </div>

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
        <p className="text-xs text-white/70 mb-1">18+</p>
        <h3 className="font-bold text-center text-lg leading-tight">{name}</h3>
        <p className="text-sm text-white/70 mt-1">{date}</p>
      </div>
    </div>
  );
};

export default EventCard;
