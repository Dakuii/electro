import Header from "../components/Header";
import Footer from "../components/Footer";
import CategoriesSection from "../components/CategoriesSection";
import ServicesSection from "../components/ServicesSection";
import PromotionsSlider from "../components/PromotionsSlider";

const HomePage = () => (
  <div className="min-h-screen flex flex-col">
    <Header />

    <div className="container mx-auto px-4 py-8 flex-grow">
      {/* New Promotion Title */}
      <div className="text-center mb-6">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
          New Promotion
        </h2>
      </div>

      {/* Promotions Slider */}
      <PromotionsSlider />

      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Explore Our Categories
        </h1>
        <p className="text-lg text-gray-600">
          Explore the latest innovations in eco-friendly electronics
        </p>
      </div>

      {/* Categories Section */}
      <CategoriesSection />

      {/* Services Section */}
      <ServicesSection />
    </div>

    <Footer />
  </div>
);

export default HomePage;
