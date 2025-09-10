import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Loader2, ArrowLeft } from "lucide-react";
import axios from "axios";

const PaymentStatus = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // "verifying" | "success" | "failed"
  const [message, setMessage] = useState("Verifying payment...");
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const transaction_id = params.get("transaction_id");

    const verifyPayment = async () => {
      if (!transaction_id) {
        // fallback to sessionStorage if available
        const saved = sessionStorage.getItem("paymentMeta");
        if (saved) {
          const data = JSON.parse(saved);
          setSelection({
            name: data.name,
            email: data.email,
            phone: data.phone,
            items: data.items || [],
            total: data.total,
            eventName: data.eventName || "Your Purchase",
          });
          setStatus("success");
          setMessage("Payment data loaded from previous session.");
        } else {
          setStatus("failed");
          setMessage("No payment information found.");
        }
        return;
      }

      try {
        setStatus("verifying");
        setMessage("Verifying payment with backend...");

        const res = await axios.get(
          `https://afrophuket-backend-gr4j.onrender.com/api/payments/verify/?transaction_id=${transaction_id}`
        );

        const data = res.data.data;
        if (res.data.verified && data?.metadata) {
          const items = data.metadata?.tickets || data.metadata?.products || [];
          const buyer_name = data.metadata?.buyer_name || "";
          const buyer_email = data.metadata?.buyer_email || "";
          const buyer_phone = data.metadata?.buyer_phone || "";

          setSelection({
            name: buyer_name,
            email: buyer_email,
            phone: buyer_phone,
            items,
            total: data.amount,
            eventName: data.metadata?.event_id
              ? `Event #${data.metadata.event_id}`
              : "Your Purchase",
          });
          setStatus("success");
          setMessage("Payment successful!");
        } else {
          // fallback to sessionStorage if backend fails
          const saved = sessionStorage.getItem("paymentMeta");
          if (saved) {
            const data = JSON.parse(saved);
            setSelection({
              name: data.name,
              email: data.email,
              phone: data.phone,
              items: data.items || [],
              total: data.total,
              eventName: data.eventName || "Your Purchase",
            });
            setStatus("success");
            setMessage("Payment verified via previous session data.");
          } else {
            setStatus("failed");
            setMessage("Payment verification failed!");
          }
        }
      } catch (err) {
        console.error("Payment verification error:", err);

        // fallback to sessionStorage if network/backend fails
        const saved = sessionStorage.getItem("paymentMeta");
        if (saved) {
          const data = JSON.parse(saved);
          setSelection({
            name: data.name,
            email: data.email,
            phone: data.phone,
            items: data.items || [],
            total: data.total,
            eventName: data.eventName || "Your Purchase",
          });
          setStatus("success");
          setMessage("Payment loaded from previous session (network error).");
        } else {
          setStatus("failed");
          setMessage("Payment verification failed!");
        }
      }
    };

    verifyPayment();
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
      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            AFRO<span className="text-orange-500">PHUKET</span>
          </h1>
          <p className="text-gray-400">Payment Processing</p>
        </div>

        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl shadow-2xl p-8 text-center mb-6">
          <div className="flex justify-center mb-6">{getStatusIcon()}</div>
          <h2 className="text-2xl font-bold text-white mb-3">Payment Status</h2>
          <p className={`text-xl font-semibold ${getStatusColor()}`}>
            {message}
          </p>
          {
            
          }
        </div>

        {status === "success" && selection && (
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl shadow-2xl p-6 mb-6">
            {selection.name && (
              <div className="space-y-4 mb-6">
                {["Name", "Email", "Phone"].map((field) => (
                  <div
                    key={field}
                    className="flex justify-between items-center py-3 px-4 bg-gray-800/50 rounded-xl border border-gray-700/30"
                  >
                    <span className="text-gray-400 font-medium">{field}</span>
                    <span className="font-semibold text-white">
                      {selection[field.toLowerCase()]}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {selection.items.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold text-white mb-4 text-lg">
                  Your Items
                </h3>
                <div className="space-y-3">
                  {selection.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/20"
                    >
                      <span className="text-gray-300 font-medium">
                        {item.quantity} × {item.name}
                      </span>
                      <span className="font-bold text-white text-lg">
                        ₦
                        {item.subtotal?.toLocaleString() ||
                          (item.price * item.quantity)?.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl mb-6 border border-green-400/30">
              <span className="text-xl font-bold text-white">Total Paid</span>
              <span className="text-2xl font-bold text-white">
                ₦{selection.total?.toLocaleString()}
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

        {status === "failed" && (
          <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl shadow-2xl p-6">
            <button
              onClick={() => navigate(-1)}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              Retry Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;
