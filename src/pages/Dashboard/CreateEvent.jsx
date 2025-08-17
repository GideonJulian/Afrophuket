import { ChevronLeft, ImagePlus, Menu, Globe, BookText, MapPin } from "lucide-react";
import React, { useState } from "react";
import hostimg from "../../assets/images/hostimg.png";
import { Link, useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ✅ States
  const [eventName, setEventName] = useState("");
  const [banner, setBanner] = useState(null);
  const [bannerFile, setBannerFile] = useState(null); // actual file to upload
  const [saving, setSaving] = useState(false);

  const [editableEvent, setEditableEvent] = useState({
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    description: "",
    location: "",
    after_party: false,
    after_party_location: "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBanner(URL.createObjectURL(file)); // preview
      setBannerFile(file); // actual file for backend
    }
  };

  const handleInputChange = (field, value) => {
    setEditableEvent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("name", eventName);
      formData.append("startDate", editableEvent.startDate);
      formData.append("startTime", editableEvent.startTime);
      formData.append("endDate", editableEvent.endDate);
      formData.append("endTime", editableEvent.endTime);
      formData.append("description", editableEvent.description);
      formData.append("location", editableEvent.location);
      formData.append("after_party", editableEvent.after_party);
      formData.append("after_party_location", editableEvent.after_party_location);

      if (bannerFile) {
        formData.append("banner", bannerFile);
      }

      const response = await fetch("https://afrophuket-backend.onrender.com/events/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to save event");

      const data = await response.json();
      console.log("✅ Event saved:", data);

      alert("Event created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to save event");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="w-full flex items-center justify-between mt-3">
        <button
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <ChevronLeft className="text-gray-600" />
          <h1 className="ml-1 text-sm sm:text-base">Back</h1>
        </button>
        <div className="md:hidden block">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2"
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="mt-10 flex flex-col lg:flex-row items-start gap-10">
        {/* Left - Upload Banner */}
        <div className="w-full lg:w-[442px]">
          <h1 className="font-bold text-xl sm:text-2xl">Event image</h1>
          <p className="text-sm font-extralight">Upload a JPEG or PNG file</p>

          <div className="relative mt-3">
            <div
              className="p-4 rounded-xl h-[330px] flex flex-col items-center justify-center bg-black overflow-hidden"
              style={{
                backgroundImage: banner ? `url(${banner})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {!banner && (
                <label className="cursor-pointer flex flex-col items-center justify-center text-center">
                  <ImagePlus className="h-10 w-10 text-white hover:text-[#E55934]" />
                  <span className="text-[#E55934] text-lg font-medium mt-2">
                    Click to Upload <span className="text-white">Event Banner</span>
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Hosted By */}
          <div className="mt-5">
            <h1 className="border-b pb-4 font-medium">Hosted By</h1>
            <div className="flex items-center gap-3 py-4">
              <img src={hostimg} className="w-10 h-10 rounded-full" />
              <h1 className="font-medium">GAB USA</h1>
              <Link className="ml-auto text-[#E55934] text-sm">
                Contact the Host
              </Link>
            </div>
          </div>
        </div>

        {/* Right - Event Info */}
        <div className="w-full flex-1">
          {/* Editable Event Name */}
          <input
            type="text"
            placeholder="Enter event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="text-2xl sm:text-3xl font-bold focus:outline-none w-full bg-transparent"
          />

          {/* Date & Time Section */}
          {/* ... keep your timeline UI (unchanged) ... */}

          {/* Event Description */}
          <div className="bg-black text-white p-6 rounded-xl w-full mt-5">
            <div className="flex items-center gap-3">
              <BookText />
              <input
                type="text"
                className="bg-transparent border-b border-gray-600 focus:outline-none flex-1"
                placeholder="Add Event Description"
                value={editableEvent.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </div>
          </div>

          {/* Event Location */}
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

          {/* After Party */}
          <div className="bg-black text-white p-6 rounded-xl w-full mt-5">
            <label className="flex items-center gap-2 cursor-pointer mb-4">
              <input
                type="checkbox"
                checked={editableEvent.after_party}
                onChange={(e) => handleInputChange("after_party", e.target.checked)}
                className="w-4 h-4 accent-blue-500"
              />
              <span>After Party?</span>
            </label>
            {editableEvent.after_party && (
              <div className="flex items-center gap-3">
                <MapPin />
                <input
                  type="text"
                  className="bg-transparent border-b border-gray-600 focus:outline-none flex-1"
                  placeholder="Add After Party Location"
                  value={editableEvent.after_party_location}
                  onChange={(e) =>
                    handleInputChange("after_party_location", e.target.value)
                  }
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full">
            <button
              onClick={() => navigate("/dashboard")}
              className="border rounded-lg px-6 py-3 font-semibold text-center w-full sm:w-auto"
            >
              Cancel
            </button>
            <div className="relative w-full sm:w-auto">
              <span className="absolute inset-0 bg-black rounded-lg translate-x-1.5 translate-y-1.5 border-2"></span>
              <button
                onClick={handleSave}
                disabled={saving}
                className="relative w-full text-sm md:text-base font-semibold uppercase px-4 sm:px-6 py-3 bg-white text-black rounded-lg border-2 border-black shadow-md hover:scale-[1.03] transition-all duration-300 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Event"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
