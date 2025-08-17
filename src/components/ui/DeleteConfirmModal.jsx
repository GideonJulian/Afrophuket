import React from "react";
import { Trash2 } from "lucide-react";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-[#111111] rounded-2xl p-6 sm:p-10 w-full max-w-md text-center shadow-lg">
        {/* Trash Icon */}
        <div className="flex justify-center mb-4">
          <Trash2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#FC6435]" />
        </div>

        {/* Text */}
        <div className="text-center">
          <h1 className="font-semibold text-sm sm:text-base text-white leading-relaxed">
            Events with orders cannot be deleted.
            Do you still want to proceed with the deletion?
          </h1>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between mt-6 gap-3">
          <button
            onClick={onClose}
            className="w-full border-2  sm:w-1/2 py-2 rounded-md bg-black text-white font-semibold hover:opacity-80 transition"
          >
            Cancel
          </button>

          <div className="relative w-full sm:w-1/2">
            <span className="absolute inset-0 bg-black rounded-lg translate-x-1.5 translate-y-1.5 border-2"></span>
            <button
              onClick={onConfirm}
              className="relative w-full text-xs sm:text-sm md:text-base font-semibold uppercase cursor-pointer px-4 sm:px-6 py-2 sm:py-3 bg-white text-black rounded-lg border-2 border-black shadow-md scale-105 hover:scale-[1.03] transition-all duration-300"
            >
              Delete Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
