import { ChevronLeft, ImagePlus, Menu, BookText, MapPin } from "lucide-react";
import React, { useState } from "react";
import hostimg from "../../assets/images/hostimg.png";
import { Link, useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // ✅ Event state aligned with backend schema
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    location: "",
    location_notes: "",
    after_party: false,
    after_party_location: "",
    date: "",
    start_time: "",
    end_time: "",
    thumbnail: null, // file upload
    tags: [],
    tickets: [],
  });

  const [bannerPreview, setBannerPreview] = useState(null);

  const handleInputChange = (field, value) => {
    setEventData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerPreview(URL.createObjectURL(file));
      setEventData((prev) => ({ ...prev, thumbnail: file }));
    }
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("title", eventData.title);
      formData.append("description", eventData.description);
      formData.append("location", eventData.location);
      formData.append("location_notes", eventData.location_notes);
      formData.append("after_party", eventData.after_party);
      formData.append("after_party_location", eventData.after_party_location);
      formData.append("date", eventData.date);
      formData.append("start_time", eventData.start_time);
      formData.append("end_time", eventData.end_time);

      if (eventData.thumbnail) {
        formData.append("thumbnail", eventData.thumbnail);
      }

      // Optional: send tags & tickets (array → JSON string for backend parsing)
      formData.append("tags", JSON.stringify(eventData.tags));
      formData.append("tickets", JSON.stringify(eventData.tickets));

      const response = await fetch(
        "https://afrophuket-backend.onrender.com/events/",
        {
          method: "POST",
          body: formData,
        }
      );

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
          onClick={() => navigate("/dashboard")}
          className="flex items-center cursor-pointer"
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

      <div className="mt-10 flex flex-col lg:flex-row items-start gap-10">
        {/* Left: Banner */}
        <div className="w-full lg:w-[442px]">
          <h1 className="font-bold text-xl sm:text-2xl">Event image</h1>
          <p className="text-sm font-extralight">Upload a JPEG or PNG file</p>

          <div className="relative mt-3">
            <div
              className="p-4 rounded-xl h-[330px] flex flex-col items-center justify-center bg-black overflow-hidden"
              style={{
                backgroundImage: bannerPreview
                  ? `url(${bannerPreview})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {!bannerPreview && (
                <label className="cursor-pointer flex flex-col items-center justify-center text-center">
                  <ImagePlus className="h-10 w-10 text-white hover:text-[#E55934]" />
                  <span className="text-[#E55934] text-lg font-medium mt-2">
                    Click to Upload{" "}
                    <span className="text-white">Event Banner</span>
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

        {/* Right: Form */}
        <div className="w-full flex-1">
          {/* Title */}
          <input
            type="text"
            placeholder="Enter event title"
            value={eventData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="text-2xl sm:text-3xl font-bold focus:outline-none w-full bg-transparent"
          />

          {/* Date & Time */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Date & Time</h2>

            <div className="bg-black text-white p-6 rounded-xl w-full">
              <div className="flex flex-col gap-6">
                {/* Timeline UI */}
                <div className="flex items-start gap-4">
                  {/* Timeline dots */}
                  <div className="flex flex-col items-center">
                    <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                    <span className="w-px h-22 md:h-12 border-l border-dashed border-gray-400"></span>
                    <span className="w-3 h-3 rounded-full border-2 border-gray-400"></span>
                  </div>

                  {/* Inputs */}
                  <div className="flex flex-col gap-6 w-full">
                    {/* Start */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                      <span className="text-sm text-gray-300 w-14 shrink-0">
                        Start
                      </span>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
                        <input
                          type="date"
                          placeholder="Select start date"
                          value={eventData.date}
                          onChange={(e) =>
                            handleInputChange("date", e.target.value)
                          }
                          className="bg-transparent text-white border-b border-gray-600 focus:outline-none text-sm w-full sm:w-auto"
                        />
                        <input
                          type="time"
                          placeholder="Start time"
                          value={eventData.start_time}
                          onChange={(e) =>
                            handleInputChange("start_time", e.target.value)
                          }
                          className="bg-transparent text-white border-b border-gray-600 focus:outline-none text-sm w-full sm:w-auto"
                        />
                      </div>
                    </div>

                    {/* End */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                      <span className="text-sm text-gray-300 w-14 shrink-0">
                        End
                      </span>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
                        <input
                          type="date"
                          placeholder="Select end date"
                          value={eventData.date}
                          onChange={(e) =>
                            handleInputChange("date", e.target.value)
                          }
                          className="bg-transparent text-white border-b border-gray-600 focus:outline-none text-sm w-full sm:w-auto"
                        />
                        <input
                          type="time"
                          placeholder="End time"
                          value={eventData.end_time}
                          onChange={(e) =>
                            handleInputChange("end_time", e.target.value)
                          }
                          className="bg-transparent text-white border-b border-gray-600 focus:outline-none text-sm w-full sm:w-auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-black text-white p-6 rounded-xl w-full mt-5">
            <div className="flex items-center gap-3">
              <BookText />
              <input
                type="text"
                placeholder="Add Event Description"
                value={eventData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="bg-transparent border-b border-gray-600 focus:outline-none flex-1"
              />
            </div>
          </div>

          {/* Location */}
          <div className="bg-black text-white p-6 rounded-xl w-full mt-5">
            <div className="flex items-center gap-3">
              <MapPin />
              <input
                type="text"
                placeholder="Add Event Location"
                value={eventData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="bg-transparent border-b border-gray-600 focus:outline-none flex-1"
              />
            </div>
          </div>

          {/* After Party */}
          <div className="bg-black text-white p-6 rounded-xl w-full mt-5">
            <label className="flex items-center gap-2 cursor-pointer mb-4">
              <input
                type="checkbox"
                checked={eventData.after_party}
                onChange={(e) =>
                  handleInputChange("after_party", e.target.checked)
                }
                className="w-4 h-4 accent-blue-500"
              />
              <span>After Party?</span>
            </label>
            {eventData.after_party && (
              <div className="flex items-center gap-3">
                <MapPin />
                <input
                  type="text"
                  placeholder="Add After Party Location"
                  value={eventData.after_party_location}
                  onChange={(e) =>
                    handleInputChange("after_party_location", e.target.value)
                  }
                  className="bg-transparent border-b border-gray-600 focus:outline-none flex-1"
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
