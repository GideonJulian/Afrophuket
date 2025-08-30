import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, CircleAlert } from "lucide-react";
import axios from "axios";

const ContactInfo = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [loading, setLoading] = useState(false);

  if (!state) {
    return <p className="p-6">No ticket selected. Go back.</p>;
  }

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target);
      const name = formData.get("name");
      const email = formData.get("email");
      const phone = formData.get("phone");

      const amount = state.total;

      const payload = {
        amount,
        email,
        phone,
        name,
      };

      const res = await axios.post(
        "https://afrophuket-backend-gr4j.onrender.com/api/payments/initiate/",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Payment response:", res.data);

      if (res.data.payment_link) {
        // ✅ Save ticket + user data for later use
        sessionStorage.setItem(
          "ticketMeta",
          JSON.stringify({
            email,
            name,
            phone,
            tickets: state.tickets,
            total: amount,
            eventName: state.eventName,
          })
        );

        // Redirect to Flutterwave checkout
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
              placeholder=" "
              className="w-full border-b border-[#C2E7E77D] bg-transparent outline-none py-1"
              required
            />
          </div>
          <div className="mt-5">
            <label className="block text-sm mb-2"> Email</label>
            <input
              type="email"
              name="email"
              placeholder=" "
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
        </form>

        {/* Summary */}
        <div className="bg-black p-6 shadow-lg rounded-2xl">
          <h2 className="font-bold text-lg text-center">
            {state?.eventName || "Event"}
          </h2>

          {state?.tickets && state.tickets.length > 0 ? (
            <div className="flex flex-col gap-6 mt-8">
              {state.tickets.map((ticket) => (
                <div key={ticket.id} className="flex justify-between">
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
            </div>
          ) : (
            <p className="text-center text-gray-400 mt-6">
              No ticket data available
            </p>
          )}

          {/* Desktop Pay Now */}
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
