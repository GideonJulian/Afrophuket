import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import { Footer } from "../components/ui/Footer";

const CheckLayout = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <Outlet />
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CheckLayout;
