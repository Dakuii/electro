import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import ProductTable from "../components/ProductTable";
import EditProductForm from "../components/EditProductForm";
import AddProductForm from "../components/AddProductForm"; // Import AddProductForm

const DashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    description: "",
    quantity: "",
    category: "",
    image: null,
  });
  const [showAddProductForm, setShowAddProductForm] = useState(false); // To control AddProductForm visibility
  const [showProductTable, setShowProductTable] = useState(true); // To control ProductTable visibility
  const [activeButton, setActiveButton] = useState("productList"); // State to track the active button

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditForm({
      name: product.name,
      price: product.price,
      description: product.description,
      quantity: product.quantity,
      category: product.category,
      image: product.image,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", editForm.name);
    formData.append("price", editForm.price);
    formData.append("description", editForm.description);
    formData.append("quantity", editForm.quantity);
    formData.append("category", editForm.category);
    if (editForm.image) {
      formData.append("image", editForm.image);
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/products/${selectedProduct._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProducts(
        products.map((product) =>
          product._id === selectedProduct._id ? response.data : product
        )
      );
      setSelectedProduct(null);
      setEditForm({
        name: "",
        price: "",
        description: "",
        quantity: "",
        category: "",
        image: null,
      });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setProducts(products.filter((product) => product._id !== productId));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-grow p-6">
        <div className="flex justify-center space-x-4 mb-6">
          {/* Add Product Button */}
          <button
            onClick={() => {
              setShowAddProductForm(true);
              setShowProductTable(false);
              setActiveButton("addProduct");
            }}
            className={`${
              activeButton === "addProduct"
                ? "bg-red-500 text-white"
                : "bg-gray-300 text-gray-700"
            } px-6 py-3 rounded-md hover:bg-red-400 transition duration-200`}
          >
            Create Product
          </button>

          {/* Product List Button */}
          <button
            onClick={() => {
              setShowProductTable(true);
              setShowAddProductForm(false);
              setActiveButton("productList");
            }}
            className={`${
              activeButton === "productList"
                ? "bg-red-500 text-white"
                : "bg-gray-300 text-gray-700"
            } px-6 py-3 rounded-md hover:bg-red-400 transition duration-200`}
          >
            Product List
          </button>
        </div>

        {/* Display ProductTable if showProductTable is true */}
        {showProductTable && (
          <>
            {loading ? (
              <p>Loading products...</p>
            ) : (
              <ProductTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
            )}
          </>
        )}

        {/* Show AddProductForm if showAddProductForm is true */}
        {showAddProductForm && <AddProductForm fetchProducts={fetchProducts} />}
      </div>

      {selectedProduct && (
        <EditProductForm
          product={editForm}
          onSubmit={handleUpdate}
          onChange={(key, value) => setEditForm({ ...editForm, [key]: value })}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <Footer />
    </div>
  );
};

export default DashboardPage;
