import React, { useState, useEffect } from "react";
import "./chatPopup.css"; // Keep styling separate

const ChatPopup = ({ messages, setMessages, onClose }) => {
  const [input, setInput] = useState("");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepQueue, setStepQueue] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    setMessages([...messages, userMessage]);

    try {
      const response = await fetch("http://localhost:5000/getSteps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });

      const data = await response.json();

      if (data.steps) {
        let formattedSteps = data.steps.map((step) => ({
          text: step,
          isBot: true,
          isDivider: false,
        }));

        let stepsWithArrays = [];
        for (let i = 0; i < formattedSteps.length; i++) {
          stepsWithArrays.push(formattedSteps[i]);
          if (i !== formattedSteps.length - 1) {
            stepsWithArrays.push({ text: "[ ]", isBot: true, isDivider: true }); // Centered divider
          }
        }

        // Queue steps for delayed display
        setStepQueue([{ text: `**${data.title}**`, isBot: true }, ...stepsWithArrays]);
        setCurrentStepIndex(0);
      } else {
        setMessages((prev) => [...prev, { text: "Procedure not found.", isBot: true }]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { text: "Error retrieving procedure.", isBot: true }]);
    }

    setInput("");
  };

  // Function to show next step with delay
  useEffect(() => {
    if (stepQueue.length > 0 && currentStepIndex < stepQueue.length) {
      const timeout = setTimeout(() => {
        setMessages((prev) => [...prev, stepQueue[currentStepIndex]]);
        setCurrentStepIndex(currentStepIndex + 1);
      }, 1200); // 1.2 sec delay

      return () => clearTimeout(timeout);
    }
  }, [currentStepIndex, stepQueue, setMessages]);

  // Handle "Enter" key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-popup-full">
      <div className="chat-header">
        <h2>Legal Navigator</h2>
        <button className="close-btn" onClick={onClose}>✖</button>
      </div>
      <div className="chat-content">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.isDivider ? "divider-message" : msg.isBot ? "bot-message" : "user-message"}
          >
            {msg.isDivider ? (
              <div style={{ textAlign: "center", width: "100%" }}>[ ]</div> // Centered [ ]
            ) : (
              msg.text
            )}
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <div className="chat-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress} // Enable Enter key
            placeholder="Ask about a legal procedure..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
