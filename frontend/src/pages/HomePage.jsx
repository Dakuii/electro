import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ServicesSection from "../components/ServicesSection";
import PromotionsSlider from "../components/PromotionsSlider";
import { FaShoppingCart, FaEye } from "react-icons/fa"; // Import FaEye for the eye icon
import { Link } from "react-router-dom"; // Import Link for routing

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setProducts(data.slice(0, 4)); // Get the first 4 products
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product, quantity) => {
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
  

  const handleQuantityInputChange = (productId, value) => {
    const newQuantity = Math.max(1, parseInt(value) || 1);
    setProducts(prevProducts =>
      prevProducts.map(product => 
        product._id === productId
          ? { ...product, quantity: newQuantity }
          : product
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* New Promotion Title */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
            Welcome to Electro+ – Where Deals Spark!
          </h2>
        </div>

        {/* Promotions Slider */}
        <PromotionsSlider />

        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            Our Latest Products
          </h1>
          <p className="text-lg text-gray-600">
            Explore the latest innovations in eco-friendly electronics
          </p>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl p-4"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <img
                    src={`http://localhost:5000/${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform transform hover:scale-110"
                  />
                </div>
                <div className="p-4 flex flex-col items-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate text-center">{product.name}</h3>
                  <p className="text-xl text-gray-900 mb-4 text-center">${product.price}</p>

                  <div className="flex items-center mb-4 justify-center">
                    <input
                      type="number"
                      value={product.quantity || 1}
                      min={1}
                      onChange={(e) => handleQuantityInputChange(product._id, e.target.value)}
                      className="w-20 h-10 p-2 text-center border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => handleAddToCart(product, product.quantity || 1)}
                      className="py-2 px-6 bg-red-600 text-white font-semibold rounded-lg flex items-center gap-2 transition-colors hover:bg-red-700"
                    >
                      <FaShoppingCart className="text-white" />
                      Add to Cart
                    </button>
                    <Link to={`/products/${product._id}`} className="text-red-500 text-3xl hover:text-red-600">
                      <FaEye />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Our Services Title */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-1">
            Our Services
          </h2>
          <p className="text-lg text-gray-600">
            Discover the wide range of services we offer to enhance your experience.
          </p>
        </div>

      {/* Services Section */}
        <ServicesSection />


      <Footer />
    </div>
  );
};

export default HomePage;
