import {
  BookText,
  Calendar,
  ChevronLeft,
  CircleAlert,
  Clock,
  Globe,
  MapPin,
  Menu,
  Upload,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AfroLoader from "../../components/AfroLoader";
import hostimg from "../../assets/images/hostimg.png";

const SingleEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [editableEvent, setEditableEvent] = useState({});
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(
          `https://afrophuket-backend.onrender.com/events/${id}/`
        );
        if (!res.ok) throw new Error("Failed to fetch event");
        const data = await res.json();
        setEvent(data);
        setEditableEvent({
          title: data.title || "",
          description: data.description || "",
          location: data.location || "",
          afterParty: data.after_party || "",
          startDate: data.date || "",
          endDate: data.end_date || "",
          startTime: data.start_time || "",
          endTime: data.end_time || "",
          thumbnail: null, // placeholder for file upload
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  // ✅ Save handler (multipart/form-data)
  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", editableEvent.title);
      formData.append("description", editableEvent.description);
      formData.append("location", editableEvent.location);
      formData.append("after_party", editableEvent.afterParty);
      formData.append("date", editableEvent.startDate);
      formData.append("end_date", editableEvent.endDate);
      formData.append("start_time", editableEvent.startTime);
      formData.append("end_time", editableEvent.endTime);

      if (editableEvent.thumbnail) {
        formData.append("thumbnail", editableEvent.thumbnail);
      }

      // Example tags (backend may expect array of objects)
      const tags = [{ id: 1, name: "Music" }];
      formData.append("tags", JSON.stringify(tags));

      const response = await fetch(
        `https://afrophuket-backend.onrender.com/events/${id}/`,
        {
          method: "PATCH",
          body: formData, // ✅ no Content-Type header
        }
      );

      if (!response.ok) throw new Error("Failed to save changes");

      const updated = await response.json();
      setEvent(updated);
      setEditableEvent({
        title: updated.title || "",
        description: updated.description || "",
        location: updated.location || "",
        afterParty: updated.after_party || "",
        startDate: updated.date || "",
        endDate: updated.end_date || "",
        startTime: updated.start_time || "",
        endTime: updated.end_time || "",
        thumbnail: null,
      });
      setEditing(false);
    } catch (err) {
      alert("Error saving event: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditableEvent((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) return <AfroLoader />;
  if (error) return <p className="text-red-400 text-center py-20">{error}</p>;
  if (!event)
    return <p className="text-white text-center py-20">Event not found.</p>;

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="header md:border-b border-gray-400 pb-4">
        <div className="w-full flex items-center justify-between">
          <button
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <ChevronLeft className="text-gray-600" />
            <h1 className="ml-1 text-sm sm:text-base">Back</h1>
          </button>
          <div className="md:hidden block">
            <Menu />
          </div>
        </div>

        {/* Event Title + Checklist */}
        <div className="w-full flex flex-col lg:flex-row justify-between mt-8 lg:mt-12 gap-6 lg:gap-0">
          <div>
            <h1 className="font-bold text-lg sm:text-xl lg:text-[21.7px] mb-5 sm:mb-7">
              {event.title}
            </h1>
            <ul className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <Calendar size={20} className="text-gray-600" />
                <h1 className="text-sm">{editableEvent.startDate}</h1>
              </div>
              <div className="flex gap-2 items-center">
                <Clock size={20} className="text-gray-600" />
                <h1 className="text-sm">
                  {editableEvent.startTime} - {editableEvent.endTime}
                </h1>
              </div>
              <div className="flex gap-2 items-center">
                <MapPin size={20} className="text-gray-600" />
                <input
                  type="text"
                  className="bg-transparent border-b border-gray-500 focus:outline-none text-sm"
                  value={editableEvent.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                />
              </div>
            </ul>
          </div>

          <div className="bg-black text-white px-4 sm:px-6 lg:px-8 rounded-xl lg:rounded-2xl py-4 max-w-full sm:max-w-md">
            <div className="flex gap-3 mb-3">
              <CircleAlert size={20} />
              <h1 className="text-sm">
                Things to do before you publish your event:
              </h1>
            </div>
            {event.tickets?.length === 0 ? (
              <li className="text-[#E55934] text-sm">Create some tickets</li>
            ) : (
              <li className="text-green-400 text-sm">✅ Tickets available</li>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-10 flex flex-col lg:flex-row items-start gap-10">
        {/* Left */}
        <div className="w-full lg:w-[442px]">
          <h1 className="font-bold text-2xl">Event image</h1>
          <p className="text-sm font-extralight">Upload a JPEG or PNG file</p>
          <div className="mt-6 relative">
            {/* Preview existing or uploaded image */}
            <img
              src={
                editableEvent.thumbnail
                  ? URL.createObjectURL(editableEvent.thumbnail) // show new upload
                  : event.thumbnail_url // fallback to existing image
              }
              className="rounded-2xl w-full object-cover"
              alt="Event thumbnail"
            />

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              id="thumbnail-upload"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  handleInputChange("thumbnail", file); // store the file in state
                }
              }}
            />

            {/* Button to trigger file input */}
            <label
              htmlFor="thumbnail-upload"
              className="absolute bottom-4 right-4 bg-[#fff] p-3 rounded-full shadow-md hover:scale-105 transition cursor-pointer"
            >
              <Upload className="text-[#E55934] w-5 h-5" />
            </label>
          </div>

          <div className="mt-5">
            <h1 className="border-b pb-4">Hosted By</h1>
            <div className="flex items-center gap-3 py-4">
              <img src={hostimg} className="w-10 h-10 rounded-full" />
              <h1>GAB USA</h1>
              <Link className="ml-auto text-[#E55934] text-sm">
                Contact the Host
              </Link>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="w-full">
          {editing ? (
            <input
              type="text"
              className="bg-transparent border-b border-gray-600 focus:outline-none font-bold text-lg sm:text-xl lg:text-[21.7px] mb-5 sm:mb-7 w-full"
              value={editableEvent.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          ) : (
            <h1 className="font-bold text-lg sm:text-xl lg:text-[21.7px] mb-5 sm:mb-7">
              {editableEvent.title}
            </h1>
          )}

          {/* Timeline + Timezone */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="bg-black text-white p-6 rounded-xl w-fit">
              <div className="flex items-start gap-2">
                <div className="flex flex-col items-center">
                  <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                  <span className="w-px h-8 border-l border-dashed border-gray-400"></span>
                  <span className="w-3 h-3 rounded-full border-2 border-gray-400"></span>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-300 w-12">Start</span>
                    <input
                      type="date"
                      className="bg-transparent border-b border-gray-600 focus:outline-none text-sm"
                      value={editableEvent.startDate}
                      onChange={(e) =>
                        handleInputChange("startDate", e.target.value)
                      }
                    />
                    <input
                      type="time"
                      className="bg-transparent border-b border-gray-600 focus:outline-none text-sm"
                      value={editableEvent.startTime}
                      onChange={(e) =>
                        handleInputChange("startTime", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-300 w-12">End</span>
                    <input
                      type="date"
                      className="bg-transparent border-b border-gray-600 focus:outline-none text-sm"
                      value={editableEvent.endDate}
                      onChange={(e) =>
                        handleInputChange("endDate", e.target.value)
                      }
                    />
                    <input
                      type="time"
                      className="bg-transparent border-b border-gray-600 focus:outline-none text-sm"
                      value={editableEvent.endTime}
                      onChange={(e) =>
                        handleInputChange("endTime", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black text-white px-5 py-3 rounded-2xl w-fit flex flex-col items-start gap-4 shadow-md">
              <div className="bg-[#E55934] p-2 rounded-full flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm text-gray-400">GMT-07:00</h1>
                <h1 className="text-lg">Los Angeles</h1>
              </div>
            </div>
          </div>

          {/* Editable Sections */}
          <div className="bg-black text-white p-6 rounded-xl w-full mt-5">
            <div className="flex items-center gap-3">
              <BookText />
              <input
                type="text"
                className="bg-transparent border-b border-gray-600 focus:outline-none flex-1"
                placeholder="Add Event Description"
                value={editableEvent.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>
          </div>

          <div className="bg-black text-white p-6 rounded-xl w-full mt-5">
            <div className="flex items-center gap-3">
              <MapPin />
              <input
                type="text"
                className="bg-transparent border-b border-gray-600 focus:outline-none flex-1"
                placeholder="Add Event Location"
                value={editableEvent.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </div>
          </div>
          <div className="bg-black text-white p-6 rounded-xl w-full mt-5">
            {/* Toggle for After Party */}
            <div className="flex items-center gap-3 mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editableEvent.after_party || false}
                  onChange={(e) =>
                    handleInputChange("after_party", e.target.checked)
                  }
                  className="w-4 h-4 accent-blue-500"
                />
                <span>After Party?</span>
              </label>
            </div>

            {/* Location input (only if after_party is true) */}
            {editableEvent.after_party && (
              <div className="flex items-center gap-3">
                <MapPin />
                <input
                  type="text"
                  className="bg-transparent border-b border-gray-600 focus:outline-none flex-1"
                  placeholder="Add After Party Location"
                  value={editableEvent.after_party_location || ""}
                  onChange={(e) =>
                    handleInputChange("after_party_location", e.target.value)
                  }
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-row items-center gap-4 mt-6 w-full">
            <button
              onClick={() => setEditing(!editing)}
              className="border rounded-lg px-6 py-3 cursor-pointer font-semibold flex-1 sm:flex-initial text-center"
            >
              {editing ? "Cancel" : "Edit"}
            </button>
            <div className="relative sm:flex-initial">
              <span className="absolute inset-0 bg-black rounded-lg translate-x-1.5 translate-y-1.5 border-2"></span>
              <button
                onClick={handleSave}
                disabled={saving}
                className="relative w-full text-sm md:text-base font-semibold uppercase cursor-pointer px-4 sm:px-6 py-3 bg-white text-black rounded-lg border-2 border-black shadow-md hover:scale-[1.03] transition-all duration-300 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEvent;
