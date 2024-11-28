// src/components/ServicesSection.jsx
import ServiceCard from "./ServiceCard";
import {
  faTruck,
  faHeadset,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

const ServicesSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <ServiceCard
      icon={faTruck}
      title="Free and Fast Delivery"
      description="Enjoy speedy delivery with zero shipping costs on all orders."
      iconColor="text-green-600"
    />
    <ServiceCard
      icon={faHeadset}
      title="24/7 Customer Service"
      description="We’re here to help, any time of the day or night."
      iconColor="text-blue-600"
    />
    <ServiceCard
      icon={faDollarSign}
      title="Money Back Guarantee"
      description="Shop with confidence, your satisfaction is guaranteed."
      iconColor="text-yellow-600"
    />
  </div>
);

export default ServicesSection;
