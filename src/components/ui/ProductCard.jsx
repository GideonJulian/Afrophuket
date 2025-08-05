import { ShoppingCart } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Slice/cartSlice";

const ProductCard = ({ imgSrc, name, price, id }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const product = {
      id,         // make sure each product has a unique id
      name,
      price: Number(price),
      image: imgSrc,
    };

    dispatch(addToCart(product));
  };

  return (
    <div className="w-full sm:w-[400px] cursor-pointer group transition-transform duration-300 hover:-translate-y-1">
      <div className="w-full relative overflow-hidden rounded-2xl">
        <img
          src={imgSrc}
          alt={name}
          className="rounded-2xl w-full h-auto object-cover transition-transform duration-300 group-hover:scale-102"
        />
        <button
          onClick={handleAddToCart}
          className="px-6 py-2 md:py-3 cursor-pointer bg-black rounded-full flex items-center gap-3 text-white 
          absolute bottom-2 right-2 transition-all duration-300"
        >
          <span className="transition-transform duration-300 group-hover:animate-bounce">
            <ShoppingCart color="white" size={20} />
          </span>
          Add to cart
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
