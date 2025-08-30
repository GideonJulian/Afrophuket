import { useEffect, useState } from "react";

const PaymentSuccess = () => {
  const [status, setStatus] = useState("Verifying payment...");

  useEffect(() => {
    const transaction_id = new URLSearchParams(window.location.search).get("transaction_id");

    if (!transaction_id) {
      setStatus("Invalid payment link");
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/payments/verify/?transaction_id=${transaction_id}`);
        const data = await res.json();

        if (data?.status === "success") {
          setStatus("✅ Payment successful!");
        } else {
          setStatus("❌ Payment failed or not verified");
        }
      } catch (err) {
        setStatus("⚠️ Error verifying payment");
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-xl font-bold">{status}</h1>
    </div>
  );
};

export default PaymentSuccess;
