import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to your backend to generate and send OTP to the provided email
    axios
      .post("http://localhost:3000/forgot-password", { email })
      .then((response) => {
        console.log(response.data); // Handle success (OTP sent)
      })
      .catch((error) => {
        console.error("Error sending OTP:", error); // Handle error
      });
  };

  return (
    <div className="bg-white p-3 rounded w-25">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            autoComplete="off"
            name="email"
            className="form-control rounded-0"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success w-100 rounded-0">
          Send OTP
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
