import React, { useState } from "react";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      // Logic for resetting password (e.g., API call)
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Create a New Password</h2>
      <form onSubmit={handlePasswordReset}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
