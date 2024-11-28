// src/components/CategoryCard.jsx
import { Link } from 'react-router-dom';

const CategoryCard = ({ image, altText, categoryLink, categoryName }) => {
  return (
    <div className="text-center">
      <Link to={categoryLink}>
        <img 
          src={image} 
          alt={altText} 
          className="w-full h-48 object-cover mb-4 rounded-lg shadow-md transition-all duration-300 hover:scale-105" 
        />
        <h2 className="font-medium text-lg text-gray-800">{categoryName}</h2>
      </Link>
    </div>
  );
};

export default CategoryCard;
