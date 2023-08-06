import React, { useState } from "react";
import "./Login.css";
import home1background from "../assets/home1-background.svg";
import { Link, useNavigate } from "react-router-dom";
const Swal = require("sweetalert2");

const home1Style = {
  backgroundImage: `url(${home1background})`,
  backgroundSize: `100%`,
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(process.env.REACT_APP_API_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); // Extract JSON data from the response
      console.log(data); // Now this should include the "token" key

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/learning"); // Redirect after successful login
      } else {
        Swal.fire({
          icon: "error",
          title: "Unauthorized",
          text: "email or password incorrect",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error,
        text: error,
      });
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="login-container" style={home1Style}>
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-container">
            <div className="form-group">
              <label>User ID:</label>
              <input
                type="email"
                placeholder="User ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="button-group">
              <button type="submit">Login</button>
              <button className="home-button">Homepage</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
