import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, CircleAlert } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";

const ContactInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cart = useSelector((state) => state.cart.items);

  const [loading, setLoading] = useState(false);

  // Use location state or fallback to cart
  const state =
    location.state ||
    (cart.length
      ? {
          source: "cart",
          eventName: "Cart Checkout",
          tickets: cart.map((t) => ({
            ticket_id: t.id,
            name: t.name,
            price: t.price,
            quantity: t.quantity,
            subtotal: parseFloat(t.price) * t.quantity,
          })),
          total: cart.reduce((sum, t) => sum + t.price * t.quantity, 0),
        }
      : null);

  useEffect(() => {
    if (!state || !state.tickets || state.tickets.length === 0) {
      alert("No payment data found. Please return to checkout.");
      navigate(-1);
    }
  }, [state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target);
      const name = formData.get("name");
      const email = formData.get("email");
      const phone = formData.get("phone");

      const payload = {
        amount: state.total,
        email,
        phone,
        name,
        type: state.source === "cart" ? "product" : "ticket",
        metadata:
          state.source === "cart"
            ? {
                products: state.tickets.map((t) => ({
                  product_id: t.ticket_id,
                  quantity: t.quantity,
                })),
              }
            : {
                event_id: state.eventId,
                tickets: state.tickets.map((t) => ({
                  ticket_id: t.ticket_id,
                  quantity: t.quantity,
                })),
              },
      };

      const res = await axios.post(
        "https://afrophuket-backend-gr4j.onrender.com/api/payments/initiate/",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.payment_link) {
        sessionStorage.setItem(
          "ticketMeta",
          JSON.stringify({
            email,
            name,
            phone,
            tickets: state.tickets,
            total: state.total,
            eventName: state.eventName,
          })
        );
        window.location.href = res.data.payment_link;
      } else {
        alert("❌ Payment link not returned. Try again.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("❌ Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!state) return null;

  return (
    <div className="p-4 md:p-8">
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
        <form id="contactForm" className="space-y-4" onSubmit={handleSubmit}>
          <div className="border rounded-xl p-4 flex items-center">
            <CircleAlert className="mr-3" />
            Tickets will only be sent to the email address you provide here.
          </div>
          <div>
            <label className="block text-sm mb-2">Your name</label>
            <input
              type="text"
              name="name"
              className="w-full border-b border-[#C2E7E77D] bg-transparent outline-none py-1"
              required
            />
          </div>
          <div className="mt-5">
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border-b border-[#C2E7E77D] bg-transparent outline-none py-1"
              required
            />
          </div>
          <div className="mt-5">
            <label className="block text-sm mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="08012345678"
              className="w-full border-b border-[#C2E7E77D] bg-transparent outline-none py-1"
              required
            />
          </div>

          <div className="mt-6 md:hidden">
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-white text-black font-semibold uppercase rounded-lg border-2 border-black shadow-md hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Processing..." : "PAY NOW"}
            </button>
          </div>
        </form>

        <div className="bg-black p-6 shadow-lg rounded-2xl">
          <h2 className="font-bold text-lg text-center">
            {state.eventName || "Event"}
          </h2>
          {state.tickets.map((ticket) => (
            <div key={ticket.ticket_id} className="flex justify-between mt-4">
              <span>
                {ticket.quantity} × {ticket.name}
              </span>
              <span>₦{ticket.subtotal.toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold mt-4">
            <span>Total</span>
            <span>₦{state.total.toLocaleString()}</span>
          </div>

          <div className="relative inline-block mt-10 w-full hidden md:block">
            <span className="absolute inset-0 bg-black rounded-lg translate-x-2 translate-y-2 border-2"></span>
            <button
              type="submit"
              form="contactForm"
              disabled={loading}
              className="relative text-sm font-semibold uppercase cursor-pointer px-6 py-3 bg-white text-black rounded-lg w-full border-2 border-black shadow-md scale-100 hover:scale-105 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Processing..." : "PAY NOW"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
