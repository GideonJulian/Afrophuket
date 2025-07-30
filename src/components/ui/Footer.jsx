import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { BsTiktok } from "react-icons/bs";

export const Footer = () => {
  return (
    <div className="w-full mt-30 px-4">
      {/* Top section */}
      <div className="max-w-[1296px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between border-b-2 pb-7 gap-8">
        <div>
          <img src="/afrologo.png" alt="" className="w-[66px]" />
          <div className="py-6">
            <h2 className="text-sm md:text-base">Contact:</h2>
            <p className="text-sm text-gray-300">info@afrophuket.com</p>
            <div className="flex gap-3 items-center mt-4 text-white">
              <Facebook />
              <Instagram />
              <Twitter />
              <Youtube />
              <BsTiktok className="text-xl" />
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col sm:flex-row sm:gap-20 gap-6 md:gap-40 text-left md:text-left">
          <div>
            <li>
              <Link className="font-semibold text-sm">Home</Link>
            </li>
            <li className="pt-3">
              <Link className="font-semibold text-sm">Events</Link>
            </li>
          </div>
          <div>
            <li>
              <Link className="font-semibold text-sm">About us</Link>
            </li>
            <li className="pt-3">
              <Link className="font-semibold text-sm">Contact Us</Link>
            </li>
          </div>
        </ul>
      </div>

      {/* Bottom section */}
      <div className="max-w-[1296px] mx-auto flex flex-col-reverse  md:flex-row items-left justify-between py-6 text-sm  gap-4">
        <h1>© 2025 AfroPhuket. All rights reserved.</h1>
        <div className="flex gap-3 items-left md:items-left flex-col md:flex-row">
          <Link className="hover:underline">Privacy Policy</Link>
      
          <Link className="hover:underline">Terms & Conditions</Link>
        </div>
      </div>
    </div>
  );
};
