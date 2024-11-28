// src/components/ProductCard.jsx
import { FaShoppingCart } from "react-icons/fa"; // Import the shopping cart icon

const ProductCard = ({ image, name, price }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
    <div className="relative w-full h-64 overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-contain transition-transform transform hover:scale-110"
      />
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{name}</h3>
      <p className="text-xl text-gray-900 mb-4">${price}</p>

      {/* Flexbox for the button layout */}
      <div className="flex justify-center">
        <button className="py-2 px-6 bg-red-600 text-white font-semibold rounded-lg flex items-center gap-2 transition-colors hover:bg-red-700">
          <FaShoppingCart className="text-white" />
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

export default ProductCard;
