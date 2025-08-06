import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../Slice/cartSlice";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartModal = ({ isOpen, onClose }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center md:justify-center bg-black/60 p-4"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-black text-white p-6 rounded-2x md:m-0 mb-20 l w-full max-w-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-6">Your Cart</h2>

            {cartItems.length === 0 ? (
              <p className="text-gray-400">Your cart is currently empty.</p>
            ) : (
              <>
                <div className="space-y-6 max-h-[320px] overflow-y-auto pr-2">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-start gap-4"
                    >
                      {/* Product Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">
                          {item.name}
                        </h3>
                        <p className="text-sm mt-1">
                          {item.quantity} x ${Number(item.price).toFixed(2)}
                        </p>

                        {/* Size and Quantity */}
                        <div className="flex items-center gap-3 mt-3 flex-wrap">
                          {item.size && (
                            <select
                              value={item.size}
                              readOnly
                              className="bg-black border border-white rounded px-3 py-1 text-white text-sm"
                            >
                              <option>{item.size}</option>
                            </select>
                          )}

                          {/* Quantity Control */}
                          <div className="flex items-center border border-white rounded-full px-4 py-1 gap-4">
                            <button
                              onClick={() =>
                                dispatch(decreaseQuantity(item.id))
                              }
                              className="text-white"
                            >
                              −
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() =>
                                dispatch(increaseQuantity(item.id))
                              }
                              className="text-white"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          className="text-[#E55934] cursor-pointer text-sm flex items-center gap-1 mt-3"
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          <Trash size={14} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer: Buttons */}
                <div className="mt-8 flex justify-between gap-4">
                  {/* Cancel Button */}
                  <button
                    onClick={onClose}
                    className="w-1/2 py-3 border border-white rounded-md hover:bg-white hover:text-black transition hidden md:block"
                  >
                    Cancel
                  </button>

                  {/* Checkout Button with Shadow */}
                  <div className="relative md:w-1/2 w-full ">
                    <span className="absolute inset-0 bg-black rounded-lg translate-x-2 translate-y-2 border-2 border-white"></span>
                    <button
                      onClick={() => navigate("/checkout")}
                      className="relative w-full text-sm font-semibold uppercase cursor-pointer px-6 py-3 bg-white text-black rounded-lg border-2 border-black shadow-md hover:scale-105 transition-all duration-300"
                    >
                      Checkout (${getSubtotal().toFixed(2)})
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
