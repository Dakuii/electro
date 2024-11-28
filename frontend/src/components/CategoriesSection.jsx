// src/components/CategoriesSection.jsx
import CategoryCard from "./CategoryCard";

// Import category images
import mobilePhonesImage from "../assets/categories/phones.jpg";
import laptopsImage from "../assets/categories/laptops.png";
import headphonesImage from "../assets/categories/h&e.png";
import smartwatchesImage from "../assets/categories/smartwatchs.jpg";

const CategoriesSection = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
    <CategoryCard
      image={mobilePhonesImage}
      altText="Mobile Phones"
      categoryLink="/mobile-phones"
      categoryName="Mobile Phones"
    />
    <CategoryCard
      image={laptopsImage}
      altText="Laptops"
      categoryLink="/laptops"
      categoryName="Laptops"
    />
    <CategoryCard
      image={headphonesImage}
      altText="Headphones & Earbuds"
      categoryLink="/headphones-earbuds"
      categoryName="Headphones & Earbuds"
    />
    <CategoryCard
      image={smartwatchesImage}
      altText="Smartwatches"
      categoryLink="/smartwatches"
      categoryName="Smartwatches"
    />
  </div>
);

export default CategoriesSection;
