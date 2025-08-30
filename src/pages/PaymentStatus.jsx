import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Verifying payment...");
  const [ticketMeta, setTicketMeta] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const transactionId = searchParams.get("transaction_id");

        // Load ticket/user data from sessionStorage
        const storedMeta = JSON.parse(sessionStorage.getItem("ticketMeta") || "{}");
        setTicketMeta(storedMeta);

        if (!transactionId) {
          setStatus("❌ No transaction ID found.");
          return;
        }

        const res = await axios.get(
         ' https://afrophuket-backend-gr4j.onrender.com/api/payments/verify/${transactionId}/'
        );

        if (res.data.status === "success") {
          setStatus("✅ Payment Successful!");

          // ✅ Call backend to create TicketPurchase + send PDF
          await axios.post(
            "https://afrophuket-backend-gr4j.onrender.com/api/tickets/complete/",
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
    </div>
  );
};

export default PaymentStatus;