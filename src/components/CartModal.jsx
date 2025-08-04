import React from "react";

const CartModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-60"
      onClick={onClose}
    >
      <div
        className="bg-white text-black p-6 rounded-lg w-full max-w-md transform transition duration-300 scale-100"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Cart</h2>
          <button onClick={onClose} className="text-black text-lg">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default CartModal;

