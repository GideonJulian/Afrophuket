import React from "react";
import { motion } from "framer-motion";
import orange from "../assets/images/OrangeLink.png";
import EventCarousel from "./ui/EventCarousel";

const Mission = () => {
  return (
    <motion.div
      className="w-full mt-30 px-4"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="max-w-[1296px] mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-0">
          <h1 className="text-4xl md:text-5xl font-sans font-extralight text-left">
            MISSION
          </h1>
          <p className="text-left md:text-right md:w-[461px] text-md">
            AfroPhuket dolor sit amet consectetur. Sed elit lectus sit ut vel
            cursus ornare at. Ipsum senectus aliquam tellus amet. Ornare
            faucibus vitae tellus sollicitudin. Suspendisse est elit felis
            risus bibendum suscipit sed velit nec. Turpis nisi integer montes.
            inspire connection and drive change
          </p>
        </div>

        {/* Center Content */}
        <div className="text-center mt-20 flex flex-col items-center">
          <h1 className="text-[42px] sm:text-[55px] md:text-[67.13px] font-[300] font-sans">
            AFROPHUKET
          </h1>
          <h2
            className="text-[30px] sm:text-[40px] md:text-[48px] font-sans font-[300] bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(234, 67, 11, 1), rgba(79, 61, 236, 1))",
            }}
          >
            ARCHIEVES
          </h2>
          <p className="text-center text-sm w-full max-w-[409px] mt-4">
            Missed an event? Don't worry we've got you covered! Relive the
            magic and explore recaps from past Afrophuket events to stay
            connected to the movement
          </p>
          <img src={orange} className="mt-10 w-auto" alt="Orange Link" />
        </div>
      </div>
      <div>
        {/* <EventCarousel /> */}
      </div>
    </motion.div>
  );
};

export default Mission;
