import { ShoppingCart } from "lucide-react";
import React from "react";

const ProductCard = ({ imgSrc, name, price }) => {
  return (
    <div className="w-full sm:w-[400px]">
      <div className="w-full relative">
        <img src={imgSrc} className="rounded-2xl w-full h-auto object-cover" />
        <button className="px-6 py-2 md:py-3 bg-[#000000] rounded-full flex items-center gap-3 text-white absolute bottom-2 right-2">
          <ShoppingCart color="white" size={20} /> Add to cart
        </button>
      </div>
      <div className="text-center mt-4">
        <h1 className="font-bold text-white text-lg">{name}</h1>
        <h1 className="font-bold text-white text-lg">${price}</h1>
      </div>
    </div>
  );
};

export default ProductCard;
