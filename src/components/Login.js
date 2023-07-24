import React from "react";
import "./Login.css";
import home1background from "../assets/home1-background.svg";
import riskmanagementbetter from "../assets/risk-manajemen-better.svg";
import completesolution from "../assets/complete-solution.svg";
import { Link } from "react-router-dom";

const home1Style = {
  backgroundImage: `url(${home1background})`,
  backgroundSize: `100%`,
};

const Login = () => {
  return (
    <div className="login-container" style={home1Style}>
      <div className="login-form">
        <h2>Login</h2>
        <form>
          <div className="form-container">
            <div className="form-group">
              <label>User ID:</label>
              <input type="email" placeholder="User ID" />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" placeholder="Password" />
            </div>
            <div className="button-group">
              <Link to="/admin/learning">
                <button type="submit">Login</button>
              </Link>
              <button className="home-button">Homepage</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
