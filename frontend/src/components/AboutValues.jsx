// src/components/AboutValues.jsx

const AboutValues = () => (
    <section className="bg-white py-16 px-6 rounded-xl shadow-xl">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {/* Value 1 */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Innovation</h3>
            <p className="text-gray-600">
              We strive to be at the forefront of technology, constantly exploring new ideas to deliver cutting-edge products.
            </p>
          </div>
  
          {/* Value 2 */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Customer Satisfaction</h3>
            <p className="text-gray-600">
              Our customers are at the heart of everything we do. We are committed to exceeding their expectations and providing exceptional service.
            </p>
          </div>
  
          {/* Value 3 */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Integrity</h3>
            <p className="text-gray-600">
              We uphold the highest standards of honesty and transparency, ensuring that trust and accountability drive all our interactions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
  
  export default AboutValues;
  