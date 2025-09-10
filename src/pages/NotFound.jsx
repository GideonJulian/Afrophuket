import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Ghost } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#E55934]/10 text-[#E55934] p-6 rounded-full mb-6"
      >
        <Ghost className="w-20 h-20" />
      </motion.div>

      {/* 404 Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-6xl font-extrabold text-[#E55934] mb-2"
      >
        404
      </motion.h1>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-lg text-gray-300 mb-6 text-center max-w-md"
      >
        Oops! The page you’re looking for doesn’t exist or may have been moved.
      </motion.p>

      {/* Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative inline-block group"
      >
        <span
          className="absolute inset-0 bg-black rounded-lg translate-x-2 translate-y-2 border-2 
           transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0"
        ></span>
        <button
          onClick={() => navigate("/")}
          className="relative w-full inline-block whitespace-nowrap text-sm font-semibold uppercase 
           px-6 py-3 bg-[#E55934] text-white rounded-lg border-2 border-black shadow-md 
           scale-103 transition-all duration-300 group-hover:scale-100"
        >
          Back to Home
        </button>
      </motion.div>
    </div>
  );
};

export default NotFound;
