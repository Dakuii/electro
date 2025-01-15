import React, { useState } from "react";
import axios from "axios";

const AddProductForm = ({ fetchProducts }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    quantity: "",
    category: "",
    image: null,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      setError("Image file is required");
      return;
    }

    const newProductData = new FormData();
    newProductData.append("name", formData.name);
    newProductData.append("price", formData.price);
    newProductData.append("description", formData.description);
    newProductData.append("quantity", formData.quantity);
    newProductData.append("category", formData.category);
    newProductData.append("image", formData.image);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/products",
        newProductData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      fetchProducts(); // Refresh product list after adding
      setFormData({
        name: "",
        price: "",
        description: "",
        quantity: "",
        category: "",
        image: null,
      });
      setError(""); // Reset error message
    } catch (error) {
      setError("Error adding product, please try again.");
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl mx-auto mt-8">
      <h2 className="text-3xl font-extrabold text-center text-red-600 mb-6">
        Create New Product
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-lg font-semibold text-black mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="price" className="text-lg font-semibold text-black mb-2">
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
              required
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="text-lg font-semibold text-black mb-2">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
            rows="3"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="quantity" className="text-lg font-semibold text-black mb-2">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="category" className="text-lg font-semibold text-black mb-2">
              Category
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
              required
            >
              <option value="">Select Category</option>
              <option value="Phones">Phones</option>
              <option value="Laptops">Laptops</option>
              <option value="SmartWatches">SmartWatches</option>
              <option value="Earphones">Earphones</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="image" className="text-lg font-semibold text-black mb-2">
            Product Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleChange}
            className="p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
            required
          />
        </div>

        <div className="text-center mt-6">
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-200"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
