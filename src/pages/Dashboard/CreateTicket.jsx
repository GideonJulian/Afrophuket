import { ChevronLeft, Menu } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useCreateEvent } from "../../Context/CreateEventContext";
import PopupNotification from "../../components/PopupNotification";

const CreateTicket = () => {
  const navigate = useNavigate();
  const { id: eventId } = useParams(); // ✅ Always comes from URL
  const { eventData, setEventData } = useCreateEvent();
  const [searchParams] = useSearchParams();
  // ✅ Resolve the correct eventId:
  const stateEventId = location.state?.eventId;
  const routeEventId = searchParams.get("event");
  const resolvedEventId = stateEventId || routeEventId;

  // Keep context in sync
  useEffect(() => {
    if (eventId) {
      setEventData((prev) => ({ ...prev, id: eventId }));
    }
  }, [eventId, setEventData]);

  // ✅ Ticket form state
  const [form, setForm] = useState({
    name: "",
    quantityType: "Limited",
    quantity: "",
    // currency: "USD",
    price: "",
    limit: "",
  });

  const [saving, setSaving] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    type: "success",
    message: "",
  });

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveTickets = async () => {
    const token = localStorage.getItem("token");

    if (!form.name || !form.price) {
      setPopup({
        show: true,
        type: "error",
        message: "Please fill at least Ticket Name and Price.",
      });
      return;
    }

    if (!eventId) {
      setPopup({
        show: true,
        type: "error",
        message: "No event selected. Please add ticket from a specific event.",
      });
      return;
    }
    setSaving(true);
    try {
      // ✅ Always keep context in sync
      setEventData((prev) => ({ ...prev, id: resolvedEventId }));

      // ✅ Ticket payload
      const ticketData = {
        event: eventId,
        name: form.name,
        price: form.price,
        quantity_available:
          form.quantityType === "Unlimited" ? null : form.quantity,
        max_per_customer: form.limit || null,
        description: form.description || "",
        is_refundable: true,
        sales_start_date: new Date().toISOString(),
        sales_end_date: eventData.date
          ? `${eventData.date}T23:59:59Z`
          : new Date().toISOString(),
      };

      // ✅ POST to /tickets/:id/
      const ticketResponse = await fetch(
        `https://afrophuket-backend-gr4j.onrender.com/events/tickets/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(ticketData),
        }
      );
      if (!ticketResponse.ok) throw new Error("Failed to create ticket");
      const ticket = await ticketResponse.json();

      // ✅ Save tickets in context
      setEventData((prev) => ({
        ...prev,
        tickets: [...(prev.tickets || []), ticket],
      }));

      setPopup({
        show: true,
        type: "success",
        message: "🎉 Ticket added successfully!",
      });

      // ✅ Reset form
      setForm({
        name: "",
        quantityType: "Limited",
        quantity: "",
        currency: "USD",
        price: "",
        limit: "",
      });

      // Navigate back after success
      // Navigate back after success
      navigate(`/dashboard/event/${eventId}`);
    } catch (error) {
      console.error(error);
      setPopup({
        show: true,
        type: "error",
        message: "❌ Failed to add ticket",
      });
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

      {/* Ticket Form */}
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
          {/* <div>
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
          </div> */}

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
        <div className="relative inline-block mt-10 group">
          <span
            className="absolute inset-0 bg-black rounded-lg translate-x-2 translate-y-2 border-2
               transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
          ></span>
          <button
            onClick={handleSaveTickets}
            disabled={saving}
            className="relative inline-block whitespace-nowrap text-sm font-semibold uppercase 
               cursor-pointer px-6 py-3 bg-white text-black rounded-lg border-2 border-black 
               shadow-md scale-105 transition-all duration-300 group-hover:scale-100
               disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Tickets"}
          </button>
        </div>
      </div>

      {/* ✅ Popup Notification */}
      <div>
        <PopupNotification
          type={popup.type}
          message={popup.message}
          show={popup.show}
          onClose={() => setPopup({ ...popup, show: false })}
        />
      </div>
    </div>
  );
};

export default CreateTicket;
