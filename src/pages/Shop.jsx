import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import pro1 from "../assets/images/pro1.png";
import pro2 from "../assets/images/pro2.png";
import pro3 from "../assets/images/pro3.png";

const Shop = () => {
  const products = [
    {
      img: pro1,
      name: "Black Genius Sweatshirt ",
      price: 36.5,
    },
    {
      img: pro2,
      name: "Black Genius Sweatshirt ",
      price: 36.5,
    },
    {
      img: pro3,
      name: "Black Genius Sweatshirt ",
      price: 36.5,
    },
  ];
  return (
    <div className="w-full">
      <div className="mx-auto max-w-[1296px] p-4">
        <div className="text-center mt-20 flex flex-col items-center">
          <h1 className="text-[42px] sm:text-[55px] md:text-[67.13px] font-[300] font-sans">
            AFROPHUKET
          </h1>
          <h2
            className="text-[30px] sm:text-[40px] md:text-[58px] font-sans font-[300] bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(234, 67, 11, 1), rgba(79, 61, 236, 1))",
            }}
          >
            PRINTS
          </h2>
          <p className="text-center text-sm w-full max-w-[409px] mt-4">
            A wearable celebration of movement, sound and ancestral connection
          </p>
        </div>
        <div className="mt-10">
          <h1 className="font-bold text-3xl py-3">Browse Items</h1>
          <div className="flex items-center gap-3">
            <div className="rounded-full border px-7 py-2 bg-black text-white transition-all duration-300 hover:border-white">
              Sort by: <span className="text-[#E55934]">T-shirt </span>
            </div>
            <div className="rounded-full border px-7 py-2 bg-black text-white transition-all duration-300 hover:border-white">
              Filter by: <span className="text-[#E55934]">$100 </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
