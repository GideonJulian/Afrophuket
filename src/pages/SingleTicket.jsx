import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CalendarDays, MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import hostimg from "../assets/images/hostimg.png";
import Button from "../components/ui/Button";
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
      .then((data) => {
        setEvent(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return <p className="text-white text-center py-20">Loading event...</p>;
  if (error) return <p className="text-red-400 text-center py-20">{error}</p>;
  if (!event)
    return <p className="text-white text-center py-20">Event not found.</p>;

  return (
    <div className="w-full text-white">
      <div className="mx-auto max-w-[1296px] p-4">
        <div>
          <h1 className="text-white text-lg">
            Discover/<span className="text-[#E55934]">{event.event_title}</span>
          </h1>
        </div>
        <div className="flex gap-7 mt-7">
          <div className="left">
            <img src={event.event_thumbnail_url} className="w-[505px]" />
            <div>
              <Button txt={"GET A TICKET"} width={500} />
            </div>
            <div className="py-4">
              <h1>Hosted By </h1>
              <div className="flex items-center gap-3 py-4">
                <img src={hostimg} />
                <h1>GAB USA</h1>
                <Link className="ml-30 text-[#E55934]">Contact the Host</Link>
              </div>
            </div>
            <div className="border border-white rounded-full px-3 py-2 inline">
              # Arts & Culture{" "}
            </div>
          </div>
          <div className="right">
            <div>
              <h1 className="font-bold text-4xl text-white">
                {event.event_title}
              </h1>
              <div className="mt-7">
                <div className="flex gap-4 items-center">
                  <div className="px-3 py-3 rounded-lg bg-[]">
                    {" "}
                    <CalendarDays />
                  </div>
                  <div>
                    <h1 className="text-lg text-white ">{event.event_date}</h1>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="px-3 py-3 rounded-lg bg-[]">
                    {" "}
                    <MapPin />
                  </div>
                  <div>
                    <h1 className="text-lg text-white ">
                      {event.event_location}
                    </h1>
                  </div>
                </div>
              </div>
              <div>
                <div className="mt-6">
                  <h1 className="text-lg">About Event</h1>
                  <div className="mt-4">
                    <p className="py-5">
                      We're thrilled to announce the return of your favorite
                      Griots and Bards (GAB) - an evolving village square where
                      Arts, Spoken Word and Poetry meets opens deep intellectual
                      conversations on social issues.
                    </p>{" "}
                    <p className="py-5">
                      Get ready for a night of soul-stirring performances,
                      social conversations and networking.
                    </p>{" "}
                    <p className="py-5">
                      Please RSVP to join us on the last thursday of every month
                      for an unforgettable experience. See you soon!
                    </p>
                  </div>
                  <div className="mt-7">
                    <h1>
                      <span className="text-[#E55934]">NOTE</span>: there will
                      be and after party, click below for the location!
                    </h1>
                    <div className="flex gap-4 items-center mt-4">
                      <div className="px-3 py-3 rounded-lg border">
                        {" "}
                        <MapPin />
                      </div>
                      <div>
                        <h1 className="flex items-center gap-2">Eco Hotel <ArrowUpRight /></h1>
                        <h1 className="text-lg text-white ">
                          {event.event_location}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTicket;
