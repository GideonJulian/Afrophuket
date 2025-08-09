// src/pages/CheckoutTickets.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeft } from "lucide-react";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../Slice/cartSlice";

const CheckoutTickets = () => {
  const cartItems = useSelector((state) => state.cart.items || []);
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-8">
      <div className="mx-auto max-w-[1296px] p-4 flex  justify-between mt-20">
        {/* Tickets Section */}
        <div className="w-2/3 pr-8">
          <h1 className="text-xl font-bold mb-6">Checkout</h1>

          <h2 className="flex items-center text-2xl font-bold mb-4">
            <span className="mr-2 bg-[#FC6435] p-1 rounded-md cursor-pointer">
              <ArrowLeft />
            </span>{" "}
            Choose Tickets
          </h2>

          {cartItems.length === 0 && (
            <p className="text-gray-400">Your cart is empty.</p>
          )}

          {cartItems.map((item) => (
            <div key={item.id} className="border-b border-gray-700 py-4">
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-[#FC6435] font-bold">
                ${item.price.toLocaleString()}{" "}
                <span className="text-sm text-gray-400">Includes fee</span>
              </p>

              <div className="flex items-center mt-2">
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
                  className="ml-4 text-sm text-[#FC6435]"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="w-1/3 bg-zinc-900 rounded-xl p-6">
          <h3 className="text-lg font-bold mb-4">
            {cartItems[0]?.eventName || "Your Event"}
          </h3>

          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>
                {item.quantity} × {item.name}
              </span>
              <span>${(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}

          <hr className="my-4 border-gray-700" />

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>

          <button className="w-full mt-6 bg-white text-black font-bold py-3 rounded-lg">
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutTickets;
