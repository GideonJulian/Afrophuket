import React from "react";
import { motion } from "framer-motion";
import textImg from "../assets/images/textImg.png";
import textImg2 from "../assets/images/textImg2.png";
import aboutBana from "../assets/images/aboutBana.png";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const About = () => {
  return (
    <div className="w-full">
      <div className="max-w-[1296px] mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-16">
        {/* Top Section */}
        <motion.div
          className="text-center sm:text-left"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h1 className="font-sans font-[300] text-[38px]  sm:text-[40px] md:text-[55px] lg:text-[65px] xl:text-[76.24px] leading-snug flex flex-wrap justify-center sm:justify-start items-center gap-x-2 gap-y-3">
            UNITING
            <span className="inline-block w-20 sm:w-12 md:w-16 lg:w-20 xl:w-auto">
              <img
                src={textImg}
                alt="decor"
                className="w-full h-auto object-contain"
              />
            </span>
            OUR STORIES IGNITING THE
            <span className="inline-block w-20 sm:w-12 md:w-16 lg:w-20 xl:w-auto">
              <img
                src={textImg2}
                alt="decor"
                className="w-full h-auto object-contain"
              />
            </span>
          </h1>

          <h2
            className="mt-4 font-sans font-[300] text-[38px] sm:text-[40px] md:text-[55px] lg:text-[65px] xl:text-[76.24px] bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(234, 67, 11, 1), rgba(79, 61, 236, 1))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            PRINTS
          </h2>

          <p className="text-center sm:text-left pt-5 max-w-[862px] mx-auto sm:mx-0 text-[16px] sm:text-[18px] leading-relaxed text-[#cfcfcf]">
            With our technological savvy and fan-first attitude, we’re
            simplifying and modernizing the ticketing industry.
          </p>
        </motion.div>

        {/* Banner Image */}
        <motion.div
          className="mt-8 sm:mt-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src={aboutBana}
            className="w-full h-auto max-h-[675px] object-contain rounded-xl"
            alt="About Visual"
          />
        </motion.div>

        {/* WHO WE ARE Section */}
        <motion.div
          className="mt-10 text-left"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h1 className="pb-5 text-[#F7F6F2] font-sans font-[300] text-[36px] sm:text-[50px] md:text-[60px] lg:text-[68.25px] leading-tight">
            WHO WE ARE
          </h1>
          <p className="py-4 text-[14px] sm:text-[16px] text-[#ccc] max-w-[900px] italic">
            Lorem ipsum dolor sit amet consectetur. Viverra vitae cras fermentum
            pharetra dis eros orci. Ut cum nisl blandit massa. Blandit ut velit
            justo tortor ut. In tempus molestie ultrices consequat. Dui augue
            porta pretium scelerisque in sit tellus turpis quis. Nulla risus
            tellus placerat nec.
          </p>
          <p className="py-4 text-[14px] sm:text-[16px] text-[#ccc] max-w-[900px] italic">
            Lorem ipsum dolor sit amet consectetur. Viverra vitae cras fermentum
            pharetra dis eros orci. Ut cum nisl blandit massa. Blandit ut velit
            justo tortor ut. In tempus molestie ultrices consequat. Dui augue
            porta pretium scelerisque in sit tellus turpis quis. Nulla risus
            tellus placerat nec.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
