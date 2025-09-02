import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";

function Payment() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.items);

  const event = location.state?.event;
  const itemsData = event ? event.tickets || [] : cart || [];

  const [quantities, setQuantities] = useState(
    itemsData.reduce((acc, item) => {
      acc[item.id] = item.quantity || 0;
      return acc;
    }, {})
  );

  const handleQuantityChange = (itemId, value) => {
    setQuantities((prev) => ({ ...prev, [itemId]: value }));
  };

  const selectedItems = itemsData.filter((item) => quantities[item.id] > 0);

  const total = selectedItems.reduce(
    (sum, t) => sum + parseFloat(t.price) * quantities[t.id],
    0
  );

  const handleContinue = async () => {
    if (selectedItems.length === 0) return;

    const type = event ? "ticket" : "product";

    const payload = {
      amount: total,
      name: location.state?.customerName || "Guest",
      email: location.state?.customerEmail || "guest@example.com",
      phone: location.state?.customerPhone || "",
      type,
      metadata: {
        user_name: location.state?.customerName || "Guest",
        user_email: location.state?.customerEmail || "guest@example.com",
        user_phone: location.state?.customerPhone || "",
        ...(type === "ticket"
          ? {
              tickets: selectedItems.map((t) => ({
                ticket_id: t.id,
                name: t.name,
                price: t.price,
                quantity: quantities[t.id],
                subtotal: parseFloat(t.price) * quantities[t.id],
              })),
              event_id: event?.id || null,
            }
          : {
              products: selectedItems.map((p) => ({
                product_id: p.id,
                name: p.name,
                price: p.price,
                quantity: quantities[p.id],
                subtotal: parseFloat(p.price) * quantities[p.id],
              })),
            }),
      },
    };

    try {
      const res = await axios.post(
        "https://afrophuket-backend-gr4j.onrender.com/api/payments/initiate/",
        payload
      );

      const payment_url = res.data.payment_url || res.data.payment_link;

      if (payment_url) {
        window.location.href = payment_url;
      } else {
        alert("❌ Failed to initiate payment. Try again.");
      }
    } catch (err) {
      console.error("Payment initiation error:", err);
      alert("❌ Error initiating payment. Check console for details.");
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center">
          <div className="flex items-center justify-center h-6 w-6 rounded-md bg-[#E55934]">
            <ChevronLeft className="text-black w-4 h-4" />
          </div>
        </button>
        <h1 className="ml-2 text-lg md:text-xl font-bold">
          {event ? "Choose Tickets" : "Checkout"}
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {itemsData.length === 0 ? (
            <p className="text-gray-400">
              {event
                ? "No tickets available for this event."
                : "Cart is empty."}
            </p>
          ) : (
            itemsData.map((item) => (
              <div
                key={item.id}
                className={`p-4 border rounded-2xl flex justify-between items-center transition-all duration-300 ${
                  quantities[item.id] > 0
                    ? "border-[#E55934]"
                    : "border-white/10"
                }`}
              >
                <div>
                  <h2 className="font-bold text-xl">{item.name}</h2>
                  <p className="text-[#E55934] text-lg my-2">
                    ₦{parseFloat(item.price).toLocaleString()}{" "}
                    {item.max_per_customer && (
                      <span className="text-white text-sm">
                        max {item.max_per_customer} per customer
                      </span>
                    )}
                  </p>
                  {item.description && (
                    <p className="text-sm opacity-70">{item.description}</p>
                  )}
                </div>
                <div>
                  <select
                    className="px-4 py-2 bg-black border rounded-2xl"
                    value={quantities[item.id]}
                    onChange={(e) =>
                      handleQuantityChange(item.id, Number(e.target.value))
                    }
                  >
                    {[...Array((item.max_per_customer || 10) + 1).keys()].map(
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

        <div className="space-y-4">
          <h1 className="font-bold text-2xl mt-6">Summary</h1>
          <div className="bg-black p-6 shadow-lg rounded-2xl">
            <div className="text-center">
              <h2 className="font-bold text-lg">
                {event ? event.title : "Your Cart"}
              </h2>
            </div>

            <div className="flex flex-col gap-6 mt-8">
              {selectedItems.length === 0 ? (
                <p className="text-center text-gray-400">
                  Nothing selected yet
                </p>
              ) : (
                selectedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b border-white/10 pb-2"
                  >
                    <span>
                      {quantities[item.id]} × {item.name}
                    </span>
                    <span>
                      ₦
                      {(
                        parseFloat(item.price) * quantities[item.id]
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
                  disabled={selectedItems.length === 0}
                  className="relative text-sm font-semibold uppercase cursor-pointer px-6 py-3 bg-white text-black rounded-lg w-full border-2 border-black shadow-md scale-100 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  PAY NOW
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
