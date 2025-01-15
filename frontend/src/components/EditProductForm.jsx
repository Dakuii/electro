const EditProductForm = ({ product, onSubmit, onChange, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full h-auto">
        <div className="relative">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Product</h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={product.name}
                onChange={(e) => onChange("name", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                value={product.price}
                onChange={(e) => onChange("price", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={product.description}
                onChange={(e) => onChange("description", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                value={product.quantity}
                onChange={(e) => onChange("quantity", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={product.category}
                onChange={(e) => onChange("category", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a category</option>
                <option value="Phones">Phones</option>
                <option value="Laptops">Laptops</option>
                <option value="SmartWatches">SmartWatches</option>
                <option value="Earphones">Earphones</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <input
                type="file"
                onChange={(e) => onChange("image", e.target.files[0])}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                Update Product
              </button>
              <button
                type="button"
                className="absolute top-2 right-2 text-gray-500 text-xl hover:text-gray-700"
                onClick={onClose}
              >
                X
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
  export default EditProductForm;
  