// src/ElectroBotPage.jsx
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ElectroBotPage = () => {
  const [userInput, setUserInput] = useState("");  // User's input
  const [conversation, setConversation] = useState([]);  // To store the conversation history
  const [loading, setLoading] = useState(false);  // To show loading while waiting for the response

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInput) return;  // Do nothing if input is empty

    // Add user's message to conversation
    setConversation((prev) => [
      ...prev,
      { type: "user", message: userInput },
    ]);

    setLoading(true);

    try {
      // Make the API call
      const res = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "hf.co/Dakuiii/Electro_arabic_chatbot-Meta-Llama-3.2-3B-GGUF:latest",
          prompt: userInput,  // Send user input as prompt
          stream: false,
        }),
      });
      const data = await res.json();
      // Add bot's response to the conversation
      setConversation((prev) => [
        ...prev,
        { type: "bot", message: data.response },
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setUserInput("");  // Clear input field after submission
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <div className="flex-grow p-4">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-black-600 mb-6">
          Welcome to ElectroBot! How can I help you?
        </h1>

        {/* Display conversation */}
        <div className="chat-box bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto h-96 overflow-y-auto">
          {conversation.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 ${
                msg.type === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block px-6 py-3 rounded-lg ${
                  msg.type === "user"
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
        </div>

        {/* Input field for new messages */}
        <form onSubmit={handleSubmit} className="mt-6 flex items-center space-x-4 max-w-4xl mx-auto">
          <input
            type="text"
            className="flex-grow p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Type your question..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md transition-all hover:bg-green-600 focus:outline-none"
            disabled={loading}
          >
            {loading ? "Loading..." : "Send"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ElectroBotPage;
