import { FaEdit, FaTrash } from "react-icons/fa";

const ProductTable = ({ products, onEdit, onDelete }) => (
  <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
    <table className="min-w-full table-auto border-collapse">
      <thead className="bg-red-600 text-white">
        <tr>
          <th className="py-4 px-6 border-b">Product</th>
          <th className="py-4 px-6 border-b">Price</th>
          <th className="py-4 px-6 border-b">Quantity</th> {/* Added Quantity column */}
          <th className="py-4 px-6 border-b">Category</th>
          <th className="py-4 px-6 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr
            key={product._id}
            className={`text-center border-b ${
              index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
            } hover:bg-gray-200`}
          >
            <td className="py-4 px-6">
              <div className="flex items-center space-x-2">
                <img
                  src={`http://localhost:5000/${product.image}`}
                  alt={product.name}
                  className="w-16 h-16 object-contain"
                />
                <span className="font-medium text-gray-800">{product.name}</span>
              </div>
            </td>
            <td className="py-4 px-6">${product.price}</td>
            <td className="py-4 px-6">{product.quantity}</td> {/* Display product quantity */}
            <td className="py-4 px-6">{product.category}</td>
            <td className="py-4 px-6">
              <div className="flex space-x-4">
                <button
                  className="ml-2 text-blue-500 hover:underline font-medium"
                  onClick={() => onEdit(product)}
                >
                  <FaEdit className="text-xl" />
                </button>
                <button
                  className="ml-2 text-red-500 hover:underline font-medium"
                  onClick={() => onDelete(product._id)}
                >
                  <FaTrash className="text-xl" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ProductTable;
