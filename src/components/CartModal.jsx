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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-black text-white p-4 rounded-2xl w-full max-w-md shadow-lg"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>

            {cartItems.length === 0 ? (
              <p className="text-gray-400">Your cart is currently empty.</p>
            ) : (
              <>
                <div className="space-y-6 max-h-[320px] overflow-y-auto pr-1 custom-scroll">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1 flex flex-col gap-2">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm">
                            {item.quantity} x ${Number(item.price).toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          {item.size && (
                            <select
                              className="bg-black border border-gray-600 rounded px-2 py-1 text-white"
                              value={item.size}
                              readOnly
                            >
                              <option>{item.size}</option>
                            </select>
                          )}
                          <div className="flex items-center border border-white rounded-full px-4 py-1 gap-2">
                            <button
                              onClick={() =>
                                dispatch(decreaseQuantity(item.id))
                              }
                            >
                              −
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() =>
                                dispatch(increaseQuantity(item.id))
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <button
                          className="text-[#E55934] text-sm flex items-center gap-1"
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          <Trash size={14} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-6">
                  <div className="w-full relative">
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
