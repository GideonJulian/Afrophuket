import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, ShoppingCart, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full p-8 py-3 flex items-center justify-between text-white bg-opacity-80 backdrop-blur-md">
        <div>
          <img src="/afrologo.png" alt="Logo" className="w-16" />
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-6">
          <li>
            <Link to="#">Discover Events</Link>
          </li>
          <li>
            <Link to="#">About Us</Link>
          </li>
          <li>
            <Link to="#">Contact Us</Link>
          </li>
        </ul>

        {/* Desktop Button */}
        <div className="hidden md:block">
          <button className="px-3 py-3 rounded-lg border border-[#F7F6F2] text-white">
            Find events
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <ShoppingCart color="#ffffff" strokeWidth={3} absoluteStrokeWidth />
          {menuOpen ? (
            <X
              className="w-6 h-6 cursor-pointer md:hidden"
              onClick={() => setMenuOpen(false)}
                color="#ffffff"
              strokeWidth={3}
              absoluteStrokeWidth
            />
          ) : (
            <Menu
              color="#ffffff"
              strokeWidth={3}
              absoluteStrokeWidth
              className="w-6 h-6 cursor-pointer md:hidden"
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Menu (Drop from top, center-aligned, 50% width) */}
      <div
        className={`fixed left-1/2 top-0 z-50 w-[95%] sm:w-[79%] md:w-[55%] max-w-[760px] -translate-x-1/2 bg-black rounded-2xl text-white p-6 py-7 transition-all duration-570 ease-in-out ${
          menuOpen
            ? "translate-y-0 opacity-100 mt-24 "
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="flex justify-end"></div>
        <div className="mt-8 relative">
          <Search className="absolute top-3 text-2xl left-2 " size={24} />
          <input
            placeholder=" Find events"
            className="w-full px-3 py-3 pl-10 rounded-full border border-white text-white placeholder:text-[19px] placeholder:text-white "
          />
        </div>
        <ul className="flex flex-col gap-4 text-lg pt-4 pb-7">
          <li>
            <Link
              className="font-bold text-2xl"
              to="#"
              onClick={() => setMenuOpen(false)}
            >
              DISCOVER EVENTS
            </Link>
          </li>
          <li>
            <Link
              className="font-bold text-2xl"
              to="#"
              onClick={() => setMenuOpen(false)}
            >
              ABOUT US
            </Link>
          </li>
          <li>
            <Link
              className="font-bold text-2xl"
              to="#"
              onClick={() => setMenuOpen(false)}
            >
              CONTACT US
            </Link>
          </li>{" "}
          <li>
            <Link
              className="font-bold text-2xl"
              to="#"
              onClick={() => setMenuOpen(false)}
            >
              SHOP
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
