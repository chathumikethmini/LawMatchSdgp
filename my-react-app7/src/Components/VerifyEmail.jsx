import React, { useState } from "react";
import "./VerifyEmail.css";

const VerifyEmail = () => {
  const [code, setCode] = useState("");

  const handleVerification = (e) => {
    e.preventDefault();
    // Logic for email verification (e.g., API call)
  };

  return (
    <div className="verify-email-container">
      <h2>Verify Your Email</h2>
      <p>We’ve sent you a code. Please enter it below to verify your account.</p>
      <form onSubmit={handleVerification}>
        <input
          type="text"
          placeholder="Enter verification code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default VerifyEmail;
