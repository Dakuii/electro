// src/pages/LaptopsPage.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import laptop1 from "../assets/products/laptops/laptop1.png";
import laptop2 from "../assets/products/laptops/laptop2.png";
import laptop3 from "../assets/products/laptops/laptop3.png";
import laptop4 from "../assets/products/laptops/laptop4.png";

const LaptopsPage = () => (
  <div className="min-h-screen bg-gray-100">
    <Header /> {/* Add Header */}
    <div className="container mx-auto px-4 py-8">
      {/* Category Title */}
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-4">
        Laptops
      </h1>
      <p className="text-lg text-gray-600 text-center mb-16">
        Discover our premium selection of laptops with high performance and sleek designs.
      </p>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        <ProductCard image={laptop1} name="MacBook Pro 16" price="2399" />
        <ProductCard image={laptop2} name="Dell XPS 13" price="1499" />
        <ProductCard image={laptop3} name="HP Spectre x360" price="1599" />
        <ProductCard image={laptop4} name="Lenovo ThinkPad X1" price="1799" />
      </div>
    </div>
    <Footer /> {/* Add Footer */}
  </div>
);

export default LaptopsPage;
