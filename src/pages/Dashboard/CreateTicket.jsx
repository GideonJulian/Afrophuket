import { ChevronLeft, Menu } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateEvent } from "../../Context/CreateEventContext";

const CreateTicket = () => {
  const navigate = useNavigate();
  const { eventData, setEventData } = useCreateEvent();

  // ✅ Ticket form state
  const [form, setForm] = useState({
    name: "",
    quantityType: "Limited",
    quantity: "",
    currency: "USD",
    price: "",
    limit: "",
  });

  const [saving, setSaving] = useState(false);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save tickets + event
  const handleSaveTickets = async () => {
    const token = localStorage.getItem("token");

    // 🛑 Basic validation
    if (!form.name || !form.price) {
      alert("Please fill at least Ticket Name and Price.");
      return;
    }

    // ✅ Format ticket properly
    const ticketData = {
      ...form,
      quantity: form.quantityType === "Unlimited" ? null : form.quantity,
    };

    setSaving(true);
    try {
      // Merge tickets into eventData
      const updatedEvent = {
        ...eventData,
        tickets: [...(eventData.tickets || []), ticketData],
      };

      setEventData(updatedEvent);

      const formData = new FormData();
      Object.entries(updatedEvent).forEach(([key, value]) => {
        if (key === "tickets" || key === "tags") {
          formData.append(key, JSON.stringify(value));
        } else if (key === "thumbnail" && value) {
          formData.append("thumbnail", value);
        } else {
          formData.append(key, value);
        }
      });

      const response = await fetch(
        "https://afrophuket-backend.onrender.com/events/",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to save event");
      const data = await response.json();
      console.log("✅ Event + Tickets saved:", data);

      alert("Event created successfully!");
      navigate("/dashboard");

      // ✅ Reset form for new tickets
      setForm({
        name: "",
        quantityType: "Limited",
        quantity: "",
        currency: "USD",
        price: "",
        limit: "",
      });
    } catch (error) {
      console.error(error);
      alert("❌ Failed to save event");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 sm:p-3">
      <div className="w-full flex items-center justify-between mt-3 px-2 sm:px-4">
        {/* Back button */}
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center cursor-pointer"
          >
            <div className="flex items-center justify-center h-6 w-6 sm:h-8 sm:w-8 rounded-md bg-[#E55934]">
              <ChevronLeft className="text-black w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </button>
          <h1 className="ml-2 text-base sm:text-lg md:text-xl font-bold">
            Ticket details
          </h1>
        </div>
        <div className="md:hidden block">
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Ticket Form (UI unchanged) */}
      <div className="w-full text-white rounded-2xl mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Ticket Name */}
          <div>
            <label className="block text-sm mb-1">Ticket name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. VIP Early Birds "
              className="w-full border-b border-gray-400 bg-transparent outline-none py-1"
            />
          </div>

          {/* Ticket Quantity */}
          <div className="flex items-center gap-3">
            <div className="w-1/2">
              <label className="block text-sm mb-1">Ticket Quantity</label>
              <select
                name="quantityType"
                value={form.quantityType}
                onChange={handleChange}
                className="w-full border-b border-gray-400 bg-transparent outline-none py-1"
              >
                <option value="Limited">Limited quantity</option>
                <option value="Unlimited">Unlimited</option>
              </select>
            </div>
            <div className="w-1/2">
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="e.g. 100"
                className="w-full border-b border-gray-400 bg-transparent outline-none py-1"
                disabled={form.quantityType === "Unlimited"}
              />
            </div>
          </div>

          {/* Ticket Currency */}
          <div>
            <label className="block text-sm mb-1">Ticket Currency</label>
            <select
              name="currency"
              value={form.currency}
              onChange={handleChange}
              className="w-full border-b border-gray-400 bg-transparent outline-none py-1"
            >
              <option value="USD">$ USD</option>
              <option value="NGN">₦ NGN</option>
              <option value="EUR">€ EUR</option>
              <option value="GBP">£ GBP</option>
            </select>
          </div>

          {/* Ticket Price */}
          <div>
            <label className="block text-sm mb-1">Ticket Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="e.g. 50"
              className="w-full border-b border-gray-400 bg-transparent outline-none py-1 text-red-500"
            />
          </div>

          {/* Ticket Purchase Limit */}
          <div>
            <label className="block text-sm mb-1">Ticket Purchase Limit</label>
            <input
              type="number"
              name="limit"
              value={form.limit}
              onChange={handleChange}
              placeholder="e.g. 5"
              className="w-full border-b border-gray-400 bg-transparent outline-none py-1"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="relative inline-block mt-10">
          <span className="absolute inset-0 bg-black rounded-lg translate-x-2 translate-y-2 border-2 "></span>
          <button
            onClick={handleSaveTickets}
            disabled={saving}
            className="relative text-sm font-semibold uppercase cursor-pointer px-6 py-3 bg-white text-black rounded-lg border-2 border-black shadow-md scale-105 hover:scale-110 transition-all duration-300"
          >
            {saving ? "Saving..." : "Save Tickets"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
