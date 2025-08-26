import { ChevronLeft, Menu, Upload } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PopupNotification from "../../components/PopupNotification";

const SingleProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("details");
  const [product, setProduct] = useState(null);
  const [editableProduct, setEditableProduct] = useState({});
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    type: "success",
    message: "",
  });
  // ✅ Fetch product details
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://afrophuket-backend.onrender.com/products/${id}/`,
          {
            method: "GET",
            headers: {
              Authorization: `Token 8b97f16612ac1e9ff989423d6a41904ed804df50`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        setProduct(data);
        setEditableProduct(data); // start with product data
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // ✅ Handle changes
  const handleInputChange = (field, value) => {
    setEditableProduct((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ Save changes
  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      Object.entries(editableProduct).forEach(([key, value]) => {
        // Append file or normal text fields
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      await fetch(`https://afrophuket-backend.onrender.com/products/${id}/`, {
        method: "PATCH",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: formData,
      });
       setPopup({ show: true, type: "success", message: "Product Edited ✅" });
      setProduct(editableProduct);
      setEditing(false);
    } catch (error) {
      console.error("Error saving product:", error);
       setPopup({ show: true, type: "success", message: "Failed To edit Product  ✅" });
    } finally {
      setSaving(false);
    }
  };

  if (!product) return <p className="p-6 text-gray-500">Loading product...</p>;

  return (
    <div className="p-2 sm:p-4 max-w-7xl mx-auto">
      {/* Back button + menu */}
      <div className="w-full flex items-center justify-between mt-3">
        <button
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <ChevronLeft className="text-gray-600" />
          <h1 className="ml-1 text-sm sm:text-base">Back</h1>
        </button>
        <div className="md:hidden block">
          <button className="p-2">
            <Menu />
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="mt-10">
        <h1 className="font-bold text-lg">Product</h1>

        {/* Tabs */}
      
        {/* Tab content */}
        {activeTab === "details" ? (
          <div className="mt-10 flex flex-col lg:flex-row items-start gap-10">
            {/* Thumbnail */}
            <div className="w-full lg:w-[442px]">
              <h1 className="font-bold text-xl sm:text-2xl">Product image</h1>
              <p className="text-sm font-extralight">
                Upload a JPEG or PNG file
              </p>
              <div className="mt-6 relative">
                <img
                  src={
                    editableProduct.image instanceof File
                      ? URL.createObjectURL(editableProduct.image)
                      : editableProduct.image
                  }
                  className="rounded-2xl w-full object-cover max-h-80 sm:max-h-[400px]"
                  alt="Product thumbnail"
                />
                <input
                  type="file"
                  accept="image/*"
                  id="thumbnail-upload"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) handleInputChange("image", file); // ✅ FIX: use "image"
                  }}
                />
                <label
                  htmlFor="thumbnail-upload"
                  className="absolute bottom-4 right-4 bg-[#fff] p-3 rounded-full shadow-md hover:scale-105 transition cursor-pointer"
                >
                  <Upload className="text-[#E55934] w-5 h-5" />
                </label>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex-1">
              {/* Title */}
              {editing ? (
                <input
                  type="text"
                  className="bg-transparent border-b border-gray-600 focus:outline-none font-bold text-lg sm:text-xl lg:text-2xl mb-5 sm:mb-7 w-full"
                  value={editableProduct.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter product title"
                />
              ) : (
                <h1 className="font-bold text-lg sm:text-xl lg:text-2xl mb-5 sm:mb-7">
                  {editableProduct.title}
                </h1>
              )}

              {/* Description */}
              <div className="mt-10 border-b border-gray-400 md:w-auto w-full">
                <label className="block text-sm mb-1">
                  Product Description
                </label>
                {editing ? (
                  <textarea
                    value={editableProduct.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Enter product description"
                    className="w-full  bg-transparent outline-none py-1 resize-none"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-300">{editableProduct.description}</p>
                )}
              </div>

              {/* Price */}
              <div className="mt-10 border-b border-gray-400  md:w-auto w-full">
                <label className="block text-sm mb-1">Product Price</label>
                {editing ? (
                  <input
                    type="number"
                    value={editableProduct.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="e.g. 50"
                    className="w-full  bg-transparent outline-none py-1"
                  />
                ) : (
                  <p className="text-gray-300">₦{editableProduct.price}</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-10">
            {/* Sales Tab Content */}
            <h2 className="text-xl font-semibold">Sales Data</h2>
            <p className="text-gray-500 mt-3">
              Sales info will be displayed here...
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-6 w-full">
          <button
            onClick={() => setEditing(!editing)}
            className="border rounded-lg px-6 py-3 cursor-pointer font-semibold text-center w-full sm:w-auto"
          >
            {editing ? "Cancel" : "Edit"}
          </button>
          <div className="relative w-full sm:w-auto">
            <span className="absolute inset-0 bg-black rounded-lg translate-x-1.5 translate-y-1.5 border-2"></span>
            <button
              onClick={handleSave}
              disabled={saving}
              className="relative w-full text-sm md:text-base font-semibold uppercase cursor-pointer px-4 sm:px-6 py-3 bg-white text-black rounded-lg border-2 border-black shadow-md hover:scale-[1.03] transition-all duration-300 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
      <div>
        <PopupNotification
          type={popup.type}
          message={popup.message}
          show={popup.show}
          onClose={() => setPopup({ ...popup, show: false })}
        />
      </div>
    </div>
  );
};

export default SingleProduct;
