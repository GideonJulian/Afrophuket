import { ShoppingBag, Trash2 } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ name, id, imgSrc, price, quantity, onDelete }) => {
  const navigate = useNavigate();


  const handleClick = () => {
    navigate(`product/${id}`);
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // prevent navigation when clicking delete
    if (onDelete) onDelete(id);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer group transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="w-full relative overflow-hidden rounded-2xl shadow-md">
        {/* Delete Icon */}
        <button
          onClick={handleDelete}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md transition z-20"
        >
          <Trash2 className="text-red-500 w-5 h-5" />
        </button>

        {/* Product Image */}
        <img
          src={imgSrc}
          alt={name}
          className="rounded-2xl w-full h-56 sm:h-64 md:h-72 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Quantity Button */}
        <button
          className="px-4 py-2 md:px-6 md:py-3 cursor-pointer bg-black rounded-full flex items-center gap-2 md:gap-3 text-white 
          absolute bottom-3 right-3 transition-all duration-300 z-10"
        >
          <ShoppingBag size={20} />
          {quantity} pcs
        </button>
      </div>

      {/* Product Info */}
      <div className="text-center mt-3">
        <h1 className="font-bold text-white text-base sm:text-lg truncate">
          {name}
        </h1>
        <h2 className="font-semibold text-gray-300 text-sm sm:text-base">
          ${price}
        </h2>
      </div>
      
    </div>
  );
};

export default ProductCard;
