// src/components/ServiceCard.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ServiceCard = ({ icon, title, description, iconColor }) => (
  <div className="p-6 border rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300 hover:scale-105 group">
    <FontAwesomeIcon icon={icon} size="2x" className={`${iconColor} mb-4`} />
    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300 ">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default ServiceCard;
