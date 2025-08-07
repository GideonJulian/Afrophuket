import React from "react";
import contactimg from '../assets/images/contactimg.png'
const ContactUs = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center px-4 py-16">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Side - Form */}
        <div>
          <p className="text-sm font-semibold uppercase mb-2">Get in touch</p>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
            Contact Us
          </h1>
          <p className="text-sm text-gray-400 mb-8 leading-relaxed">
            Have a question? We're here to help. Whether you have a general
            inquiry, a media request, or a partnership idea, fill out the form
            below and we’ll get back to you as soon as possible.
          </p>

          <form className="space-y-6">
            <input
              type="text"
              placeholder="Your name"
              className="w-full bg-transparent border-b border-gray-600 py-3 outline-none placeholder:text-gray-500"
            />
            <input
              type="email"
              placeholder="Your email"
              className="w-full bg-transparent border-b border-gray-600 py-3 outline-none placeholder:text-gray-500"
            />
            <input
              type="text"
              placeholder="Your organization (if applicable)"
              className="w-full bg-transparent border-b border-gray-600 py-3 outline-none placeholder:text-gray-500"
            />
            <div>
              <label className="text-xs text-gray-400">Contact reason</label>
              <input
                type="text"
                placeholder="General Inquiry"
                className="w-full bg-transparent border-b border-gray-600 py-3 outline-none placeholder:text-gray-500"
              />
            </div>
            <textarea
              placeholder="Your message"
              className="w-full bg-transparent border-b border-gray-600 py-3 outline-none placeholder:text-gray-500 resize-none"
              rows="4"
            ></textarea>
            <button
              type="submit"
              className="bg-white text-black font-semibold py-3 px-6 rounded-md border-2 border-black hover:bg-black hover:text-white transition-all"
            >
              SUBMIT
            </button>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block">
          <div className="rounded-t-full overflow-hidden">
            <img
              src={contactimg} // Replace with actual image path
              alt="Contact Visual"
              className="w-full h-auto object-cover rounded-[80px_80px_0_0]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
