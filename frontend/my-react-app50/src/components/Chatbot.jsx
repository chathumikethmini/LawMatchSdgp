import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Message from "./Message";
import InputBox from "./InputBox";
import "../styles/chatbot.css";

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { text: "Welcome to LawMatch, your AI-powered legal assistant!", sender: "bot" }
    ]);
    const chatRef = useRef(null);

    const sendMessage = async (text) => {
        if (!text.trim()) return;

        const userMessage = { text, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);

        try {
            const response = await axios.post("http://127.0.0.1:5000/chatbot", { query: text });

            // Add the bot's primary response
            const botMessage = { text: response.data.answer, sender: "bot" };
            setMessages((prev) => [...prev, botMessage]);

            // If there's a follow-up message, add it after a short delay
            if (response.data.follow_up) {
                setTimeout(() => {
                    setMessages((prev) => [
                        ...prev,
                        { text: response.data.follow_up, sender: "bot" }
                    ]);
                }, 1000);
            }
        } catch (error) {
            setMessages((prev) => [...prev, { text: "Error fetching response.", sender: "bot" }]);
        }
    };

    useEffect(() => {
        chatRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="chat-container">
            <div className="chat-box">
                <div className="chat-header">⚖️ LawMatch Chatbot</div>
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <Message key={index} text={msg.text} sender={msg.sender} />
                    ))}
                    <div ref={chatRef}></div>
                </div>
                <InputBox sendMessage={sendMessage} />
            </div>
        </div>
    );
};

export default Chatbot;
