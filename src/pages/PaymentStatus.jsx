import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

const PaymentStatus = () => {
  const { search, state } = useLocation();
  const navigate = useNavigate();

  // Extract query params from Flutterwave redirect
  const queryParams = new URLSearchParams(search);
  const status = queryParams.get("status"); // "successful" or "failed"
  const transactionId = queryParams.get("transaction_id");

  const [loading, setLoading] = React.useState(false);

  const baseURL = "https://afrophuket-backend-gr4j.onrender.com";

  const handleVerify = async () => {
    setLoading(true);
    try {
      // ================================
      // 1. Verify payment with backend
      // ================================
      const verifyRes = await axios.get(
        `${baseURL}/api/payments/verify/`,
        {
          params: { transaction_id: transactionId }, 
        }
      );

      console.log("Verification response:", verifyRes.data);

      if (verifyRes.status === 200 && verifyRes.data.verified) {
        // ================================
        // 2. Post ticket purchase
        // ================================
        const payload = {
          ticket: state?.ticketId || 1, // you should pass this from previous page
          purchase_price: state?.price || "0.00",
        };

        const purchaseRes = await axios.post(
      `    ${baseURL}/events/ticket-purchases/`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Ticket purchase response:", purchaseRes.data);

        // ================================
        // 3. Fetch ticket details
        // ================================
        const ticketId = purchaseRes.data.ticket;
        const ticketRes = await axios.get(
        `  ${baseURL}/events/tickets/${ticketId}/`
        );

        console.log("Ticket details:", ticketRes.data);

        // ================================
        // 4. Redirect to confirmation page
        // ================================
        navigate("/confirmation", {
          state: {
            purchase: purchaseRes.data,
            ticket: ticketRes.data,
          },
        });
      } else {
        alert("❌ Payment not verified!");
      }
    } catch (err) {
      console.error("Verification error:", err);
      alert("❌ Error verifying payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center">
        {/* Status Icon */}
        <div className="flex justify-center mb-6">
          {status === "successful" ? (
            <CheckCircle2 className="text-green-500 w-16 h-16" />
          ) : (
            <XCircle className="text-red-500 w-16 h-16" />
          )}
        </div>

        {/* Status Text */}
        <h1 className="text-2xl font-bold mb-2">
          Payment {status === "successful" ? "Successful" : "Failed"}
        </h1>
        <p className="text-gray-600">
          Transaction ID:{" "}
          <span className="font-mono font-medium">{transactionId}</span>
        </p>

        {/* Continue Button */}
        {status === "successful" && (
          <button
            onClick={handleVerify}
            disabled={loading}
            className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold 
            bg-black text-white hover:bg-gray-800 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Verifying...
              </>
            ) : (
              "Continue"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;