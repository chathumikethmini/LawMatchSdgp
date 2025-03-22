import React from "react";
import { FaBalanceScale, FaGavel, FaBookOpen } from "react-icons/fa";

const StepsSection = () => {
  return (
    <div className="steps-container">
      <h2>How It Works:</h2>
      <div className="steps-grid">
        {/* Step 1 */}
        <div className="step-card">
          <FaBalanceScale className="step-icon" />
          <h3>Select Your Case</h3>
          <p>Choose the legal category relevant to your case.</p>
        </div>

        {/* Step 2 */}
        <div className="step-card">
          <FaGavel className="step-icon" />
          <h3>View Procedures</h3>
          <p>Get step-by-step legal guidance tailored to your situation.</p>
        </div>

        {/* Step 3 */}
        <div className="step-card">
          <FaBookOpen className="step-icon" />
          <h3>Take Action</h3>
          <p>Connect with legal resources and proceed confidently.</p>
        </div>
      </div>
    </div>
  );
};

export default StepsSection;
