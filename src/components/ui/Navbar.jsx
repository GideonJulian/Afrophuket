import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = ({ openCart }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.length

  const navLinks = [
    { text: "DISCOVER EVENTS", path: "/event" },
    { text: "ABOUT US", path: "/about" },
    { text: "CONTACT US", path: "/contact" },
    { text: "SHOP", path: "/shop" },
  ];
  return (
    <>
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 w-full p-10 py-6 flex items-center justify-between text-white bg-opacity-80 backdrop-blur-md">
        {/* Logo */}
        <div>
          <Link to="/">
            <img src="/afrologo.png" alt="Logo" className="w-16" />
          </Link>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center justify-center ml-40 gap-6">
          <li>
            <Link
              to="/event"
              className="hover:text-[#E55934] transition-colors duration-300"
            >
              Discover Events
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-[#E55934] transition-colors duration-300"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-[#E55934] transition-colors duration-300"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to="/shop"
              className="hover:text-[#E55934] transition-colors duration-300"
            >
              Shop
            </Link>
          </li>
        </ul>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-4">
          {/* Desktop: Button + Cart */}
          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <ShoppingCart
                color="#ffffff"
                strokeWidth={3}
                absoluteStrokeWidth
                onClick={openCart}
                className="cursor-pointer"
              />
              {totalItems > 0 && (
                <span
                  onClick={openCart}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full"
                >
                  {totalItems}
                </span>
              )}
            </div>

            <div className="relative">
              <Search className="absolute top-[13px] left-3" size={18} />
              <input
                className="px-2 py-2 rounded-full border pl-10 placeholder:text-white border-[#F7F6F2] text-white"
                placeholder="Find events..."
              />
            </div>
          </div>

          {/* Mobile: Cart + Menu Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <div className="relative">
              <ShoppingCart
                color="#ffffff"
                strokeWidth={3}
                absoluteStrokeWidth
                onClick={openCart}
                className="cursor-pointer"
              />
              {totalItems > 0 && (
                <span
                  onClick={openCart}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full"
                >
                  {totalItems}
                </span>
              )}
            </div>

            {menuOpen ? (
              <X
                className="w-6 h-6 cursor-pointer"
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
                className="w-6 h-6 cursor-pointer"
                onClick={() => setMenuOpen(true)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed left-1/2 top-[20vh] z-50 w-[95%] sm:w-[79%] md:w-[55%] max-w-[760px] -translate-x-1/2 bg-black rounded-2xl text-white overflow-hidden origin-top transition-all duration-500 ease-in-out ${
          menuOpen ? "h-[400px] opacity-100 -mt-14" : "h-0 opacity-0"
        }`}
      >
        <div
          className={`transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          } p-6 py-7`}
        >
          <div className="mt-8 relative">
            <Search className="absolute top-3 left-2" size={24} />
            <input
              placeholder=" Find events"
              className="w-full px-3 py-3 pl-10 rounded-full border border-white text-white placeholder:text-[19px] placeholder:text-white bg-transparent"
            />
          </div>

          <ul className="flex flex-col gap-4 text-lg pt-4 pb-7">
            {navLinks.map(({ text, path }) => (
              <li key={text}>
                <Link
                  to={path}
                  className="font-bold text-2xl"
                  onClick={() => setMenuOpen(false)}
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
