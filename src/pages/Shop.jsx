import React from "react";
import Slider from "react-slick";
import pro1 from "../assets/images/pro1.png";
import pro2 from "../assets/images/pro2.png";
import pro3 from "../assets/images/pro3.png";
import ProductCard from "../components/ui/ProductCard";
import { Autoplay } from "swiper/modules";

const Shop = () => {
  const products = [
    { img: pro1, name: "Black Genius Sweatshirt", price: 36.5 },
    { img: pro2, name: "Black Genius Sweatshirt", price: 36.5 },
    { img: pro3, name: "Black Genius Sweatshirt", price: 36.5 },
  ];

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
        {/* Header Section */}
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
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-full border px-7 py-2 bg-black text-white hover:border-white">
              Sort by: <span className="text-[#E55934]">T-shirt</span>
            </div>
            <div className="rounded-full border px-7 py-2 bg-black text-white hover:border-white">
              Filter by: <span className="text-[#E55934]">$100</span>
            </div>
          </div>

          {/* Desktop View (unchanged) */}
          <div className="hidden md:flex items-center gap-4 mt-10">
            {products.map((item, index) => (
              <ProductCard
                key={index}
                imgSrc={item.img}
                name={item.name}
                price={item.price}
              />
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="block md:hidden mt-10">
            <Slider {...mobileSettings}>
              {products.map((item, index) => (
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
        </div>
      </div>
    </div>
  );
};

export default Shop;
