import {
  BookText,
  Calendar,
  ChevronLeft,
  CircleAlert,
  Clock,
  Earth,
  Globe,
  MapPin,
  Menu,
  Notebook,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AfroLoader from "../../components/AfroLoader";
import { Link } from "react-router-dom";
import hostimg from "../../assets/images/hostimg.png";
const SingleEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://afrophuket-backend.onrender.com/events/${id}/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Event not found");
        }
        return res.json();
      })
      .then((data) => setEvent(data))
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const navigate = useNavigate();

  if (loading) return <AfroLoader />;
  if (error) return <p className="text-red-400 text-center py-20">{error}</p>;
  if (!event)
    return <p className="text-white text-center py-20">Event not found.</p>;

  // Format date nicely
  const formatDate = (dateStr) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateStr).toLocaleDateString("en-US", options);
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="header md:border-b border-gray-400 pb-4">
        <div className="w-full flex items-center justify-between">
          <button
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <span className="text-gray-600">
              <ChevronLeft />
            </span>
            <h1 className="ml-1 text-sm sm:text-base">Back</h1>
          </button>
          <div className="md:hidden block">
            <Menu />
          </div>
        </div>

        {/* Event Info + Checklist */}
        <div className="w-full flex flex-col lg:flex-row justify-between mt-8 lg:mt-12 gap-6 lg:gap-0">
          {/* Left Side: Event Details */}
          <div>
            <h1 className="font-[700] text-lg sm:text-xl lg:text-[21.7px] mb-5 sm:mb-7">
              {event.title}
            </h1>
            <ul className="flex flex-col gap-4">
              {/* Date */}
              <div className="flex gap-2 items-center">
                <span className="text-gray-600">
                  <Calendar size={20} />
                </span>
                <h1 className="text-sm sm:text-[14px]">
                  {formatDate(event.date)}
                </h1>
              </div>
              {/* Time */}
              <div className="flex gap-2 items-center">
                <span className="text-gray-600">
                  <Clock size={20} />
                </span>
                <h1 className="text-sm sm:text-[14px]">
                  {event.start_time} - {event.end_time} WAT
                </h1>
              </div>
              {/* Location */}
              <div className="flex gap-2 items-center">
                <span className="text-gray-600">
                  <MapPin size={20} />
                </span>
                <h1 className="text-sm sm:text-[14px]">{event.location}</h1>
              </div>
            </ul>
          </div>

          {/* Right Side: Checklist */}
          <div className="bg-black text-white px-4 sm:px-6 lg:px-8 rounded-xl lg:rounded-2xl py-4 max-w-full sm:max-w-md">
            <div className="flex gap-3 mb-3">
              <CircleAlert size={20} className="flex-shrink-0" />
              <h1 className="text-sm sm:text-[14px]">
                Things to do before you publish your event:
              </h1>
            </div>
            {/* Checklist item */}
            {event.tickets.length === 0 ? (
              <li className="text-[#E55934] text-sm sm:text-[14px]">
                Create some tickets
              </li>
            ) : (
              <li className="text-green-400 text-sm sm:text-[14px]">
                ✅ Tickets available
              </li>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 flex items-center gap-10">
        <div className="left">
          <div>
            <h1 className="font-bold text-2xl">Event image</h1>
            <p className="text-sm font-extralight">upload a JPEG or PNG file</p>
          </div>
          <div className="mt-10">
            <img src={event.thumbnail_url} className="rounded-4xl w-[442px]" />
          </div>
          <div className="mt-5">
            <h1 className="border-b pb-8 ">Hosted By </h1>
            <div className="flex items-center gap-3 py-4">
              <img src={hostimg} className="w-10 h-10 rounded-full" />
              <h1>GAB USA</h1>
              <Link className="ml-auto text-[#E55934] text-sm">
                Contact the Host
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div>
            <h1 className="text-2xl font-bold">Event Name </h1>
          </div>
          <div className="flex items-center gap-5">
            <div className="bg-black text-white p-6 rounded-xl w-fit">
              <div className="flex items-start gap-2">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  {/* Start dot */}
                  <span className="w-3 h-3 rounded-full bg-gray-400"></span>
                  {/* Dotted line */}
                  <span className="w-px h-8 border-l border-dashed border-gray-400"></span>
                  <span className="w-px h-3 border-l border-dashed border-gray-400"></span>
                  {/* End dot */}
                  <span className="w-3 h-3 rounded-full border-2 border-gray-400"></span>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-6">
                  {/* Start */}
                  <div className="flex items-center gap-8">
                    <span className="text-gray-300 w-12">Start</span>
                    <span className="text-sm text-gray-200">Tue, 12 Aug</span>
                    <span className="text-sm text-gray-200">02:00 PM</span>
                  </div>

                  {/* End */}
                  <div className="flex items-center gap-8">
                    <span className="text-gray-300 w-12">End</span>
                    <span className="text-sm text-gray-200">Tue, 12 Aug</span>
                    <span className="text-sm text-gray-200">03:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-black text-white px-5 py-3 rounded-2xl w-fit flex flex-col items-start gap-4 shadow-md">
              {/* Icon */}
              <div className="bg-[#E55934] p-2 rounded-full flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>

              {/* Text */}
              <div className="flex flex-col">
                <h1 className="text-sm text-gray-400">GMT-07:00</h1>
                <h1 className="text-lg ">Los Angeles</h1>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-black text-white p-6 rounded-xl w-full mt-5">
              <div className="flex items-center gap-3">
                <BookText />
                Add Event Description
              </div>
            </div>{" "}
            <div className="bg-black text-white p-6 rounded-xl w-full mt-5">
              <div className="flex items-center gap-3">
                <MapPin />
                Add Event Location
              </div>
            </div>
            <div>
              <h1 className="text-lg mt-3">Event option</h1>
              <div className="bg-black text-white p-6 rounded-xl w-full mt-2">
                <div className="flex items-center gap-3">
                  <MapPin />
                  Add After party location
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="border rounded-lg px-3 py-2 font-semibold">
                Edit
              </button>
              <div className="relative w-full sm:w-auto">
                <span className="absolute inset-0 bg-black rounded-lg translate-x-1.5 translate-y-1.5 border-2"></span>
                <button
                  onClick={() => navigate("/create-event")}
                  className="relative w-full sm:w-auto text-xs sm:text-sm md:text-base font-semibold uppercase cursor-pointer px-4 sm:px-6 py-2 sm:py-3 bg-white text-black rounded-lg border-2 border-black shadow-md scale-105 hover:scale-[1.03] transition-all duration-300"
                >
                 SAVE CHANGES
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEvent;
