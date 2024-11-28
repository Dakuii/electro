// src/AboutPage.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import AboutStory from "../components/AboutStory"; // Import the new component
import AboutValues from "../components/AboutValues"; // Import the AboutValues component

const AboutPage = () => (
  <div className="min-h-screen bg-gray-100 flex flex-col">
    <Header />

    <main className="flex-grow container mx-auto px-6 py-12">
      <AboutStory />
      <AboutValues /> {/* Add the AboutValues component here */}
    </main>

    <Footer />
  </div>
);

export default AboutPage;
