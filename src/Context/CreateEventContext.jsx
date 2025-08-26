import React, { createContext, useContext, useState, useEffect } from "react";

const CreateEventContext = createContext();

export const useCreateEvent = () => useContext(CreateEventContext);

export const CreateEventProvider = ({ children }) => {
const [eventData, setEventData] = useState({
  id: null,  
  title: "",
  description: "",
  location: "",
  location_notes: "",
  after_party: false,
  after_party_location: "",
  date: "",
  start_time: "",
  end_time: "",
  thumbnail: null,
  tags: [],
  tickets: [],
});
  useEffect(() => {
    const savedEventId = localStorage.getItem("eventId");
    if (savedEventId) {
      setEventData((prev) => ({ ...prev, id: savedEventId }));
    }
  }, []);
  return (
    <CreateEventContext.Provider value={{ eventData, setEventData }}>
      {children}
    </CreateEventContext.Provider>
  );
};
