import React from "react";
import "../styles/chatbot.css";

const Message = ({ text, sender }) => {
    return (
        <div className={`message ${sender}`}>
            <div className="message-bubble">{text}</div>
        </div>
    );
};

export default Message;
