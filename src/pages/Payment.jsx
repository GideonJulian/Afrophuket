import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useSelector } from "react-redux";

function Payment() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Case 1: coming from SingleTicket
  const event = location.state?.event;

  // Case 2: coming from Cart/Checkout
  const cart = useSelector((state) => state.cart.items);

  // Choose the data source
  const ticketsData = event ? event.tickets || [] : cart;

  // Track quantity for each ticket
  const [quantities, setQuantities] = useState(
    ticketsData.reduce((acc, ticket) => {
      acc[ticket.id] = ticket.quantity || 0; // preload cart quantities
      return acc;
    }, {})
  );

  const handleQuantityChange = (ticketId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [ticketId]: value,
    }));
  };

  const selectedTickets = ticketsData.filter(
    (ticket) => quantities[ticket.id] > 0
  );
  const total = selectedTickets.reduce(
    (sum, t) => sum + parseFloat(t.price) * quantities[t.id],
    0
  );

  const handleContinue = () => {
    const selected = selectedTickets.map((ticket) => ({
      ...ticket,
      quantity: quantities[ticket.id],
      subtotal: parseFloat(ticket.price) * quantities[ticket.id],
    }));

    const selection = {
      source: event ? "event" : "cart",
      eventName: event ? event.title : "Cart Checkout",
      tickets: selected,
      total,
    };

    // If from SingleTicket, keep event id in URL
    if (event) {
      navigate(`/payment/${id}/contactinfo`, { state: selection });
    } else {
      navigate(`/checkout/contactinfo`, { state: selection });
    }
  };

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
          {event ? "Choose Tickets" : "Checkout"}
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Tickets */}
        <div className="space-y-6">
          {ticketsData.length === 0 ? (
            <p className="text-gray-400">
              {event
                ? "No tickets available for this event."
                : "Cart is empty."}
            </p>
          ) : (
            ticketsData.map((ticket) => (
              <div
                key={ticket.id}
                className={`p-4 border rounded-2xl flex justify-between items-center transition-all duration-300 ${
                  quantities[ticket.id] > 0
                    ? "border-[#E55934]"
                    : "border-white/10"
                }`}
              >
                <div>
                  <h2 className="font-bold text-xl">{ticket.name}</h2>
                  <p className="text-[#E55934] text-lg my-2">
                    ₦{parseFloat(ticket.price).toLocaleString()}{" "}
                    {ticket.max_per_customer && (
                      <span className="text-white text-sm">
                        max {ticket.max_per_customer} per customer
                      </span>
                    )}
                  </p>
                  {ticket.description && (
                    <p className="text-sm opacity-70">{ticket.description}</p>
                  )}
                </div>
                <div>
                  <select
                    className="px-4 py-2 bg-black border rounded-2xl"
                    value={quantities[ticket.id]}
                    onChange={(e) =>
                      handleQuantityChange(ticket.id, Number(e.target.value))
                    }
                  >
                    {[...Array((ticket.max_per_customer || 10) + 1).keys()].map(
                      (n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        <div className="space-y-4">
          <h1 className="font-bold text-2xl mt-6">Summary</h1>
          <div className="bg-black p-6 shadow-lg rounded-2xl">
            <div className="text-center">
              <h2 className="font-bold text-lg">
                {event ? event.title : "Your Cart"}
              </h2>
            </div>
            <div className="flex flex-col gap-6 mt-8">
              {selectedTickets.length === 0 ? (
                <p className="text-center text-gray-400">
                  Nothing selected yet
                </p>
              ) : (
                selectedTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex justify-between border-b border-white/10 pb-2"
                  >
                    <span>
                      {quantities[ticket.id]} × {ticket.name}
                    </span>
                    <span>
                      ₦
                      {(
                        parseFloat(ticket.price) * quantities[ticket.id]
                      ).toLocaleString()}
                    </span>
                  </div>
                ))
              )}

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>

              <div className="relative inline-block mt-10 w-full">
                <span className="absolute inset-0 bg-black rounded-lg translate-x-2 translate-y-2 border-2"></span>
                <button
                  onClick={handleContinue}
                  disabled={selectedTickets.length === 0}
                  className="relative text-sm font-semibold uppercase cursor-pointer px-6 py-3 bg-white text-black rounded-lg w-full border-2 border-black shadow-md scale-100 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  CONTINUE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
