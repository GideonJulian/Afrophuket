import React, { useState } from "react";
import Slider from "react-slick";
import pro1 from "../assets/images/pro1.png";
import pro2 from "../assets/images/pro2.png";
import pro3 from "../assets/images/pro3.png";
import ProductCard from "../components/ui/ProductCard";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Shop = () => {
  const allProducts = [
    {
      img: pro1,
      name: "Black Genius Sweatshirt",
      price: 36.5,
      category: "T-shirt",
    },
    { img: pro2, name: "Afro Hoodie", price: 50, category: "Hoodie" },
    { img: pro3, name: "Tribal T-shirt", price: 25, category: "T-shirt" },
    { img: pro1, name: "Heritage Hoodie", price: 70, category: "Hoodie" },
    { img: pro2, name: "Classic Tee", price: 15, category: "T-shirt" },
  ];

  const [sortBy, setSortBy] = useState("default");
  const [filterBy, setFilterBy] = useState("All");

  const filteredProducts = allProducts.filter((product) => {
    return filterBy === "All" || product.category === filterBy;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "lowToHigh") return a.price - b.price;
    if (sortBy === "highToLow") return b.price - a.price;
    return 0;
  });

  const displayedProducts = sortedProducts.slice(0, 3); // only 3

  const mobileSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: "20px",
  };

  return (
    <div className="w-full">
      <div className="mx-auto max-w-[1296px] p-4">
        {/* Header */}
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

        {/* Controls */}
        <div className="mt-10">
          <h1 className="font-bold text-3xl py-3">Browse Items</h1>
          <div className="flex flex-wrap gap-4 items-center">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-full px-6 py-2 bg-black text-white border cursor-pointer"
            >
              <option value="default">Sort by: T-shirt</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>

            {/* Filter */}
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="rounded-full px-6 py-2 bg-black text-white border cursor-pointer"
            >
              <option value="All">Filter by: All</option>
              <option value="T-shirt">T-shirt</option>
              <option value="Hoodie">Hoodie</option>
            </select>
          </div>

          {/* Desktop view - only 3 items */}
          <motion.div
            className="hidden md:flex gap-4 flex-wrap mt-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            {displayedProducts.map((item, index) => (
              <ProductCard
                key={index}
                imgSrc={item.img}
                name={item.name}
                price={item.price}
              />
            ))}
          </motion.div>

          {/* Mobile carousel */}
          <div className="block md:hidden mt-10">
            <Slider {...mobileSettings}>
              {displayedProducts.map((item, index) => (
                <div key={index} className="px-2">
                  <ProductCard
                    imgSrc={item.img}
                    name={item.name}
                    price={item.price}
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* View All Button */}
          <motion.div
            className="flex items-center justify-center mt-10"
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
          >
            <div className="relative inline-block">
              <span className="absolute inset-0 bg-black rounded-lg translate-x-2 translate-y-2 border-2 "></span>
              <button
                className="relative text-sm font-semibold uppercase px-6 py-3 bg-white text-black rounded-lg border-2 border-black shadow-md scale-105 hover:scale-110 transition-all duration-300"
              >
                VIEW ALL PRODUCTS
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
