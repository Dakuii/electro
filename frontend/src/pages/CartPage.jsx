import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";


const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newQuantity, setNewQuantity] = useState(1);

  const handleUpdate = async (productId, newQuantity) => {
    if (newQuantity > currentProduct.quantityAvailable) {
      setError(
        `The quantity exceeds the available stock of ${currentProduct.quantityAvailable}.`
      );
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/api/auth/update-cart",
        { productId, newQuantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setCart(response.data.cart);
      setError(null);
      setPopupVisible(false);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const response = await fetch(
          "http://localhost:5000/api/auth/view-cart",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cart");
        }

        const data = await response.json();
        setCart(data.cart || []);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCart();
  }, [cart]);

  const handleRemoveItem = async (productId) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(
        "http://localhost:5000/api/auth/remove-item",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ productId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }

      const data = await response.json();
      setCart(data.cart || []);
    } catch (error) {
      setError(error.message);
    }
  };

  const calculateTotalPrice = (quantity, price) => {
    return quantity * price;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow p-6">
          <div>Loading cart...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (

    <div className="min-h-screen flex flex-col">
  <Header />

  <div className="flex-grow p-6">
    {cart.length === 0 ? (
      <div className="text-lg text-gray-700 font-semibold">
        Your cart is empty.
      </div>
    ) : (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Your Product List
        </h2>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="py-4 px-6 border-b">Product</th>
                <th className="py-4 px-6 border-b">Category</th>
                <th className="py-4 px-6 border-b">Quantity</th>
                <th className="py-4 px-6 border-b">Price</th>
                <th className="py-4 px-6 border-b">Total Price</th>
                <th className="py-4 px-6 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(cart) &&
                cart.map((item, index) => (
                  <tr
                    key={item.productId}
                    className={`text-center border-b ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                    } hover:bg-gray-200`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <img
                          src={`http://localhost:5000/${item.image}`}
                          alt={item.name}
                          className="w-16 h-16 object-contain"
                        />
                        <span className="font-medium text-gray-800">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">{item.category}</td>
                    <td className="py-4 px-6">{item.quantityInCart}</td>
                    <td className="py-4 px-6">${item.price.toFixed(2)}</td>
                    <td className="py-4 px-6 font-semibold">
                      $
                      {calculateTotalPrice(
                        item.quantityInCart,
                        item.price
                      ).toFixed(2)}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        className="ml-2 text-blue-500 hover:underline font-medium"
                        onClick={() => {
                          setCurrentProduct(item);
                          setPopupVisible(true);
                          setNewQuantity(item.quantityInCart);
                        }}
                      >
                        <FaEdit className="text-xl" />
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.productId)}
                        className="ml-2 text-red-500 hover:underline font-medium"
                      >
                        <FaTrash className="text-xl" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* "Proceed to Checkout" Button */}
        <div className="flex justify-end mt-6">
          <button
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            onClick={() => console.log("Proceeding to checkout...")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    )}
  </div>

  {popupVisible && (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Update Quantity
        </h2>
        <input
          value={newQuantity}
          onChange={(e) => setNewQuantity(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
          type="number"
          min="1"
        />

        {error && (
          <div className="mt-4 px-4 py-3 bg-red-100 text-red-800 border border-red-500 rounded-lg flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-500 hover:underline text-sm font-medium"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
            onClick={() => setPopupVisible(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            onClick={() => handleUpdate(currentProduct.productId, newQuantity)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )}

  <Footer />
</div>

    
  );
};

export default CartPage;
