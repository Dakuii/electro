// src/pages/MobilePhonesPage.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import mobilePhone1 from "../assets/products/phones/mobilePhone1.png";
import mobilePhone2 from "../assets/products/phones/mobilePhone2.png";
import mobilePhone3 from "../assets/products/phones/mobilePhone3.png";
import mobilePhone4 from "../assets/products/phones/mobilePhone4.png";

const MobilePhonesPage = () => (
  <div className="min-h-screen bg-gray-100">
    <Header /> {/* Add Header */}
    <div className="container mx-auto px-4 py-8">
      {/* Category Title */}
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-4">
        Mobile Phones
      </h1>
      <p className="text-lg text-gray-600 text-center mb-16">
        Explore our latest collection of mobile phones with cutting-edge
        features.
      </p>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        <ProductCard image={mobilePhone1} name="iPhone 15" price="899" />
        <ProductCard image={mobilePhone2} name="Samsung Galaxy S23 Ultra" price="1099"/>
        <ProductCard image={mobilePhone3} name="Google Pixel 6" price="599" />
        <ProductCard image={mobilePhone4} name="OnePlus 9 Pro" price="899" />
      </div>
    </div>
    <Footer /> {/* Add Footer */}
  </div>
);

export default MobilePhonesPage;
