import { ChevronDown, ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();

  // ✅ Dummy tickets data
  const tickets = [
    { id: 1, name: "Early-Bird Ticket", price: 62, fee: 1, desc: "Discounted ticket for early buyers" },
    { id: 2, name: "Regular Ticket", price: 80, fee: 2, desc: "Standard event ticket" },
    { id: 3, name: "VIP Ticket", price: 150, fee: 5, desc: "Access to VIP section and free drinks" },
  ];

  const [selectedTicket, setSelectedTicket] = useState(tickets[0]); // default selection
  const [quantity, setQuantity] = useState(1);

  const subtotal = (selectedTicket.price + selectedTicket.fee) * quantity;

  return (
    <div className="p-6 sm:p-8">
      {/* Back button + Title */}
      <div className="flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center cursor-pointer"
        >
          <div className="flex items-center justify-center h-6 w-6 sm:h-8 sm:w-8 rounded-md bg-[#E55934]">
            <ChevronLeft className="text-black w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </button>
        <h1 className="ml-2 text-lg sm:text-xl md:text-2xl font-bold">
          Choose a Ticket
        </h1>
      </div>

      {/* Main Content */}
      <div className="mt-10 flex flex-col md:flex-row md:justify-between gap-10">
        {/* Tickets list */}
        <div className="flex-1 space-y-6">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className={`pb-5 border-b border-white/10 cursor-pointer p-4 rounded-xl transition ${
                selectedTicket.id === ticket.id ? "bg-white/5" : "bg-transparent"
              }`}
              onClick={() => setSelectedTicket(ticket)}
            >
              <h1 className="font-bold text-xl sm:text-2xl">{ticket.name}</h1>
              <p className="text-[#E55934] text-lg my-2">
                ${ticket.price}.00{" "}
                <span className="text-white text-sm">+ ${ticket.fee} fee</span>
              </p>
              <p className="text-sm text-gray-300">{ticket.desc}</p>

              {/* Quantity dropdown */}
              {selectedTicket.id === ticket.id && (
                <div className="mt-4">
                  <select
                    className="px-4 py-2 rounded-lg bg-black border border-white/20"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary box */}
        <div className="w-full md:w-[400px]">
          <h1 className="font-bold text-2xl mb-4">Summary</h1>
          <div className="bg-black p-6 rounded-2xl shadow-lg">
            <div className="text-center">
              <h1 className="font-bold text-lg">Afro Pool Party</h1>
            </div>

            <div className="flex flex-col gap-6 mt-10">
              <div className="flex items-center justify-between">
                <div className="text-white text-lg">
                  {quantity} × {selectedTicket.name}
                </div>
                <div className="text-white text-lg">
                  ${(selectedTicket.price + selectedTicket.fee) * quantity}.00
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-white text-lg">Subtotal</div>
                <div className="text-white text-lg">${subtotal}.00</div>
              </div>

              <div className="flex items-center justify-between mt-6 border-t pt-4 border-white/10">
                <div className="text-white text-lg font-bold">Total</div>
                <div className="text-white text-lg font-bold">${subtotal}.00</div>
              </div>

              <div className="relative inline-block mt-20 w-full">
                <span className="absolute inset-0 bg-black rounded-lg translate-x-2 translate-y-2 border-2"></span>
                <button className="relative text-sm font-bold uppercase cursor-pointer px-6 py-3 bg-white text-black rounded-lg w-full border-2 border-black shadow-md hover:scale-105 transition-all duration-300">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
