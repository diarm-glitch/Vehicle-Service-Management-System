import { useState } from "react";
import api from "../api/api";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [emri, setEmri] = useState("");
  const [mbiemri, setMbiemri] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/users", {
        emri,
        mbiemri,
        email,
        password,
        phone_number,
      });

      alert("Account created successfully!");

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">

        <h2>Create Account</h2>

        <p className="auth-subtitle">
          Create your account to continue
        </p>

        <form onSubmit={handleRegister} className="login-box-form">

          <input
            type="text"
            placeholder="First Name"
            value={emri}
            onChange={(e) => setEmri(e.target.value)}
            className="login-input"
          />

          <input
            type="text"
            placeholder="Last Name"
            value={mbiemri}
            onChange={(e) => setMbiemri(e.target.value)}
            className="login-input"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="login-input"
          />

          <button type="submit" className="login-btn">
            Create Account
          </button>

        </form>

        <p className="register-text">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>

        <p style={{ marginTop: "15px" }}>
          <Link to="/" className="back-home">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;