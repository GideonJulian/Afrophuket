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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-black text-white p-6 rounded-xl w-[90%] max-w-xl shadow-lg"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">Your Cart</h2>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-gray-400">Your cart is currently empty.</p>
            ) : (
              <>
                {/* ✅ Scrollable but scrollbar hidden */}
                <div className="max-h-[320px] overflow-y-auto pr-1 custom-scroll">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 items-center justify-between mb-6"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex flex-col">
                          <h3 className="text-lg font-medium">{item.name}</h3>
                          <p>
                            {item.quantity} × ₦{Number(item.price).toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center w-[110px] gap-4 border border-white rounded-full px-6 py-2 mt-2">
                          <button
                            className="cursor-pointer text-white"
                            onClick={() =>
                              dispatch(decreaseQuantity(item.id))
                            }
                          >
                            –
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="cursor-pointer text-white"
                            onClick={() =>
                              dispatch(increaseQuantity(item.id))
                            }
                          >
                            +
                          </button>
                        </div>

                        {item.size && (
                          <div className="mt-2">
                            <label className="text-sm">Size:</label>
                            <select
                              className="ml-2 bg-black border border-gray-600 rounded px-2 py-1 text-white text-sm"
                              value={item.size}
                              readOnly
                            >
                              <option>{item.size}</option>
                            </select>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <button
                          className="text-[#E55934] text-sm flex items-center gap-1"
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          <Trash />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ✅ Footer always visible */}
                <div className="mt-6">
            
                  <div className="flex justify-between items-center gap-4">
                    <button
                      onClick={onClose}
                      className="w-1/2 border border-white py-3 rounded-md hover:bg-white hover:text-black transition hidden md:inline"
                    >
                      Cancel
                    </button>

                    <div className="relative md:w-1/2 w-full">
                      <span className="absolute inset-0 bg-black rounded-lg translate-x-2 translate-y-2 border-2"></span>
                      <button
                        onClick={() => navigate("/checkout")}
                        className="relative text-sm font-semibold uppercase cursor-pointer px-6 py-3 bg-white text-black rounded-lg border-2 border-black shadow-md w-full hover:scale-105 transition-all duration-300"
                      >
                        Checkout (₦{getSubtotal().toFixed(2)})
                      </button>
                    </div>
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
