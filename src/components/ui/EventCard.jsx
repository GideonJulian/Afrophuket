import React from "react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ name, img, date, id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ticket/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] cursor-pointer rounded-2xl overflow-hidden shadow-lg bg-black relative mx-auto transition-transform duration-300 hover:scale-102 hover:shadow-xl"
    >
      {/* Background Image */}
      <div className="relative h-[300px] sm:h-[350px] md:h-[400px]">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-black/10 z-10" />
      </div>

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
        <p className="text-xs sm:text-sm text-white/70 mb-1 text-center">18+</p>
        <h3 className="font-bold text-center text-base sm:text-lg leading-tight">
          {name}
        </h3>
        <p className="text-sm text-white/70 mt-1 text-center">{date}</p>
      </div>
    </div>
  );
};

export default EventCard;
