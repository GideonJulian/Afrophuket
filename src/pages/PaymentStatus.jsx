import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Loader2,
  ArrowLeft,
  RefreshCcw,
} from "lucide-react";

const PaymentStatus = () => {
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("Verifying payment...");
  const [ticketMeta] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+234 801 234 5678",
    total: 45000,
    tickets: [
      { name: "VIP Ticket", quantity: 2, subtotal: 30000 },
      { name: "Regular Ticket", quantity: 1, subtotal: 15000 },
    ],
  });

  // Simulate payment verification
  useEffect(() => {
    const timer = setTimeout(() => {
      // Change to "success" or "failed" to see different states
      setStatus("success");
      setMessage("Payment successful!");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-20 h-20 text-green-400" />;
      case "failed":
        return <XCircle className="w-20 h-20 text-red-400" />;
      default:
        return <Loader2 className="w-20 h-20 text-orange-400 animate-spin" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "text-green-400";
      case "failed":
        return "text-red-400";
      default:
        return "text-orange-400";
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute bg-black"></div>

      {/* Animated background elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-2xl opacity-30 animate-pulse delay-500"></div>

      <div className="w-full max-w-lg relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            AFRO<span className="text-orange-500">PHUKET</span>
          </h1>
          <p className="text-gray-400">Payment Processing</p>
        </div>

        {/* Status Card */}
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl shadow-2xl p-8 text-center mb-6">
          <div className="flex justify-center mb-6">{getStatusIcon()}</div>

          <h2 className="text-2xl font-bold text-white mb-3">Payment Status</h2>

          <p className={`text-xl font-semibold ${getStatusColor()}`}>
            {message}
          </p>
        </div>

        {/* Success - Ticket Summary */}
        {ticketMeta && status === "success" && (
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl shadow-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Ticket Summary</h2>
              <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center py-3 px-4 bg-gray-800/50 rounded-xl border border-gray-700/30">
                <span className="text-gray-400 font-medium">Name</span>
                <span className="font-semibold text-white">
                  {ticketMeta.name}
                </span>
              </div>

              <div className="flex justify-between items-center py-3 px-4 bg-gray-800/50 rounded-xl border border-gray-700/30">
                <span className="text-gray-400 font-medium">Email</span>
                <span className="font-semibold text-white">
                  {ticketMeta.email}
                </span>
              </div>

              <div className="flex justify-between items-center py-3 px-4 bg-gray-800/50 rounded-xl border border-gray-700/30">
                <span className="text-gray-400 font-medium">Phone</span>
                <span className="font-semibold text-white">
                  {ticketMeta.phone}
                </span>
              </div>
            </div>

            {/* Tickets List */}
            {ticketMeta.tickets && (
              <div className="mb-6">
                <h3 className="font-bold text-white mb-4 text-lg">
                  Your Tickets
                </h3>
                <div className="space-y-3">
                  {ticketMeta.tickets.map((ticket, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/20"
                    >
                      <span className="text-gray-300 font-medium">
                        {ticket.quantity} × {ticket.name}
                      </span>
                      <span className="font-bold text-white text-lg">
                        ₦{ticket.subtotal.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Total */}
            <div className="flex justify-between items-center py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl mb-6 border border-green-400/30">
              <span className="text-xl font-bold text-white">Total Paid</span>
              <span className="text-2xl font-bold text-white">
                ₦{ticketMeta.total?.toLocaleString()}
              </span>
            </div>

            <button
              onClick={() => navigate("/")}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
            >
              <ArrowLeft className="w-6 h-6" />
              Back to Home
            </button>
          </div>
        )}

        {/* Failed - Retry Button */}
        {status === "failed" && (
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl shadow-2xl p-6">
            <button
              onClick={() => console.log("Navigate to tickets")}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              <RefreshCcw className="w-6 h-6" />
              Retry Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;
