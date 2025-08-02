import React from "react";

const Button = ({ txt, navigate, width }) => {
  return (
    <div>
      <div className="relative inline-block mt-10">
        <span className="absolute inset-0 bg-black rounded-lg translate-x-2 translate-y-2 border-2 "></span>
        <button
          onClick={() => navigate()}
       className="relative text-sm font-semibold uppercase px-6 py-3 bg-white text-black rounded-lg border-2 border-black shadow-md scale-105 hover:scale-110 transition-all duration-300"
style={{ width: `${width}px` }}

        >
          {txt}
        </button>
      </div>
    </div>
  );
};

export default Button;
