import React from "react";
import Events from "../components/Dashboard/Events";
import img from '../assets/images/events/event1.png'
const Dashboard = () => {
  const demoData = [
    {
      title: "Amapiano Night",
      event_date: "Sat, Aug 25 2025",
      thumbnail_url: img,
      ticket_sold: 20
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-6">
      {demoData.map((item, index) => (
        <Events event={item} />
      ))}
    </div>
  );
};

export default Dashboard;
