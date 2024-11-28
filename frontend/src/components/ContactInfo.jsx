// src/components/ContactInfo.jsx
const ContactInfo = () => (
  <div className="md:w-1/2 space-y-6 flex flex-col justify-between">
    <h2 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h2>
    <p className="text-lg text-gray-600 mb-6">
      We're here to help you! Reach out to us via phone or email, or use the
      contact form to send us a message.
    </p>
    <div className="mt-6 space-y-8">
      {/* Phone Section */}
      <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-lg">
        <div className="text-red-600 text-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 7l4-4m0 0l4 4m-4-4v12"
            />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-gray-800">📞 Phone</p>
          <p className="text-gray-600 text-lg">+123 456 7890</p>
        </div>
      </div>

      {/* Email Section */}
      <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-lg">
        <div className="text-red-600 text-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 12V8l4-4M4 4l16 16"
            />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-gray-800">✉️ Email</p>
          <p className="text-gray-600 text-lg">contact@electroplus.com</p>
        </div>
      </div>

      {/* Location Section */}
      <div className="flex items-center space-x-4 p-6 bg-white rounded-lg shadow-lg">
        <div className="text-red-600 text-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10z"
            />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-gray-800">🏠 Our Location</p>
          <p className="text-gray-600 text-lg">
            123 ElectroPlus St, Tech City, 54321
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default ContactInfo;
