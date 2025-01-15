import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaShoppingCart, FaEye } from "react-icons/fa";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); 

  const categories = ["Phones", "Laptops", "SmartWatches", "Earphones"];

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
        setProducts(data);
        setFilteredProducts(data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (event) => {
    const selected = event.target.value;
    setSelectedCategory(selected);

    if (selected === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === selected);
      setFilteredProducts(filtered);
    }
  };

  const handleAddToCart = async (product, quantity) => {
    if (!product || quantity <= 0) return;

    console.log("Adding to cart:", product, "Quantity:", quantity);

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must be logged in to add products to the cart.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/auth/add-to-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
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
    setFilteredProducts(prevProducts =>
      prevProducts.map(product => 
        product._id === productId
          ? { ...product, quantity: newQuantity }
          : product
      )
    );
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-left">Products</h1>
          <div>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
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
                    onChange={(e) => handleQuantityInputChange(product._id, e.target.value)}
                    min={1}
                    className="w-20 h-10 p-2 text-center border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
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

            <div className="flex justify-center mt-6">
              <nav className="flex gap-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-200 rounded-lg text-gray-600 disabled:bg-gray-300"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 rounded-lg ${currentPage === index + 1 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-200 rounded-lg text-gray-600 disabled:bg-gray-300"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
