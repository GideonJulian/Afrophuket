import React, { useState } from "react";
import { Menu, MoreVertical } from "lucide-react";

const TicketsList = ({
  tickets = [],
  handleNavigate,
  handleDelete,
  handleSoldOut,
}) => {
  const [openMenuId, setOpenMenuId] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="p-4 sm:p-3">
      {/* Header Section */}
      <div className="flex head items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Edit Tickets</h1>
          <p className="mt-3 text-md text-gray-300">
            View and edit your ticket information
          </p>
        </div>
        <div className="relative w-full sm:w-auto">
          <span className="absolute inset-0 bg-black rounded-lg translate-x-1.5 translate-y-1.5 border-2"></span>
          <button
            onClick={handleNavigate}
            className="relative w-full sm:w-auto text-xs sm:text-sm md:text-base font-semibold uppercase cursor-pointer px-4 sm:px-6 py-2 sm:py-3 bg-white text-black rounded-lg border-2 border-black shadow-md scale-105 hover:scale-[1.03] transition-all duration-300"
          >
            + ADD TICKET
          </button>
        </div>
      </div>

      {/* Table Header (desktop only) */}
      <div className="mt-6 hidden sm:grid grid-cols-5 bg-black/30 border border-[#F5F5F614] text-white rounded-md px-4 py-7 text-sm font-semibold">
        <span className="col-span-2">Ticket Name</span>
        <span className="text-center">Tickets Sold</span>
        <span className="text-center">Price</span>
        <span className="text-center">Limit</span>
      </div>

      {/* Ticket Rows */}
      <div className="space-y-3 mt-6">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="relative flex flex-col sm:grid sm:grid-cols-5 border border-[#F5F5F614] bg-black text-white p-6 rounded-md shadow-sm gap-3"
            >
              {/* --- Mobile Layout --- */}
              <div className="flex flex-col gap-3 sm:hidden">
                {/* Row 1: Name + Price */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    {/* <Menu className="w-5 h-5 text-gray-400 shrink-0" /> */}
                    <span className="text-sm font-medium">{ticket?.name}</span>
                  </div>
                  <span className="text-sm font-semibold">
                    ${parseFloat(ticket?.price).toLocaleString()}
                  </span>
                </div>

                {/* Row 2: Sold + Actions */}
                <div className="flex justify-between items-center relative">
                  <span className="text-sm text-gray-300">
                    {ticket?.quantity_sold}/{ticket?.quantity_available} Sold

                  </span>
                  <div className="flex items-center gap-2">
                    <button className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded">
                      Max {ticket?.max_per_customer}
                    </button>
                    {ticket?.is_refundable && (
                      <span className="text-green-400 text-xs font-semibold">
                        Refundable
                      </span>
                    )}

                    {/* Dropdown Trigger */}
                    <div className="relative">
                      <MoreVertical
                        className="w-5 h-5 text-orange-500 cursor-pointer"
                        onClick={() => toggleMenu(ticket.id)}
                      />
                      {openMenuId === ticket.id && (
                        <div className="absolute right-0 mt-2 w-40 bg-black text-white rounded-lg shadow-lg border border-gray-700 z-50">
                          <button
                            onClick={() => {
                              handleDelete(ticket.id);
                              setOpenMenuId(null);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-800"
                          >
                            Delete Ticket
                          </button>
                          <button
                            onClick={() => {
                              handleSoldOut(ticket.id);
                              setOpenMenuId(null);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-800"
                          >
                            Mark as Sold Out
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* --- Desktop Layout --- */}
              <div className="hidden sm:contents">
                <div className="flex items-center gap-3 col-span-2">
                  <Menu className="w-5 h-5 text-gray-400 shrink-0" />
                  <span className="text-sm font-medium">{ticket?.name}</span>
                </div>
                <span className="text-sm text-gray-300 sm:text-center">
                  {ticket?.quantity_sold}/{ticket?.quantity_available} Sold
                </span>
                <span className="text-sm font-semibold sm:text-center">
                  ${parseFloat(ticket?.price).toLocaleString()}
                </span>
                <div className="flex items-center gap-2 sm:justify-center relative">
                  <button className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded">
                    Max {ticket?.max_per_customer}
                  </button>
                  {ticket?.is_refundable && (
                    <span className="text-green-400 text-xs font-semibold">
                      Refundable
                    </span>
                  )}

                  {/* Dropdown Trigger */}
                  <div className="relative">
                    <MoreVertical
                      className="w-5 h-5 text-orange-500 cursor-pointer"
                      onClick={() => toggleMenu(ticket.id)}
                    />
                    {openMenuId === ticket.id && (
                      <div className="absolute right-0 mt-2 w-40 bg-black text-white rounded-lg shadow-lg border border-gray-700 z-50">
                        <button
                          onClick={() => {
                            handleDelete(ticket.id);
                            setOpenMenuId(null);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-800"
                        >
                          Delete Ticket
                        </button>
                        <button
                          onClick={() => {
                            handleSoldOut(ticket.id);
                            setOpenMenuId(null);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-800"
                        >
                          Mark as Sold Out
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm italic">No tickets available.</p>
        )}
      </div>
    </div>
  );
};

export default TicketsList;
