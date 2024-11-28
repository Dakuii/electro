// src/pages/EarPhonesPage.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import earphone1 from "../assets/products/earphones/earphone1.png";
import earphone2 from "../assets/products/earphones/earphone2.png";
import earphone3 from "../assets/products/earphones/earphone3.png";
import earphone4 from "../assets/products/earphones/earphone4.png";

const EarPhonesPage = () => (
  <div className="min-h-screen bg-gray-100">
    <Header /> {/* Add Header */}
    <div className="container mx-auto px-4 py-8">
      {/* Category Title */}
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-4">
        Earphones & Headphones
      </h1>
      <p className="text-lg text-gray-600 text-center mb-16">
        Explore our high-quality selection of earphones and headphones for exceptional sound and comfort.
      </p>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        <ProductCard image={earphone1} name="Bose QuietComfort 35 II" price="299" />
        <ProductCard image={earphone2} name="Sony WH-1000XM5" price="379" />
        <ProductCard image={earphone3} name="Apple AirPods Pro 2" price="249" />
        <ProductCard image={earphone4} name="Sennheiser Momentum 4" price="349" />
      </div>
    </div>
    <Footer /> {/* Add Footer */}
  </div>
);

export default EarPhonesPage;
