import React, { useState, useEffect } from "react";
import Slider from "react-slick";
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
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    fetch("https://afrophuket-backend-gr4j.onrender.com/products/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Token ${token}` : "", 
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAllProducts(data);
        } else {
          console.error("Expected array, got:", data);
        }
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

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
        <div className="text-center mt-0 md:mt-20 flex flex-col items-center">
          <h1 className="text-[42px] sm:text-[55px] md:text-[67.13px] font-[300] font-sans">
            AFROPHUKET
          </h1>
          <h1
            className="text-[42px] sm:text-[55px] md:text-[67.13px] font-[300] bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(234, 67, 11, 1), rgba(79, 61, 236, 1))",
            }}
          >
            PRINTS
          </h1>
          <p className="text-center text-sm w-full max-w-[409px] mt-4">
            A wearable celebration of movement, sound and ancestral connection
          </p>
        </div>

        {/* Controls */}
        <div className="mt-10">
          <h1 className="font-bold text-3xl py-3">Browse Items</h1>
          <div className="flex gap-4 items-center">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-full px-4 py-2 bg-black text-white border cursor-pointer"
            >
              <option value="default">Sort by: Default</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>

            {/* Filter */}
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="rounded-full px-3 py-2 bg-black text-white border cursor-pointer"
            >
              <option value="All">Filter by: All</option>
              <option value="T-shirt">T-shirt</option>
              <option value="Hoodie">Hoodie</option>
            </select>
          </div>

          {/* Loading State */}
          {loading && <p className="mt-5 text-gray-500">Loading products...</p>}

          {/* Desktop view - only 3 items */}
          {!loading && (
            <motion.div
              className="hidden sm:flex gap-4 justify-center mt-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              {displayedProducts.map((item, index) => (
                <ProductCard
                  key={index}
                  id={item.id}
                  imgSrc={item.image}
                  name={item.title}
                  price={item.price}
                />
              ))}
            </motion.div>
          )}

          {/* Mobile carousel */}
          {!loading && (
            <div className="block md:hidden mt-10">
              <Slider {...mobileSettings}>
                {displayedProducts.map((item, index) => (
                  <div key={index} className="px-2">
                    <ProductCard
                      imgSrc={item.image_url}
                      id={item.id}
                      name={item.title}
                      price={item.price}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
