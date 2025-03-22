import React, { useState } from "react";
import "../styles/chatbot.css";

const InputBox = ({ sendMessage }) => {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(input);
        setInput("");
    };

    return (
        <form className="input-box" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Ask a legal question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">➤</button>
        </form>
    );
};

export default InputBox;
