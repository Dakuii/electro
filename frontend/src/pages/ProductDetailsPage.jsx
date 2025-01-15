import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaArrowLeft } from "react-icons/fa"; // Import left arrow icon

const ProductDetailsPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for quantity
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/products/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || quantity <= 0) return; // Ensure product and quantity are valid
  
    console.log("Adding to cart:", product, "Quantity:", quantity);
  
    // Retrieve the token from localStorage (or wherever it is stored)
    const token = localStorage.getItem('authToken');
  
    // Check if token exists
    if (!token) {
      alert("You must be logged in to add products to the cart.");
      return;
    }
  
    try {
      // Send the request with the token in the Authorization header
      const response = await fetch(`http://localhost:5000/api/auth/add-to-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Add the token to the Authorization header
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: quantity,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Product added to cart:", data);
        alert("Product added to cart!");
      } else {
        console.error("Error adding to cart:", data.message);
        alert(`Failed to add product to cart: ${data.message}`);
      }
    } catch (err) {
      console.error("Error:", err.message);
      alert(`An error occurred: ${err.message}`);
    }
  };
  

  const handleQuantityChange = (event) => {
    const value = Math.max(1, parseInt(event.target.value) || 1); // Ensure quantity is at least 1
    setQuantity(value);
  };

  const handleBackToProducts = () => {
    navigate("/products"); // Use navigate to go back to the products page
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-4">
        {loading ? (
          <p>Loading product details...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col lg:flex-row">
            {/* Image section with bigger size */}
            <div className="lg:w-1/2 flex justify-center mb-4 lg:mb-0">
              <img
                src={`http://localhost:5000/${product.image}`}
                alt={product.name}
                className="w-72 h-72 object-contain"  // Increase image size
              />
            </div>

            {/* Product information section with vertical separators */}
            <div className="lg:w-1/2 flex flex-col justify-between pl-0 lg:pl-8">
              <div className="flex items-center mb-6">
                <button
                  onClick={handleBackToProducts}
                  className="text-red-500 hover:text-red-700 mr-4"
                >
                  <FaArrowLeft className="text-2xl" />
                </button>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">{product.name}</h2>
              </div>

              <div className="flex mb-6">
                <p className="text-lg mb-4">{product.description}</p>
                <hr className="border-l-2 border-gray-300 mx-4" /> {/* Vertical Separator */}
              </div>

              <p className="text-xl text-red-600 mb-6">Price: ${product.price}</p>

              <div className="flex mb-6">
                <p className="text-sm text-gray-500 mb-8">Category: {product.category}</p>
                <hr className="border-l-2 border-gray-300 mx-4" /> {/* Vertical Separator */}
              </div>

              {/* Available Quantity */}
                <div className="flex mb-6">
                <p className="text-sm text-gray-500 mb-8">Available Quantity: {product.quantity}</p> {/* Assuming `stockQuantity` is the field representing available stock */}
                </div>

              <div className="flex items-center mb-6">
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min={1}
                  className="w-20 h-10 p-2 text-center border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  onClick={handleAddToCart}
                  className="py-2 px-6 ml-4 bg-red-600 text-white font-semibold rounded-lg transition-colors hover:bg-red-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
