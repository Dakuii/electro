import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import mobilePhone4 from "../assets/products/phones/mobilePhone4.png";
import laptop4 from "../assets/products/laptops/laptop4.png";
import earphone4 from "../assets/products/earphones/earphone4.png";
import smartwatch4 from "../assets/products/smartwatches/smartwatch4.png";

const PromotionsSlider = () => {
  const promotions = [
    {
      title: "10% Off on OnePlus 9 Pro",
      image: mobilePhone4,
      link: "/mobile-phones",
    },
    {
      title: "20% Off on Lenovo Thinkpad X1",
      image: laptop4,
      link: "/laptops",
    },
    {
      title: "25% Off on Sennheiser Momentum 4",
      image: earphone4,
      link: "/headphones-earbuds",
    },
    {
      title: "15% Off on Fitbit Sense 2",
      image: smartwatch4,
      link: "/smartwatches",
    },
  ];

  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={4000}
      className="mb-12"
    >
      {promotions.map((promo, index) => (
        <div
          key={index}
          className="flex items-center bg-black p-8 rounded-lg shadow-lg max-w-screen-lg mx-auto"
        >
          <div className="flex-1 text-left">
            <h2 className="text-3xl font-bold text-white mb-4">
              {promo.title}
            </h2>
            <a
              href={promo.link}
              className="text-white text-lg underline hover:no-underline hover:text-gray-300 transition-colors duration-300 inline-flex items-center"
            >
              Shop now
              <svg
                className="ml-2 w-5 h-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
          <div className="flex-1">
            <img
              src={promo.image}
              alt={promo.title}
              className="h-80 w-full object-contain rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default PromotionsSlider;
