import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

const PaymentStatus = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  // Extract query params from Flutterwave redirect
  const queryParams = new URLSearchParams(search);
  const status = queryParams.get("status");
  const transactionId = queryParams.get("transaction_id");

  const [loading, setLoading] = React.useState(false);

  const handleVerify = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/payments/verify/${transactionId}/`);
      console.log("Verification response:", res.data);

      navigate('/')
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
      </div>
    </div>
  );
};

export default PaymentStatus;
