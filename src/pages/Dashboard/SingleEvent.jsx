import {
  BookText,
  Calendar,
  ChevronLeft,
  CircleAlert,
  Clock,
  Globe,
  ImagePlus,
  MapPin,
  Menu,
  NotebookPen,
  Upload,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AfroLoader from "../../components/AfroLoader";
import hostimg from "../../assets/images/hostimg.png";
import TicketsList from "./TicketsList";
import SalesDetails from "../../components/Dashboard/SalesDetails";
import PopupNotification from "../../components/PopupNotification";

const SingleEvent = ({ setIsSidebarOpen, isSidebarOpen }) => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("tickets");
  const [editableEvent, setEditableEvent] = useState({});
  const [editing, setEditing] = useState(false);
  const [sales, setSales] = useState(null);
  const [salesLoading, setSalesLoading] = useState(false);
  const [salesError, setSalesError] = useState(null);
  const [popup, setPopup] = useState({
    show: false,
    type: "success",
    message: "",
  });
  const { id: eventId } = useParams();
  const navigate = useNavigate();
  const token = import.meta.env.VITE_API_TOKEN;
  useEffect(() => {
    const token = import.meta.env.VITE_API_TOKEN;

    const fetchEvent = async () => {
      try {
        const res = await fetch(
          `https://afrophuket-backend-gr4j.onrender.com/events/${id}/`,
          {
            method: "GET",
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch event");
        setPopup({
          show: true,
          type: "error",
          message: "Failed to fetch event",
        });
        const data = await res.json();
        setEvent(data);
        setEditableEvent({
          title: data.title || "",
          description: data.description || "",
          location: data.location || "",
          after_party: data.after_party || false,
          after_party_location: data.after_party_location || "",
          startDate: data.date || "",
          endDate: data.end_date || "",
          startTime: data.start_time || "",
          endTime: data.end_time || "",
          location_notes: data.location_notes || "",
          thumbnail: null,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
    fetchSales();
  }, [id]);

  // ✅ Save handler
  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", editableEvent.title);
      formData.append("description", editableEvent.description);
      formData.append("location", editableEvent.location);
      formData.append("after_party", editableEvent.after_party);
      formData.append("location_notes", editableEvent.location_notes);
      formData.append(
        "after_party_location",
        editableEvent.after_party_location
      );
      formData.append("date", editableEvent.startDate);
      formData.append("end_date", editableEvent.endDate);
      formData.append("start_time", editableEvent.startTime);
      formData.append("end_time", editableEvent.endTime);

      if (editableEvent.thumbnail) {
        formData.append("thumbnail", editableEvent.thumbnail);
      }

      const response = await fetch(
        `https://afrophuket-backend-gr4j.onrender.com/events/${id}/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Token ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to save changes");
     
      const updated = await response.json();
      setEvent(updated);
      setEditableEvent({
        ...editableEvent,
        ...updated,
        thumbnail: null,
      });
      setEditing(false);
       setPopup({
        show: true,
        type: "success",
        message: "Event Edited",
      });
    } catch (err) {
       setPopup({
        show: true,
        type: "error",
        message: "Failed to save changes",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditableEvent((prev) => ({ ...prev, [field]: value }));
  };
  const handleNavigate = () => {
    navigate(`/dashboard/event/${id}/create-ticket`);
  };

  const handleDelete = async (ticketId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `https://afrophuket-backend-gr4j.onrender.com/events/tickets/${ticketId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete ticket");
      }

      // Update UI after delete
      setEvent((prevEvent) => ({
        ...prevEvent,
        tickets: prevEvent.tickets.filter((ticket) => ticket.id !== ticketId),
      }));
    } catch (error) {
      console.error("Error deleting ticket:", error);
      alert("Failed to delete ticket ❌");
    }
  };

  const fetchSales = async () => {
    setSalesLoading(true);
    try {
      const res = await fetch(
        `https://afrophuket-backend-gr4j.onrender.com/events/ticket-purchases/`,
        {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch ticket sales");
      const data = await res.json();

      const totalSold = data.length;
      const scanned = data.filter((d) => d.is_scanned).length;
      const notScanned = totalSold - scanned;

      setSales({
        ticketSold: totalSold,
        ticketScanned: scanned,
        notScanned: notScanned,
      });
    } catch (err) {
      setSalesError(err.message);
    } finally {
      setSalesLoading(false);
    }
  };
  if (loading) return <AfroLoader />;
  if (error) return <p className="text-red-400 text-center py-20">{error}</p>;
  if (!event)
    return <p className="text-white text-center py-20">Event not found.</p>;

  return (
    <div className="p-2 sm:p-4 max-w-7xl mx-auto">
      {" "}
      {/* Header */}{" "}
      <div className="header md:border-b border-gray-400 pb-4">
        {" "}
        <div className="w-full flex items-center justify-between mt-3">
          {" "}
          <button
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            {" "}
            <ChevronLeft className="text-gray-600" />{" "}
            <h1 className="ml-1 text-sm sm:text-base">Back</h1>{" "}
          </button>{" "}
          <div className="md:hidden block">
            {" "}
            <div className="md:hidden block">
              {" "}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 "
              >
                {" "}
                <Menu />{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Event Title + Checklist */}{" "}
        <div className="w-full flex flex-col lg:flex-row justify-between mt-8 lg:mt-12 gap-6">
          {" "}
          <div>
            {" "}
            <h1 className="font-bold text-lg sm:text-xl lg:text-2xl mb-5 sm:mb-7">
              {" "}
              {event.title}{" "}
            </h1>{" "}
            <ul className="flex flex-col gap-4">
              {" "}
              <div className="flex gap-2 items-center">
                {" "}
                <Calendar size={20} className="text-gray-600" />{" "}
                <h1 className="text-sm">{editableEvent.startDate}</h1>{" "}
              </div>{" "}
              <div className="flex gap-2 items-center">
                {" "}
                <Clock size={20} className="text-gray-600" />{" "}
                <h1 className="text-sm">
                  {" "}
                  {editableEvent.startTime} - {editableEvent.endTime}{" "}
                </h1>{" "}
              </div>{" "}
              <div className="flex gap-2 items-center">
                {" "}
                <MapPin size={20} className="text-gray-600" />{" "}
                <input
                  type="text"
                  className="bg-transparent border-b border-gray-500 focus:outline-none text-sm w-full max-w-xs"
                  value={editableEvent.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                />{" "}
              </div>{" "}
            </ul>{" "}
          </div>{" "}
          <div className="bg-black text-white px-4 sm:px-6 lg:px-8 rounded-xl lg:rounded-2xl py-4 w-full sm:max-w-md">
            {" "}
            <div className="flex gap-3 mb-3">
              {" "}
              <CircleAlert size={20} />{" "}
              <h1 className="text-sm">
                {" "}
                Things to do before you publish your event:{" "}
              </h1>{" "}
            </div>{" "}
            {event.tickets?.length === 0 ? (
              <li className="text-[#E55934] text-sm">Create some tickets</li>
            ) : (
              <li className="text-green-400 text-sm">✅ Tickets available</li>
            )}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* Content */}{" "}
      <div className="mt-10 flex flex-col lg:flex-row items-start gap-10">
        {" "}
        {/* Left */}{" "}
        <div className="w-full lg:w-[442px]">
          <h1 className="font-bold text-xl sm:text-2xl">Event image</h1>{" "}
          <p className="text-sm font-extralight">Upload a JPEG or PNG file</p>{" "}
          <div className="mt-6 relative">
            {/* Event Image */}
            <img
              src={
                editableEvent.thumbnail
                  ? URL.createObjectURL(editableEvent.thumbnail)
                  : event.thumbnail_url
              }
              className="rounded-2xl w-full object-cover max-h-80 sm:max-h-[400px]"
              alt="Event thumbnail"
            />

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              id="thumbnail-upload"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) handleInputChange("thumbnail", file);
              }}
            />

            {/* Centered Image Icon */}
            <label
              htmlFor="thumbnail-upload"
              className="absolute inset-0 flex items-center justify-center cursor-pointer group"
            >
              <div className="bg-black/50 p-4 rounded-full  transition duration-300">
                <ImagePlus className="text-white w-18 h-18" />
              </div>
            </label>
          </div>
          <div className="mt-5">
            {" "}
            <h1 className="border-b pb-4">Hosted By</h1>{" "}
            <div className="flex items-center gap-3 py-4">
              {" "}
              <img src={hostimg} className="w-10 h-10 rounded-full" />{" "}
              <h1>GAB USA</h1>{" "}
              <Link className="ml-auto text-[#E55934] text-sm">
                {" "}
                Contact the Host{" "}
              </Link>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Right */}{" "}
        <div className="w-full flex-1">
          {" "}
          {/* Editable Title */}{" "}
          {editing ? (
            <input
              type="text"
              className="bg-transparent border-b border-gray-600 focus:outline-none font-bold text-lg sm:text-xl lg:text-2xl mb-5 sm:mb-7 w-full"
              value={editableEvent.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter New Event Name"
            />
          ) : (
            <h1 className="font-bold text-lg sm:text-xl lg:text-2xl mb-5 sm:mb-7">
              {" "}
              {editableEvent.title}
            </h1>
          )}{" "}
          {/* Timeline + Timezone */}{" "}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-wrap">
            {" "}
            <div className="bg-black text-white p-6 rounded-xl w-full sm:w-fit">
              {" "}
              <div className="flex items-start gap-2">
                {" "}
                {/* Timeline dots */}{" "}
                <div className="flex flex-col items-center">
                  {" "}
                  <span className="w-3 h-3 rounded-full bg-gray-400"></span>{" "}
                  <span className="w-px h-26 md:h-14 border-l border-dashed border-gray-400"></span>{" "}
                  <span className="w-3 h-3 rounded-full border-2 border-gray-400"></span>{" "}
                </div>{" "}
                {/* Inputs */}{" "}
                <div className="flex flex-col gap-6 w-full">
                  {" "}
                  {/* Start */}{" "}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 w-full">
                    {" "}
                    <span className="text-gray-300 w-16 shrink-0">
                      Start
                    </span>{" "}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full">
                      {" "}
                      <input
                        type="date"
                        className="bg-transparent border-b border-gray-600 focus:outline-none text-sm w-full sm:w-auto"
                        value={editableEvent.startDate}
                        onChange={(e) =>
                          handleInputChange("startDate", e.target.value)
                        }
                      />{" "}
                      <input
                        type="time"
                        className="bg-transparent border-b border-gray-600 focus:outline-none text-sm w-full sm:w-auto mt-4"
                        value={editableEvent.startTime}
                        onChange={(e) =>
                          handleInputChange("startTime", e.target.value)
                        }
                      />{" "}
                    </div>{" "}
                  </div>{" "}
                  {/* End */}{" "}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 w-full">
                    {" "}
                    <span className="text-gray-300 w-16 shrink-0">
                      End
                    </span>{" "}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full">
                      {" "}
                      <input
                        type="date"
                        className="bg-transparent border-b border-gray-600 focus:outline-none text-sm w-full sm:w-auto"
                        value={editableEvent.endDate}
                        onChange={(e) =>
                          handleInputChange("endDate", e.target.value)
                        }
                      />{" "}
                      <input
                        type="time"
                        className="bg-transparent border-b border-gray-600 focus:outline-none text-sm w-full sm:w-auto"
                        value={editableEvent.endTime}
                        onChange={(e) =>
                          handleInputChange("endTime", e.target.value)
                        }
                      />{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="bg-black text-white px-5 py-3 rounded-2xl w-full sm:w-fit flex flex-col items-start gap-4 shadow-md">
              {" "}
              <div className="bg-[#E55934] p-2 rounded-full flex">
                {" "}
                <Globe className="w-4 h-4 text-white" />{" "}
              </div>{" "}
              <div className="flex flex-col">
                {" "}
                <h1 className="text-sm text-gray-400">GMT-07:00</h1>{" "}
                <h1 className="text-lg">Los Angeles</h1>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          {/* Description */}{" "}
          <div className="bg-black text-white p-6 rounded-xl w-full mt-5">
            {" "}
            <div className="flex items-center gap-3">
              {" "}
              <BookText />{" "}
              <input
                type="text"
                className="bg-transparent border-b border-gray-600 focus:outline-none flex-1"
                placeholder="Add Event Description"
                value={editableEvent.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />{" "}
            </div>{" "}
          </div>{" "}
          {/* Event Location */}{" "}
          <div className="bg-black text-white p-6 rounded-xl w-full mt-5">
            {" "}
            <div className="flex items-center gap-3">
              {" "}
              <MapPin />{" "}
              <input
                type="text"
                className="bg-transparent border-b border-gray-600 focus:outline-none flex-1"
                placeholder="Add Event Location"
                value={editableEvent.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />{" "}
            </div>{" "}
          </div>
          {/* location desc */}
          <div className="bg-black text-white p-6 rounded-xl w-full mt-5">
            {" "}
            <div className="flex items-center gap-3">
              {" "}
              <NotebookPen />
              <input
                type="text"
                className="bg-transparent border-b border-gray-600 focus:outline-none flex-1"
                placeholder="Describe this event location"
                value={editableEvent.location_notes}
                onChange={(e) =>
                  handleInputChange("location_notes", e.target.value)
                }
              />{" "}
            </div>{" "}
          </div>
          {/* After Party */}{" "}
          <div className="bg-black text-white p-6 rounded-xl w-full mt-5">
            {" "}
            <div className="flex items-center gap-3 mb-4">
              {" "}
              <label className="flex items-center gap-2 cursor-pointer">
                {" "}
                <input
                  type="checkbox"
                  checked={editableEvent.after_party || false}
                  onChange={(e) =>
                    handleInputChange("after_party", e.target.checked)
                  }
                  className="w-4 h-4 accent-blue-500"
                />{" "}
                <span>After Party?</span>{" "}
              </label>{" "}
            </div>{" "}
            {editableEvent.after_party && (
              <div className="flex items-center gap-3">
                {" "}
                <MapPin />{" "}
                <input
                  type="text"
                  className="bg-transparent border-b border-gray-600 focus:outline-none flex-1"
                  placeholder="Add After Party Location"
                  value={editableEvent.after_party_location || ""}
                  onChange={(e) =>
                    handleInputChange("after_party_location", e.target.value)
                  }
                />{" "}
              </div>
            )}{" "}
          </div>{" "}
          {/* Actions */}{" "}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-6 w-full">
            {" "}
            <button
              onClick={() => setEditing(!editing)}
              className="border rounded-lg px-6 py-3 cursor-pointer font-semibold text-center w-full sm:w-auto"
            >
              {" "}
              {editing ? "Cancel" : "Edit"}{" "}
            </button>{" "}
            <div className="relative w-full sm:w-auto">
              {" "}
              <span className="absolute inset-0 bg-black rounded-lg translate-x-1.5 translate-y-1.5 border-2"></span>{" "}
              <button
                onClick={handleSave}
                disabled={saving}
                className="relative w-full text-sm md:text-base font-semibold uppercase cursor-pointer px-4 sm:px-6 py-3 bg-white text-black rounded-lg border-2 border-black shadow-md hover:scale-[1.03] transition-all duration-300 disabled:opacity-50"
              >
                {" "}
                {saving ? "Saving..." : "Save Changes"}{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="tabs mt-14 flex items-center gap-8">
        <h1
          onClick={() => setActiveTab("tickets")}
          className={`cursor-pointer ${
            activeTab === "tickets" ? "text-[#E55934]" : ""
          }`}
        >
          Tickets
        </h1>
        <h1
          onClick={() => setActiveTab("sales")}
          className={`cursor-pointer ${
            activeTab === "sales" ? "text-[#E55934]" : ""
          }`}
        >
          Sales
        </h1>
      </div>
      {activeTab === "tickets" ? (
        <div className="mt-10 space-y-12">
          {event.tickets && event.tickets.length > 0 ? (
            <TicketsList
              tickets={event.tickets}
              handleNavigate={handleNavigate}
              handleDelete={handleDelete}
            />
          ) : (
            <TicketsList
              tickets={[]}
              handleNavigate={handleNavigate}
              handleDelete={handleDelete}
            />
          )}
        </div>
      ) : (
        <SalesDetails loading={salesLoading} error={salesError} data={sales} />
      )}
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

export default SingleEvent;
