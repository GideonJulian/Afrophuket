import React from "react";

const Hero = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
      <div className="max-w-[1296px] mx-auto relative">
        {/* Background Image */}
        <img
          src="/heroimg.png"
          alt=""
          className="w-full h-[400px] sm:h-[600px] md:h-auto lg:h-auto object-cover object-top rounded-2xl"
        />

        {/* Centered Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="font-[800] text-6xl sm:text-4xl md:text-6xl lg:text-7xl font-sans">
            WELCOME
          </h1>
          <h1 className="outlined-text text-4xl sm:text-3xl md:text-5xl lg:text-6xl font-bold uppercase py-4">
            AFROPHUKET
          </h1>
          <p className="text-md sm:text-md md:text-lg">
            World's best Afrobeat and Amapiano events
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
