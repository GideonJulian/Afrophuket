import React from "react";
import Events from "../components/Dashboard/Events";
import img from "../assets/images/events/event1.png";

const Dashboard = () => {
  const demoData = [
    {
      id: 1,
      title: "Amapiano Night",
      event_date: "Sat, Aug 25 2025",
      thumbnail_url: img,
      ticket_sold: 20,
    },
    {
      id: 2,
      title: "Lagos Summer Fest",
      event_date: "Sat, Sept 12 2025",
      thumbnail_url: img,
      ticket_sold: 45,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {demoData.map((item, index) => (
        <Events key={index} event={item} />
      ))}
    </div>
  );
};

export default Dashboard;
