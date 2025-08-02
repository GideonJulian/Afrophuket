import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CalendarDays, MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import hostimg from "../assets/images/hostimg.png";
import Button from "../components/ui/Button";
import map from "../assets/images/map.png";
import BrowseTickets from "../components/BrowseTickets";

const SingleTicket = () => {
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

  if (loading) return <p className="text-white text-center py-20">Loading Details...</p>;
  if (error) return <p className="text-red-400 text-center py-20">{error}</p>;
  if (!event) return <p className="text-white text-center py-20">Event not found.</p>;

  return (
    <div className="w-full text-white">
      <div className="mx-auto max-w-[1296px] p-4">
        {/* Breadcrumb */}
        <h1 className="text-white text-lg">
          Discover / <span className="text-[#E55934]">{event.event_title}</span>
        </h1>

        {/* Layout */}
        <div className="mt-10 flex flex-col lg:flex-row gap-10">
          {/* Left Sticky Panel */}
          <div className="lg:w-[40%] w-full lg:sticky lg:top-10 h-fit space-y-6">
            <motion.img
              src={event.event_thumbnail_url}
              alt={event.event_title}
              className="rounded-xl w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            />

            <Button txt="GET A TICKET" width="300" />

            <div className="pt-6">
              <h1 className="text-lg font-semibold">Hosted By</h1>
              <div className="flex items-center gap-3 py-4">
                <img src={hostimg} className="w-10 h-10 rounded-full" />
                <h1>GAB USA</h1>
                <Link className="ml-auto text-[#E55934] text-sm">Contact the Host</Link>
              </div>
            </div>

            <div className="border border-white rounded-full px-3 py-2 inline-block text-sm">
              # Arts & Culture
            </div>
          </div>

          {/* Right Content Section */}
          <motion.div
            className="lg:w-[60%] w-full text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-bold text-3xl md:text-4xl">{event.event_title}</h1>

            {/* Date & Location */}
            <div className="mt-7 space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-white/10">
                  <CalendarDays />
                </div>
                <h1 className="text-lg">{event.event_date}</h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-white/10">
                  <MapPin />
                </div>
                <h1 className="text-lg">{event.event_location}</h1>
              </div>
            </div>

            {/* About the Event */}
            <div className="mt-8">
              <h1 className="text-lg font-semibold mb-4">About Event</h1>
              <div className="space-y-5 text-sm leading-relaxed border-t pt-4">
                <p>
                  We're thrilled to announce the return of your favorite Griots and Bards (GAB) – an evolving village square where Arts, Spoken Word and Poetry meet deep intellectual conversations on social issues.
                </p>
                <p>
                  Get ready for a night of soul-stirring performances, social conversations and networking.
                </p>
                <p>
                  Please RSVP to join us on the last Thursday of every month for an unforgettable experience. See you soon!
                </p>
              </div>
            </div>

            {/* After Party Note */}
            <div className="mt-10">
              <h1 className="text-sm md:text-base">
                <span className="text-[#E55934] font-bold">NOTE</span>: there will be an after party. Click below for the location!
              </h1>
              <div className="flex gap-4 items-center mt-4 cursor-pointer ">
                <div className="px-3 py-3 rounded-lg border ">
                  <MapPin />
                </div>
                <div >
                  <h1 className="flex items-center gap-2 text-white text-base hover:text-[#E55934] transition-colors duration-300">
                    Eco Hotel <ArrowUpRight className="w-4 h-4 " />
                  </h1>
                  <p className="text-sm">{event.event_location}</p>
                </div>
              </div>
            </div>

            {/* Event Location */}
            <div className="mt-10">
              <h1 className="text-lg font-semibold mb-4">Event Location</h1>
              <p className="font-semibold mb-2">Rapjointlagos</p>
              <p className="mb-3">
                4 Norman Williams St, Ikoyi, Lagos 101233, Lagos, Nigeria
              </p>
              <p className="text-sm">
                Please park your vehicle in the Foodco mall opposite if you'll be driving. Mention 'RapJoint' at the gate and you'll be admitted. Thanks!
              </p>

              <div className="mt-4">
                <img src={map} alt="map" className="rounded-lg w-full" />
              </div>
            </div>
          </motion.div>
        </div>
        <div className="mt-20">
          <h1 className="border-b pb-5 text-[#ffffff]"> Other events you may like</h1>
          <h1 className="text-center mt-17">Recommended events will show here </h1>
        </div>
      </div>
    </div>
  );
};

export default SingleTicket;
