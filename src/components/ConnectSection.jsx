import React from "react";
import yt from "../assets/images/yt.png";
import ig from "../assets/images/ig.png";
import { MoveUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import contactbg from '../assets/images/contactbg.jpg'

const ConnectSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.section
      ref={ref}
      className="text-white py-20 px-4"
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="text-4xl font-light text-center mb-16">CONNECT WITH US</h2>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Subscribe Box */}
        <div
          className="p-10 rounded-xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(222,75,152,1) 0%, rgba(79,61,236,1) 100%)",
          }}
        >
          <p className="text-sm text-[#15130499] mb-2 uppercase">
            Afrophuket Newsletter
          </p>
          <h3 className="text-2xl text-[#15130499] mb-4">SUBSCRIBE</h3>
          <p className="text-sm text-[#15130499] mb-8">
            Sign up to the Afrophuket newsletter and be the first to know about
            events, announcements, ticket sales, and special offers.
          </p>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="NAME"
              className="w-full p-3 rounded-md bg-[#15130499] placeholder-[#15130499] text-white outline-none"
            />
            <input
              type="email"
              placeholder="EMAIL"
              className="w-full p-3 rounded-md bg-[#15130499] placeholder-[#15130499] text-white outline-none"
            />
            <input
              type="text"
              placeholder="PHONE NUMBER"
              className="w-full p-3 rounded-md bg-[#15130499] placeholder-[#15130499] text-white outline-none"
            />
            <input
              type="text"
              placeholder="COUNTRY"
              className="w-full p-3 rounded-md bg-[#15130499] placeholder-[#15130499] text-white outline-none"
            />
            <button
              type="submit"
              className="w-full bg-[#151304] text-white py-3 rounded-md font-semibold"
            >
              SIGN UP
            </button>
            <p className="text-sm text-[#15130499] mt-2">
              By clicking Sign Up you’re confirming that you agree with our{" "}
              <a href="#" className="underline">
                Terms and Conditions
              </a>
              .
            </p>
          </form>
        </div>

        {/* Contact Box */}
        <div className="relative rounded-xl overflow-hidden h-full">
          <img
            src={contactbg}
            alt="Party"
            className="absolute opacity-30 inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 h-full p-10 flex flex-col justify-between ">
            <div>
              <p className="text-sm uppercase mb-2">Join the movement</p>
              <h3 className="text-2xl font-semibold mb-4">REACH OUT TO US</h3>
              <p className="text-sm mb-6">
                Let’s create something unforgettable. Partner with AfroPhuket to
                bring culture and community to the world.
              </p>
              <button className="px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-white hover:text-black transition">
                CONTACT US
              </button>
            </div>

            {/* Social Icons */}
            <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-12 text-center">
              <div className="flex flex-col items-center">
                        <img src={yt} alt="YouTube" className="md:w-20 md:h-20 w-30 h-30 mb-2" />
                <div className="flex items-center gap-2 justify-center">
                  <div>
                    <p className="uppercase text-sm mb-1">Subscribe to our</p>
                    <p className="text-base">YouTube</p>
                  </div>
                  <MoveUpRight className="mt-1" />
                </div>
              </div>

              <div className="flex flex-col items-center">
               <img src={ig} alt="Instagram" className="md:w-20 md:h-20 w-30 h-30 mb-2" />
                <div className="flex items-center gap-2 justify-center">
                  <div>
                    <p className="uppercase text-sm mb-1">Follow us on</p>
                    <p className="text-base">Instagram</p>
                  </div>
                  <MoveUpRight className="mt-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ConnectSection;
