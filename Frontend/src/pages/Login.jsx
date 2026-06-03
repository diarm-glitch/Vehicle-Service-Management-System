import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api.js";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const response = await API.post("/auth/login", {
                email,
                password
            });

            console.log(response.data);

            console.log("ROLE IS:", response.data.user.role);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.user.role);
            localStorage.setItem("userId", response.data.user.id);
            localStorage.setItem("emri", response.data.user.emri);
            localStorage.setItem("mbiemri", response.data.user.mbiemri);
            
            alert("Login successful");

            const userRole = response.data.user.role;

            if (userRole === "User" || userRole === "Premium User") {
            window.location.href = "/profile";
            } else {
            window.location.href = "/dashboard";
            }

        } catch (error) {

            console.log(error);

            alert("Login failed");
        }
    };

    return (
        <div className="login-page">

            <div className="login-box">

                <h2>Sign in</h2>

                <p className="auth-subtitle">
                    Sign in to continue to your dashboard
                </p>

                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="email"
                        className="login-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="password"
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" className="login-btn">
                        Sign in
                    </button>

                </form>

                <p className="register-text">
                    Don’t have an account?
                    <Link to="/register"> Get Started</Link>
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

export default Login;