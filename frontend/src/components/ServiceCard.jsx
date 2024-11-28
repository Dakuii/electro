// src/components/ServiceCard.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ServiceCard = ({ icon, title, description, iconColor }) => (
  <div className="p-6 border rounded-lg shadow-md text-center">
    <FontAwesomeIcon icon={icon} size="2x" className={`${iconColor} mb-4`} />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default ServiceCard;
