import React from "react";
import { motion } from "framer-motion";
import heroImg from '../../../public/heroimg.png'
const Hero = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
      <div className="max-w-[1296px] mx-auto relative">
        {/* Background Image */}
        <img
          src={heroImg}
          alt=""
          className="w-full h-[400px] sm:h-[600px] md:h-auto lg:h-auto object-cover object-top rounded-2xl"
        />

        {/* Animated Centered Text Overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.h1
            className="font-[800] text-6xl sm:text-4xl md:text-6xl lg:text-7xl font-sans"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
          >
            WELCOME
          </motion.h1>

          <motion.h1
            className="outlined-text text-4xl sm:text-3xl md:text-5xl lg:text-6xl font-bold uppercase py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            AFROPHUKET
          </motion.h1>

          <motion.p
            className="text-md sm:text-md md:text-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            World's best Afrobeat and Amapiano events
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
