// src/ContactPage.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactInfo from "../components/ContactInfo";
import ContactForm from "../components/ContactForm";

const ContactPage = () => (
  <div className="min-h-screen bg-gray-100 flex flex-col">
    <Header />

    <main className="flex-grow container mx-auto px-6 py-12">
      <section className="flex flex-col md:flex-row gap-12">
        {/* Contact Information */}
        <ContactInfo />

        {/* Contact Form */}
        <ContactForm />
      </section>
    </main>

    <Footer />
  </div>
);

export default ContactPage;
