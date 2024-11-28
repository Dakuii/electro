// src/Footer.jsx

// You can use a library like react-icons for social media icons
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-primary text-white py-6 px-6 mt-16">
    <div className="container mx-auto text-center">
      {/* Company Information */}
      <p className="mb-4">
        &copy; {new Date().getFullYear()} Electro+. All rights reserved.
      </p>

      {/* Links Section - Horizontal layout */}
      <div className="flex justify-center space-x-12 mb-6">
        <a href="#" className="hover:text-gray-200">
          About Us
        </a>
        <a href="#" className="hover:text-gray-200">
          Contact
        </a>
        <a href="#" className="hover:text-gray-200">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-gray-200">
          Terms & Conditions
        </a>
      </div>

      {/* Social Media Links - Horizontal layout */}
      <div className="flex justify-center space-x-8 mb-6">
        <a href="#" className="hover:text-gray-200">
          <FaFacebook size={28} />
        </a>
        <a href="#" className="hover:text-gray-200">
          <FaTwitter size={28} />
        </a>
        <a href="#" className="hover:text-gray-200">
          <FaInstagram size={28} />
        </a>
        <a href="#" className="hover:text-gray-200">
          <FaLinkedin size={28} />
        </a>
      </div>

      {/* Additional Note */}
      <p className="text-sm">
        For any inquiries, feel free to{" "}
        <a
          href="mailto:support@electroshop.com"
          className="underline hover:text-gray-200"
        >
          contact us
        </a>
        .
      </p>
    </div>
  </footer>
);

export default Footer;
