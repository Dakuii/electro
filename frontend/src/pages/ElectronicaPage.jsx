import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { FaSpinner } from 'react-icons/fa'; // Add a spinner icon for loading state

const ElectronicaPage = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResponse("");

    try {
      // Make a POST request to the FastAPI endpoint
      const res = await axios.post("http://127.0.0.1:8000/ask", {
        question,
      });

      setResponse(res.data.response); // Display the response
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Ask Electronica</h1>
        <p className="text-lg text-gray-600 mb-6">Electronica is an AI Arabic Chatbot specialized in electronics. Ask her questions!</p>

        <div className="w-full max-w-lg p-6 bg-white shadow-xl rounded-lg border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4">
              <label htmlFor="question" className="block text-sm font-medium text-gray-700">
                Enter your question
              </label>
              <input
                id="question"
                type="text"
                value={question}
                onChange={handleInputChange}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                placeholder="Ask your question here..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200"
            >
              {loading ? <FaSpinner className="animate-spin mx-auto" /> : 'Submit'}
            </button>
          </form>
        </div>

        {loading && (
          <div className="mt-4 flex items-center justify-center text-gray-700">
            <FaSpinner className="animate-spin mr-2" />
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <p className="mt-4 text-red-600 text-lg flex items-center">
            <span className="mr-2">⚠️</span>{error}
          </p>
        )}

        {response && (
          <p className="mt-4 text-green-600 text-lg flex items-center">
            <span className="mr-2">✅</span>{response}
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ElectronicaPage;
