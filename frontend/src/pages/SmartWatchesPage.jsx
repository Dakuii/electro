// src/pages/SmartWatchesPage.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import smartwatch1 from "../assets/products/smartwatches/smartwatch1.png";
import smartwatch2 from "../assets/products/smartwatches/smartwatch2.png";
import smartwatch3 from "../assets/products/smartwatches/smartwatch3.png";
import smartwatch4 from "../assets/products/smartwatches/smartwatch4.png";

const SmartWatchesPage = () => (
  <div className="min-h-screen bg-gray-100">
    <Header /> {/* Add Header */}
    <div className="container mx-auto px-4 py-8">
      {/* Category Title */}
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-4">
        Smart Watches
      </h1>
      <p className="text-lg text-gray-600 text-center mb-16">
        Discover the latest smartwatches with advanced features and sleek designs.
      </p>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        <ProductCard image={smartwatch1} name="Apple Watch Series 8" price="399" />
        <ProductCard image={smartwatch2} name="Samsung Galaxy Watch 6" price="349" />
        <ProductCard image={smartwatch3} name="Garmin Forerunner 955" price="499" />
        <ProductCard image={smartwatch4} name="Fitbit Sense 2" price="229" />
      </div>
    </div>
    <Footer /> {/* Add Footer */}
  </div>
);

export default SmartWatchesPage;
