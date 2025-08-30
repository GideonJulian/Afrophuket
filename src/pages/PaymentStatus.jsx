import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentStatus = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  // Extract query params from Flutterwave redirect
  const queryParams = new URLSearchParams(search);
  const status = queryParams.get("status");
  const transactionId = queryParams.get("transaction_id");

  const handleVerify = async () => {
    try {
      const res = await axios.get(`/api/payments/verify/${transactionId}/`);
      console.log("Verification response:", res.data);

      if (res.data.status === "success") {
        alert("✅ Payment Verified Successfully!");
        navigate("/confirmation", { state: res.data });
      } else {
        alert("❌ Payment not verified!");
      }
    } catch (err) {
      console.error("Verification error:", err);
      alert("❌ Error verifying payment.");
    }
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-xl font-bold">Payment {status}</h1>
      <p className="mt-2">Transaction ID: {transactionId}</p>

      <button
        onClick={handleVerify}
        className="mt-6 px-6 py-3 bg-black text-white rounded-lg"
      >
        Continue
      </button>
    </div>
  );
};

export default PaymentStatus;
