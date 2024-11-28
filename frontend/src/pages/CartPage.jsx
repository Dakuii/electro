import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import phone1 from "../assets/products/phones/mobilePhone1.png";
import laptop1 from "../assets/products/laptops/laptop1.png";
import smartwatch2 from "../assets/products/smartwatches/smartwatch2.png";

const CartPage = () => {
  // Example cart items (you would probably fetch these from a global state or API)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "iPhone 15",
      price: 899,
      quantity: 1,
      image: phone1,
    },
    {
      id: 2,
      name: "MacBook Pro 16",
      price: 2399,
      quantity: 1,
      image: laptop1,
    },
    {
      id: 3,
      name: "Samsung Galaxy Watch 6",
      price: 349,
      quantity: 2,
      image: smartwatch2,
    },
  ]);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Update quantity of an item
  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from the cart
  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-6 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Your Shopping Cart
        </h1>

        {/* Cart Items */}
        <div className="bg-white shadow-lg rounded-lg p-4 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-lg text-gray-600 text-center">
              Your cart is empty. Start shopping now!
            </p>
          ) : (
            <div>
              {/* Cart Item List */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b py-3"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Item Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg shadow-sm" // Smaller image size
                      />
                      <div className="flex flex-col">
                        <span className="text-lg font-semibold text-gray-800">
                          {item.name}
                        </span>
                        <span className="text-md text-gray-600">
                          ${item.price}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {/* Quantity Selector */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          className="px-2 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                          disabled={item.quantity === 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          min="1"
                          className="w-10 text-center border px-2 py-1 rounded-lg"
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value)
                            )
                          }
                        />
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="px-2 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Price and Checkout */}
              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <div className="text-md font-semibold text-gray-800">
                  Total Price
                </div>
                <div className="text-xl font-bold text-gray-900">
                  ${totalPrice}
                </div>
              </div>
              <div className="mt-4 text-right">
                <button className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-200">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
