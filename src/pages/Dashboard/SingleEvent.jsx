import {
  BookText,
  Calendar,
  ChevronLeft,
  CircleAlert,
  Clock,
  Globe,
  MapPin,
  Menu,
  Upload,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AfroLoader from "../../components/AfroLoader";
import hostimg from "../../assets/images/hostimg.png";

const SingleEvent = ({ setIsSidebarOpen, isSidebarOpen }) => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [editableEvent, setEditableEvent] = useState({});
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchEvent = async () => {
      try {
        const res = await fetch(
          `https://afrophuket-backend.onrender.com/events/${id}/`,
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch event");
        const data = await res.json();
        setEvent(data);
        setEditableEvent({
          title: data.title || "",
          description: data.description || "",
          location: data.location || "",
          after_party: data.after_party || false,
          after_party_location: data.after_party_location || "",
          startDate: data.date || "",
          endDate: data.end_date || "",
          startTime: data.start_time || "",
          endTime: data.end_time || "",
          thumbnail: null,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  // ✅ Save handler
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("title", editableEvent.title);
      formData.append("description", editableEvent.description);
      formData.append("location", editableEvent.location);
      formData.append("after_party", editableEvent.after_party);
      formData.append("after_party_location", editableEvent.after_party_location);
      formData.append("date", editableEvent.startDate);
      formData.append("end_date", editableEvent.endDate);
      formData.append("start_time", editableEvent.startTime);
      formData.append("end_time", editableEvent.endTime);

      if (editableEvent.thumbnail) {
        formData.append("thumbnail", editableEvent.thumbnail);
      }

      const response = await fetch(
        `https://afrophuket-backend.onrender.com/events/${id}/`,
        {
          method: "PATCH",
          headers: {
            "Authorization": `Token ${token}`, // ✅ send token
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to save changes");

      const updated = await response.json();
      setEvent(updated);
      setEditableEvent({
        ...editableEvent,
        ...updated,
        thumbnail: null,
      });
      setEditing(false);
    } catch (err) {
      alert("Error saving event: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditableEvent((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) return <AfroLoader />;
  if (error) return <p className="text-red-400 text-center py-20">{error}</p>;
  if (!event)
    return <p className="text-white text-center py-20">Event not found.</p>;

  return (
    // 👇 your UI stays the same, unchanged
    <div className="p-2 sm:p-4 max-w-7xl mx-auto">
      {/* ... rest of your code unchanged */}
    </div>
  );
};

export default SingleEvent;
