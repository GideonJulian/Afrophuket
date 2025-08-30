import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Verifying payment...");
  const [ticketMeta, setTicketMeta] = useState(null); // ✅ fixed
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const transactionId = searchParams.get("transaction_id");

        // Load ticket/user data from sessionStorage
        const storedMeta = JSON.parse(
          sessionStorage.getItem("ticketMeta") || "{}"
        );
        setTicketMeta(storedMeta);

        console.log("Transaction ID from URL:", transactionId);

        if (!transactionId) {
          setStatus("❌ No transaction ID found.");
          return;
        }

        // ✅ Correct verify endpoint with query params
        const res = await axios.get(
          "https://afrophuket-backend-gr4j.onrender.com/api/payments/verify/",
          { params: { transaction_id: transactionId } }
        );

        console.log("Verification response:", res.data);

        if (res.data.verified) {
          setStatus("✅ Payment Successful!");

          // ✅ Call backend to finalize ticket purchase
          await axios.post(
            "https://afrophuket-backend-gr4j.onrender.com/events/tickets/complete/",
            {
              transaction_id: transactionId,
              ...storedMeta,
            }
          );
        } else {
          setStatus("❌ Payment Failed or Expired.");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("❌ Error verifying payment.");
      }
    };

    fetchStatus();
  }, [searchParams]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Payment Status</h1>
      <p className="text-lg">{status}</p>

      {/* Show ticket summary if success */}
      {ticketMeta && status.startsWith("✅") && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg inline-block text-left">
          <h2 className="font-bold">Ticket Summary</h2>
          <p>
            <strong>Name:</strong> {ticketMeta.name}
          </p>
          <p>
            <strong>Email:</strong> {ticketMeta.email}
          </p>
          <p>
            <strong>Phone:</strong> {ticketMeta.phone}
          </p>
          <p>
            <strong>Total Paid:</strong> ₦{ticketMeta.total?.toLocaleString()}
          </p>

          <div className="mt-3">
            <h3 className="font-semibold">Tickets:</h3>
            {ticketMeta.tickets?.map((t, i) => (
              <p key={i}>
                {t.quantity} × {t.name} (₦{t.subtotal.toLocaleString()})
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Retry button if failed */}
      {status.startsWith("❌") && (
        <div className="mt-6">
          <button
            onClick={() => navigate("/tickets")}
            className="px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-all"
          >
            Retry Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentStatus;
