// src/pages/CheckoutTickets.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeft } from "lucide-react";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../Slice/cartSlice";
import { useNavigate } from "react-router-dom";

const CheckoutTickets = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items || []);
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1296px] mt-20 flex flex-col lg:flex-row gap-8">
        {/* Tickets Section */}
        <div className="w-full lg:w-2/3">
          <h1 className="text-xl font-bold mb-6">Checkout</h1>

          <h2 className="flex items-center text-xl sm:text-2xl font-bold mb-4">
            <span
              className="mr-2 bg-[#FC6435] p-1 rounded-md cursor-pointer"
              onClick={() => navigate("/shop")}
            >
              <ArrowLeft />
            </span>
            Choose Tickets
          </h2>

          {cartItems.length === 0 && (
            <p className="text-gray-400">Your cart is empty.</p>
          )}

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="border-b border-gray-700 py-6 sm:py-8 flex justify-between items-start"
            >
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-[#FC6435] font-bold">
                  ${item.price.toLocaleString()}{" "}
                  <span className="text-sm text-gray-400">Includes fee</span>
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <select
                  value={item.quantity}
                  onChange={(e) =>
                    dispatch(
                      e.target.value > item.quantity
                        ? increaseQuantity(item.id)
                        : decreaseQuantity(item.id)
                    )
                  }
                  className="bg-black border border-gray-500 rounded px-3 py-1 text-white"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>

                <button
                  className="text-sm text-[#FC6435]"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="w-full lg:w-1/3 bg-[#000000] rounded-xl p-6">
          <h3 className="text-lg font-bold mb-4">
            {cartItems[0]?.eventName || "Your Event"}
          </h3>

          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between mb-6 sm:mb-14">
              <span>
                {item.quantity} × {item.name}
              </span>
              <span>${(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}

          <hr className="my-4 border-gray-700" />

          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>

          <div className="relative inline-block mt-8 w-full">
            <span className="absolute inset-0 bg-black rounded-lg translate-x-2 translate-y-2 border-2"></span>
            <button
              onClick={() => navigate("/payment")}
              className="relative text-sm font-semibold uppercase w-full px-6 py-3 bg-white text-black rounded-lg border-2 border-black shadow-md hover:scale-105 transition-all duration-300"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutTickets;
