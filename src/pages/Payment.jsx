// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

// const Payment = () => {
//   const cartItems = useSelector((state) => state.cart.items);
//   const subtotal = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: ""
//   });

//   const config = {
//     public_key: "YOUR_FLUTTERWAVE_PUBLIC_KEY", // Replace with your key
//     tx_ref: Date.now(),
//     amount: subtotal,
//     currency: "USD", // or NGN, GHS, etc.
//     payment_options: "card,mobilemoney,ussd",
//     customer: {
//       email: formData.email,
//       phonenumber: formData.phone,
//       name: formData.name,
//     },
//     customizations: {
//       title: "Ticket Payment",
//       description: "Payment for event tickets",
//       logo: "https://your-logo-url.com/logo.png",
//     },
//   };

//   const handleFlutterPayment = useFlutterwave(config);

//   const handlePay = () => {
//     if (!formData.name || !formData.email || !formData.phone) {
//       alert("Please fill all fields");
//       return;
//     }

//     handleFlutterPayment({
//       callback: (response) => {
//         console.log(response);
//         closePaymentModal();
//       },
//       onClose: () => {},
//     });
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Enter Your Details</h1>

//       <input
//         type="text"
//         placeholder="Full Name"
//         className="w-full p-2 border mb-4 rounded"
//         value={formData.name}
//         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//       />

//       <input
//         type="email"
//         placeholder="Email"
//         className="w-full p-2 border mb-4 rounded"
//         value={formData.email}
//         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//       />

//       <input
//         type="tel"
//         placeholder="Phone Number"
//         className="w-full p-2 border mb-4 rounded"
//         value={formData.phone}
//         onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//       />

//       <div className="flex justify-between mt-6 font-bold">
//         <span>Total:</span>
//         <span>${subtotal.toLocaleString()}</span>
//       </div>

//       <button
//         onClick={handlePay}
//         className="w-full mt-6 bg-[#FC6435] text-white p-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
//       >
//         Pay Now
//       </button>
//     </div>
//   );
// };

// export default Payment;
