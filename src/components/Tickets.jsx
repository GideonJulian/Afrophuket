import React from "react";
import event4 from "../assets/images/events/event4.png";
import { Calendar, MapPin } from "lucide-react";
const Tickets = () => {
  const ticketsData = [
    {
      name: "Tribe Pool Party",
      date: "Sat, Aug 2nd, 12PM",
      location: "TRIBE Sky Beach Club",
      price: "$6,580",
      img: event4,
    },
    {
      name: "Tribe Pool Party",
      date: "Sat, Aug 2nd, 12PM",
      location: "TRIBE Sky Beach Club",
      price: "$6,580",
      img: event4,
    },
    {
      name: "Tribe Pool Party",
      date: "Sat, Aug 2nd, 12PM",
      location: "TRIBE Sky Beach Club",
      price: "$6,580",
      img: event4,
    },
    {
      name: "Tribe Pool Party",
      date: "Sat, Aug 2nd, 12PM",
      location: "TRIBE Sky Beach Club",
      price: "$6,580",
      img: event4,
    },
  ];
  return (
    <div className="w-full">
      <div className="max-w-[1296px] mx-auto">
        <div>
          <p className="text-[#F7F6F2]">Browse Events</p>
          <h1 className="font-bold text-2xl py-3">Lagos</h1>
          <div className="flex items-center gap-4">
            <button className="rounded-full border px-3 py-1 ">
              Change Location{" "}
            </button>{" "}
            <button className="rounded-full border px-3 py-1 ">
              Filter by Date{" "}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 my-5">
            {
                ticketsData.map(items=> (
                    <div className="bg-[#000] p-4 flex items-center justify-between">
                         <div>
                            <h1 className="font-bold text-white">{items.name}</h1>
                            <h2 className="flex items-center gap-2">
                                <span><Calendar /> </span>
                                {items.date}
                            </h2>
                              <h2 className="flex items-center gap-2 py-2">
                                <span><MapPin /></span>
                                {items.date}
                            </h2>
                            <h2 className="mt-10 text-[#FC6435]">
                                {items.price }
                            </h2>
                         </div>
                         <div>
                            <img src={items.img} />
                         </div>
                    </div>
                ))
            }
        </div>
      </div>
    </div>
  );
};

export default Tickets;
