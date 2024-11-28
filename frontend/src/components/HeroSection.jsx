// src/HeroSection.jsx
import Electronics from "../assets/products/Electronics.png"; // Import the image

const HeroSection = () => (
  <section
    className="relative bg-cover bg-center h-[500px] sm:h-[600px] flex items-center justify-center text-white"
    style={{
      backgroundImage: `url(${Electronics})`,
      backgroundSize: "80%", // Reduced size of the background image
      backgroundPosition: "center center", // Ensure the background stays centered
      backgroundRepeat: "no-repeat", // Prevent image repetition
    }}
  >
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-black opacity-50"></div>

    <div className="relative z-10 text-center p-8 md:p-16">
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-shadow-md mb-4">
        Top Electronics at Amazing Prices
      </h2>
      <p className="mt-4 text-xl sm:text-2xl md:text-3xl max-w-3xl mx-auto leading-relaxed">
        Discover the latest in technology with unbeatable deals. Shop now and
        get the best offers!
      </p>
      <button className="mt-6 bg-red-500 text-white py-3 px-8 rounded-full hover:bg-red-700 transition duration-300 text-lg font-semibold transform hover:scale-105 shadow-lg">
        Shop Now
      </button>
    </div>
  </section>
);

export default HeroSection;
