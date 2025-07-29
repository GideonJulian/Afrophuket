import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
    <div className="fixed top-0 left-0 right-0 z-50 w-full p-8 py-3 flex items-center justify-between text-white  bg-opacity-80 backdrop-blur-md">
  <div>
    <img src="/afrologo.png" alt="Logo" className="w-16" />
  </div>

  {/* Desktop Links */}
  <ul className="hidden md:flex items-center gap-6">
    <li><Link to="#">Discover Events</Link></li>
    <li><Link to="#">About Us</Link></li>
    <li><Link to="#">Contact Us</Link></li>
  </ul>

  {/* Desktop Button */}
  <div className="hidden md:block">
    <button className="px-3 py-3 rounded-lg border border-[#F7F6F2] text-white">
      Find events
    </button>
  </div>

  {/* Mobile Hamburger */}
  <div className="md:hidden">
    <Menu className="w-6 h-6 cursor-pointer" onClick={() => setMenuOpen(true)} />
  </div>
</div>


      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black text-white z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col justify-between`}
      >
        {/* Top Section */}
        <div>
          <div className="flex justify-end p-6">
            <X className="w-6 h-6 cursor-pointer" onClick={() => setMenuOpen(false)} />
          </div>
          <ul className="flex flex-col gap-6 px-6 text-lg">
            <li><Link to="#" onClick={() => setMenuOpen(false)}>Discover Events</Link></li>
            <li><Link to="#" onClick={() => setMenuOpen(false)}>About Us</Link></li>
            <li><Link to="#" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
          </ul>
        </div>

        {/* Bottom Button */}
        <div className="px-6 mb-8">
          <button className="w-full px-3 py-3 rounded-lg border border-[#F7F6F2] text-white">
            Find events
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
