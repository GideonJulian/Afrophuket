import React, { useState } from "react";
import { ImagePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [bannerPreview, setBannerPreview] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
const navigate = useNavigate()
  // ✅ Product form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Handle image upload & preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerFile(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bannerFile || !title || !price || !description) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("image", bannerFile);

      const res = await fetch(
        "https://afrophuket-backend.onrender.com/products/",
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      if(res.ok) {
        navigate('/shop')
      }

      const data = await res.json();
      console.log("Product created:", data);

      alert("✅ Product created successfully!");
      setTitle("");
      setDescription("");
      setPrice("");
      setBannerPreview(null);
      setBannerFile(null);
    } catch (err) {
      console.error("Upload error:", err);
      alert("❌ Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 p-4 flex flex-col lg:flex-row items-center gap-10"
    >
      {/* LEFT: Upload */}
      <div className="w-full lg:w-[442px]">
        <h1 className="font-bold text-xl sm:text-2xl">Product Image</h1>
        <p className="text-sm font-extralight">Upload a JPEG or PNG file</p>

        <div className="relative mt-3">
          <div
            className="p-4 rounded-xl h-[330px] flex flex-col items-center justify-center bg-black overflow-hidden"
            style={{
              backgroundImage: bannerPreview ? `url(${bannerPreview})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!bannerPreview && (
              <label className="cursor-pointer flex flex-col items-center justify-center text-center">
                <ImagePlus className="h-10 w-10 text-white hover:text-[#E55934]" />
                <span className="text-[#E55934] text-lg font-medium mt-2">
                  Click to Upload{" "}
                  <span className="text-white">Product Image</span>
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT: Product Details */}
      <div className="right w-full lg:flex-1">
        <h1 className="font-bold text-xl sm:text-2xl">Product Details</h1>

        <div className="mt-4">
          {/* Product Title */}
          <div>
            <input
              type="text"
              placeholder="Enter product title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl sm:text-3xl font-bold focus:outline-none w-full bg-transparent"
            />
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block text-sm mb-1">Product Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              className="w-full border-b border-gray-400 bg-transparent outline-none py-1 text-white resize-none"
              rows={3}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-8 mt-10">
            {/* Price */}
            <div className="w-full">
              <label className="block text-sm mb-1">Product Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 50"
                className="w-full border-b border-gray-400 bg-transparent outline-none py-1 text-white"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="border rounded-lg px-6 py-3 font-semibold text-center w-full sm:w-auto"
          >
            Cancel
          </button>
          <div className="relative w-full sm:w-auto">
            <span className="absolute inset-0 bg-black rounded-lg translate-x-1.5 translate-y-1.5 border-2"></span>
            <button
              type="submit"
              disabled={loading}
              className="relative w-full text-sm md:text-base font-semibold uppercase px-4 sm:px-6 py-3 bg-white text-black rounded-lg border-2 border-black shadow-md hover:scale-[1.03] transition-all duration-300"
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateProduct;
