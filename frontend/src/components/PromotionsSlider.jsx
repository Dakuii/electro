import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import laptop from "../assets/lpd.png";
import phone from "../assets/fpd.png";
import smartwatch from "../assets/sm.png";
import headphone from "../assets/hd.png";

const PromotionsSlider = () => {
  const promotions = [
    {
      title: "Your Dream Products, Now on Sale",
      image: laptop,
      link: "/products",
    },
    {
      title: "Unlock Exclusive Deals, Shop More, Save More!",
      image: phone,
      link: "/products",
    },
    {
      title: "Shop Today, Enjoy Tomorrow",
      image: smartwatch,
      link: "/products",
    },
    {
      title: "Your Perfect Deal Is Waiting, Shop and Save Today!",
      image: headphone,
      link: "/products",
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
          className="flex items-center bg-gradient-to-r from-red-500 to-red-600 p-8 rounded-xl shadow-xl max-w-screen-lg mx-auto transition-all duration-500 transform hover:scale-105"
        >
          <div className="flex-1 text-left space-y-4">
            <h2 className="text-4xl font-semibold text-white mb-4">
              {promo.title}
            </h2>
            <a
              href={promo.link}
              className="text-white text-xl font-medium underline hover:no-underline hover:text-red-100 transition-colors duration-300 inline-flex items-center"
            >
              Shop now
              <svg
                className="ml-2 w-6 h-6 text-white"
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
              className="h-80 w-full object-cover rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default PromotionsSlider;
