import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { CalendarDays, MapPin, ArrowUpRight, Copy } from "lucide-react";
import { motion } from "framer-motion";
import hostimg from "../assets/images/hostimg.png";
import AfroLoader from "../components/AfroLoader";
import EventMap from "../components/EventMap";

const SingleTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const token = import.meta.env.VITE_API_TOKEN;

    fetch(`https://afrophuket-backend-gr4j.onrender.com/events/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
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

  // Copy to clipboard handler
  const handleCopyLocation = () => {
    navigator.clipboard.writeText(event.location).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) return <AfroLoader />;
  if (error)
    return (
      <p className="text-red-400 text-center py-20">
        {error}{" "}
        <div className="text-white text-center py-20">
          <div className="relative hidden  md:inline-block group mt-4">
            <span
              className="absolute inset-0 bg-black rounded-lg translate-x-2 translate-y-2 border-2 
               transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
            ></span>
            <button
              onClick={() => navigate(-1)}
              className="relative w-full  inline-block whitespace-nowrap text-sm font-semibold uppercase 
               px-6 py-3 bg-white text-black rounded-lg border-2 border-black shadow-md 
               scale-103 transition-all duration-300 group-hover:scale-100"
            >
              DISCOVER MORE
            </button>
          </div>
        </div>
      </p>
    );
  if (!event)
    return <p className="text-red-400 text-center py-20">event not found </p>;

  return (
    <div className="w-full text-white">
      <div className="mx-auto max-w-[1296px] p-4">
        {/* Breadcrumb */}
        <h1 className="text-white text-lg">
          Discover / <span className="text-[#E55934]">{event.title}</span>
        </h1>

        {/* Layout */}
        <div className="mt-10 flex flex-col lg:flex-row gap-13">
          {/* Left Sticky Panel */}
          <div className="lg:w-[40%] w-full lg:sticky lg:top-10 h-fit space-y-6">
            <motion.img
              src={event.thumbnail_url}
              alt={event.title}
              className="rounded-xl w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            />

            {/* Ticket Button (Desktop only) */}
            <div className="relative hidden w-full md:inline-block group mt-4">
              <span
                className="absolute inset-0 bg-black rounded-lg translate-x-2 translate-y-2 border-2 
               transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
              ></span>
              <button
                onClick={() =>
                  navigate(`/payment/${event.id}`, { state: { event } })
                }
                className="relative w-full  inline-block whitespace-nowrap text-sm font-semibold uppercase 
               px-6 py-3 bg-white text-black rounded-lg border-2 border-black shadow-md 
               scale-103 transition-all duration-300 group-hover:scale-100"
              >
                GET A TICKET
              </button>
            </div>

            {/* Host Info */}
            <div className="pt-6">
              <h1 className="text-lg font-semibold">Hosted By</h1>
              <div className="flex items-center gap-3 py-4">
                <img src={hostimg} className="w-10 h-10 rounded-full" />
                <h1>{event.hosted_by}</h1>
                <Link className="ml-auto text-[#E55934] text-sm">
                  Contact the Host
                </Link>
              </div>
            </div>

            {/* Tags */}
            <div className="border border-white rounded-full px-3 py-2 inline-block text-sm">
              # {event.tags?.name}
            </div>
          </div>

          {/* Right Content Section */}
          <motion.div
            className="lg:w-[60%] w-full text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-bold text-3xl md:text-4xl">{event.title}</h1>

            {/* Date & Location */}
            <div className="mt-7 space-y-4">
              <div>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-white/10">
                    <CalendarDays />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-lg">{event.date}</h1>
                    <p>
                      {event.start_time} - {event.end_time}
                    </p>
                  </div>
                </div>
              </div>

              {/* Location with Copy Button */}
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-white/10">
                  <MapPin />
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg">{event.location}</h1>
                  <button
                    onClick={handleCopyLocation}
                    className="text-sm cursor-pointer text-[#E55934] flex items-center gap-1 hover:underline"
                  >
                    <Copy size={16} /> {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-400">
                Copy and paste into Google Maps to get directions.
              </p>
            </div>

            {/* About the Event */}
            <div className="mt-8">
              <h1 className="text-lg font-semibold mb-4">About Event</h1>
              <div className="space-y-5 text-sm leading-relaxed border-t pt-4">
                <p>{event.description}</p>
                <p>
                  Get ready for a night of soul-stirring performances, social
                  conversations and networking.
                </p>
              </div>
            </div>

            {/* After Party Note */}
            {event.after_party && (
              <div className="mt-10">
                <h1 className="text-sm md:text-base">
                  <span className="text-[#E55934] font-bold">NOTE</span>: there
                  will be an after party. Click below for the location!
                </h1>
                <div className="flex gap-4 items-center mt-4 cursor-pointer ">
                  <div className="px-3 py-3 rounded-lg border ">
                    <MapPin />
                  </div>

                  <div>
                    <h1 className="flex items-center gap-2 text-white text-base hover:text-[#E55934] transition-colors duration-300">
                      <span className="text-lg">
                        {event.after_party_location}
                      </span>
                      <ArrowUpRight className="w-4 h-4 " />
                    </h1>
                  </div>
                </div>
              </div>
            )}

            {/* Event Location Section */}
            <div className="mt-10">
              <h1 className="text-lg font-semibold mb-4">Event Location</h1>
              <p className="font-semibold mb-2">{event.location}</p>
              <p className="text-sm">{event.location_notes}</p>
              <div className="mt-4">
                <EventMap location={event.location} />
              </div>

              {/* Ticket Button (Mobile only) */}
              <div className="relative md:hidden w-full inline-block group mt-4">
                <span
                  className="absolute inset-0 bg-black rounded-lg translate-x-2 translate-y-2 border-2 
               transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
                ></span>
                <button
                  onClick={() =>
                    navigate(`/payment/${event.id}`, { state: { event } })
                  }
                  className="relative w-full  inline-block whitespace-nowrap text-sm font-semibold uppercase 
               px-6 py-3 bg-white text-black rounded-lg border-2 border-black shadow-md 
               scale-103 transition-all duration-300 group-hover:scale-100"
                >
                  GET A TICKET
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SingleTicket;
