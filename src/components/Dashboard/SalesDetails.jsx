import React from "react";
import { Ticket } from "lucide-react";

const SalesDetails = ({ data, loading, error }) => {
  if (loading) return <p className="text-gray-400">Loading sales…</p>;
  if (error) return <p className="text-red-400">{error}</p>;
  if (!data) return null;

  // --- derive an overall total if data.types exists ---
  let overallTotal = 0;
  let overallSold = data.ticketSold || 0;
  if (Array.isArray(data.types)) {
    overallTotal = data.types.reduce((sum, t) => sum + (t.total || 0), 0);
    // fall back to computed sum if ticketSold is not set
    if (!overallSold) {
      overallSold = data.types.reduce((sum, t) => sum + (t.sold || 0), 0);
    }
  }
  const overallPercent =
    overallTotal > 0 ? Math.min((overallSold / overallTotal) * 100, 100) : 0;

  return (
    <div className="p-0 sm:p-3 mt-5">
      {/* ===== Summary cards ===== */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-black rounded-2xl p-5 flex flex-col items-start">
          <h1 className="font-bold text-2xl text-[#E55934]">{data.ticketSold}</h1>
          <h1 className="text-lg font-bold text-white">Ticket Sold</h1>
        </div>

        <div className="bg-black rounded-2xl p-5 flex flex-col items-start">
          <h1 className="font-bold text-2xl text-[#E55934]">
            {data.ticketScanned}
          </h1>
          <h1 className="text-lg font-bold text-white">Ticket Scanned</h1>
        </div>

        <div className="bg-black rounded-2xl p-5 col-span-2 md:col-span-1 flex flex-col items-start">
          <h1 className="font-bold text-2xl text-[#E55934]">{data.notScanned}</h1>
          <h1 className="text-lg font-bold text-white">Not Scanned</h1>
        </div>
      </div>

      {/* ===== Overall progress bar ===== */}
      {overallTotal > 0 && (
        <div className="mt-8">
          <div className="flex justify-between mb-1 text-sm text-gray-300">
            <span>Total Tickets Sold</span>
            <span>
              {overallSold}/{overallTotal}
            </span>
          </div>
          <div className="w-full h-4 bg-[#1f1f1f] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#E55934] rounded-full transition-all duration-500"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* ===== Ticket-type SOLD progress bars ===== */}
      <div className="flex flex-col gap-10 mt-10">
        {Array.isArray(data.name) &&
          data.types.map((t) => {
            const percent =
              t.total > 0 ? Math.min((t.sold / t.total) * 100, 100) : 0;

            return (
              <div
                key={t.type}
                className="flex flex-col md:flex-row items-start md:items-center gap-6"
              >
                {/* Badge / ticket type */}
                <div className="bg-[#FFF2ED] rounded-full px-3 py-1 flex items-center gap-2 text-[#E55934] font-semibold">
                  <Ticket className="w-4 h-4" />
                  {t.name}
                </div>

                {/* Counts + progress bar */}
                <div>
                  <div className="mt-2">
                    <h1 className="font-bold text-lg text-white">
                      {t.sold}/{t.total}
                    </h1>
                    <p className="text-sm text-gray-300">Ticket Sold</p>
                  </div>

                  <div className="w-full md:w-[357px] h-3 rounded-full bg-[#1f1f1f] mt-3 overflow-hidden">
                    <div
                      className="h-full bg-[#E55934] rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SalesDetails;
