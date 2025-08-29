import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, CircleAlert } from "lucide-react";

const ContactInfo = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // form state
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  if (!state) {
    return <p className="p-6">No ticket selected. Go back.</p>;
  }

  // handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setError("Please fill in your name and email.");
      return;
    }

    setError("");

    // 👉 This is where you’ll later call Flutterwave
    console.log("User Details:", formData);
    console.log("Tickets:", state.tickets);
    console.log("Total:", state.total);

    alert("Form submitted successfully! (Flutterwave will come next)");
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
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="border rounded-xl p-4 flex items-center">
            <CircleAlert className="mr-3" />
            Tickets will only be sent to the email address you provide here.
          </div>

          {error && (
            <p className="text-red-500 text-sm font-semibold">{error}</p>
          )}

          <div>
            <label className="block text-sm mb-2">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full border-b border-[#C2E7E77D] bg-transparent outline-none py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="w-full border-b border-[#C2E7E77D] bg-transparent outline-none py-2"
            />
          </div>

          {/* Mobile PAY NOW button */}
          <div className="block md:hidden mt-8">
            <button
              type="submit"
              className="w-full text-sm font-semibold uppercase cursor-pointer px-6 py-3 bg-black text-white rounded-lg border-2 border-black shadow-md hover:scale-105 transition-all duration-300"
            >
              PAY NOW
            </button>
          </div>
        </form>

        {/* Summary */}
        <div className="bg-black p-6 shadow-lg rounded-2xl">
          <h2 className="font-bold text-lg text-center text-white">
            {state?.eventName || "Event"}
          </h2>

          {state?.tickets && state.tickets.length > 0 ? (
            <div className="flex flex-col gap-6 mt-8 text-white">
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

          {/* Desktop PAY NOW button */}
          <div className="hidden md:block relative inline-block mt-10 w-full">
            <span className="absolute inset-0 bg-black rounded-lg translate-x-2 translate-y-2 border-2"></span>
            <button
              type="submit"
              form="contactForm"
              className="relative text-sm font-semibold uppercase cursor-pointer px-6 py-3 bg-white text-black rounded-lg w-full border-2 border-black shadow-md scale-100 hover:scale-105 transition-all duration-300"
            >
              PAY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
