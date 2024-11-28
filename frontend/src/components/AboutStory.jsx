// src/components/AboutStory.jsx
import happyCustomers from "../assets/happypeople.png"; // Replace with the actual path to your image

const AboutStory = () => (
  <section className="flex flex-col md:flex-row items-center md:items-start gap-8 px-6 py-16 bg-white rounded-xl shadow-xl">

    {/* Text Section */}
    <div className="md:w-1/2 text-gray-800 space-y-6">
      <h2 className="text-5xl font-extrabold text-gray-800 mb-6 text-center md:text-left">
        Our Story
      </h2>
      <p className="text-xl text-gray-700 leading-relaxed">
        Founded with a passion for innovation and customer satisfaction, Electro+ has become a trusted name in electronics. From humble beginnings as a small shop, we've grown into a brand known for delivering high-quality gadgets and unbeatable service. Our mission is to bring the latest technology to everyone, making life easier, better, and more connected.
      </p>
      <p className="text-xl text-gray-700 leading-relaxed">
        Every day, our team is dedicated to exceeding expectations and making sure each customer has a seamless, enjoyable experience. Join us on this journey to explore and experience technology like never before!
      </p>
    </div>

    {/* Image Section */}
    <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
      <img
        src={happyCustomers}
        alt="Happy customers at ElectroPlus"
        className="rounded-2xl shadow-2xl max-w-full transition-transform duration-300 ease-in-out transform hover:scale-105 hover:rotate-2"
      />
    </div>

  </section>
);

export default AboutStory;
