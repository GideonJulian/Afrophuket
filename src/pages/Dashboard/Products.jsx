import React, { useEffect, useState } from "react";
import Header from "../../components/Dashboard/Header";
import { useNavigate, useOutletContext } from "react-router-dom";
import ProductCard from "../../components/Dashboard/ProductCard";

const Products = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useOutletContext();
  const [productData, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://afrophuket-backend.onrender.com/products/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setProduct(data);
      } else {
        console.error("Expected array, got:", data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };
const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token"); // ✅ Get token
      const res = await fetch(
        `https://afrophuket-backend.onrender.com/products/${id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`, // ✅ Attach token
          },
        }
      );

      if (!res.ok) throw new Error("Failed to delete event");

      // Refresh events after successful delete
      await fetchEvents();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete event. Try again.");
    }
  };
  return (
    <div className="px-4 sm:px-6 md:px-8">
      {/* Header */}
      <div className="sticky top-0 bg-opacity-80 backdrop-blur-md z-10 border-b border-gray-600 flex items-center">
        <div className="flex justify-between w-full items-center p-2 sm:p-3">
          <Header
            buttonText={"ADD NEW PRODUCT"}
            route={"create-product"}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
      </div>

      {/* Products */}
      {loading ? (
        <p className="text-center text-gray-400 mt-5">Loading products...</p>
      ) : productData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mt-5">
          {productData.map((item, index) => (
            <ProductCard
              key={index}
              id={item.id}
              imgSrc={item.image_url || item.image}
              name={item.title}
              price={item.price}
              quantity={item.quantity || 0} 
              onDelete={handleDelete}// ✅ fixed quantity
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-5">No products available.</p>
      )}

      {/* Mobile Add Button */}
      <div className="mt-6 flex items-center justify-center md:hidden">
        <div className="relative w-full sm:w-auto">
          <span className="absolute inset-0 bg-black rounded-lg translate-x-1.5 translate-y-1.5 border-2"></span>
          <button
            onClick={() => navigate("create-product")}
            className="relative w-full sm:w-auto text-sm sm:text-base font-semibold uppercase cursor-pointer px-4 sm:px-6 py-3 bg-white text-black rounded-lg border-2 border-black shadow-md scale-105 hover:scale-110 transition-all duration-300"
          >
            CREATE NEW PRODUCT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
