import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const ContactInfo = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return <p className="p-6">No ticket selected. Go back.</p>;
  }

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center cursor-pointer"
        >
          <div className="flex items-center justify-center h-6 w-6 rounded-md bg-[#E55934]">
            <ChevronLeft className="text-black w-4 h-4" />
          </div>
        </button>
        <h1 className="ml-2 text-lg md:text-xl font-bold">
          Enter Your Details
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-black border border-white/20"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-black border border-white/20"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-3 rounded-lg bg-black border border-white/20"
          />
          <div className="relative inline-block mt-10 w-full">
            <span className="absolute inset-0 bg-black rounded-lg translate-x-2 translate-y-2 border-2"></span>
            <button
              type="submit"
              className="relative text-sm font-semibold uppercase cursor-pointer px-6 py-3 bg-white text-black rounded-lg w-full border-2 border-black shadow-md scale-100 hover:scale-105 transition-all duration-300"
            >
              PAY NOW
            </button>
          </div>
        </form>

        {/* Summary */}
        <div className="bg-black p-6 shadow-lg rounded-2xl">
          <h2 className="font-bold text-lg text-center">{state.eventName}</h2>
          <div className="flex flex-col gap-6 mt-8">
            <div className="flex justify-between">
              <span>
                {state.quantity} × {state.ticket.name}
              </span>
              <span>₦{state.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₦{state.subtotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
