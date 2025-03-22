import React from "react";

const ConnectButton = ({ onOpen }) => {
  return (
    <div className="button-container">
      <button className="navigator-button" onClick={onOpen}>
        🔍 Open Legal Navigator
      </button>
    </div>
  );
};

export default ConnectButton;
