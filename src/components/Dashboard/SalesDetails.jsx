import { Ticket } from "lucide-react";
import React from "react";

const SalesDetails = () => {
  const dummySalesData = [
    {
      ticketSold: 1000,
      ticketScanned: 800,
      notScanned: 200,
    },
  ];

  return (
    <div className="p-0 sm:p-3 mt-5">
      <div>
        {dummySalesData.map((item, index) => (
          <div key={index} className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* First Box */}
            <div className="bg-black rounded-2xl p-5">
              <h1 className="font-bold text-2xl text-[#E55934]">
                {item.ticketSold}
              </h1>
              <h1 className="text-lg font-bold">Ticket Sold</h1>
            </div>

            {/* Second Box */}
            <div className="bg-black rounded-2xl p-5">
              <h1 className="font-bold text-2xl text-[#E55934]">
                {item.ticketScanned}
              </h1>
              <h1 className="text-lg font-bold">Ticket Scanned</h1>
            </div>

            {/* Third Box - full width only on mobile */}
            <div className="bg-black rounded-2xl p-5 col-span-2 md:col-span-1">
              <h1 className="font-bold text-2xl text-[#E55934]">
                {item.notScanned}
              </h1>
              <h1 className="text-lg font-bold">Not Scanned</h1>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row mt-10 items-start md:items-center gap-10">
        {/* Early Birds */}
        <div className="w-full md:w-auto">
          <div className="bg-[#FFEFEA] rounded-full px-3 py-2 flex items-center gap-3 text-[#E55934] font-bold w-fit">
            <Ticket />
            <h1>Early Birds</h1>
          </div>
          <div className="mt-4">
            <h1 className="font-bold text-lg">400/500</h1>
            <p>Ticket Scanned</p>
          </div>
          <div className="w-full md:w-[357px] rounded-full bg-white/8 h-[11px] mt-3">
            <div className="h-full bg-[#E55934] w-[50%] rounded-full"></div>
          </div>
        </div>

        {/* VIP */}
        <div className="w-full md:w-auto">
          <div className="bg-[#FFEFEA] rounded-full px-3 py-2 flex items-center gap-3 text-[#E55934] font-bold w-fit">
            <Ticket />
            <h1>Vip</h1>
          </div>
          <div className="mt-4">
            <h1 className="font-bold text-lg">400/500</h1>
            <p>Ticket Scanned</p>
          </div>
          <div className="w-full md:w-[357px] rounded-full bg-white/8 h-[11px] mt-3">
            <div className="h-full bg-[#E55934] w-[50%] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDetails;
