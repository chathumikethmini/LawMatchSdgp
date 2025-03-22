import React, { useState } from "react";
import Header from "./Header";
import ImageSection from "./ImageSection";
import StepsSection from "./StepsSection";
import ConnectButton from "./ConnectButton";
import ChatPopup from "./ChatPopup";
import "./styles.css"; 

const KnowledgeGraph = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);

  const openNavigator = async () => {
    setShowChat(true);
    try {
      const response = await fetch("http://localhost:5000/greet");
      const data = await response.json();
      setMessages([{ text: data.message, isBot: true }]);
    } catch (error) {
      console.error("Error connecting to backend:", error);
    }
  };

  return (
    <div className="knowledge-graph">
      <Header />
      <ImageSection />
      <StepsSection />
      <ConnectButton onOpen={openNavigator} />
      {showChat && <ChatPopup messages={messages} setMessages={setMessages} onClose={() => setShowChat(false)} />}
    </div>
  );
};

export default KnowledgeGraph;
