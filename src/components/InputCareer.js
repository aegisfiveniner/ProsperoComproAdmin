import React from "react";
import { Link } from "react-router-dom";
import "./InputCareer.css";

const InputCareer = () => {
  return (
    <div className="career-page">
      <div className="career-sidebar">
        <div className="career-sidebar-content">
          <h2>
            Career <br />
            Admin
          </h2>
          <p>Pengaturan daftar Job Opening Prospero Solutions</p>
          <Link to="/admin/career">
            <button>Exit & Save</button>
          </Link>
        </div>
      </div>
      <div className="career-input-field">
        <div className="career-top-field">
          <div className="career-top-left career-top">
            <h2>Job</h2>
            <input />
          </div>
          <div className="career-top-center career-top">
            <h2>Start</h2>
            <input type="date" />
          </div>
          <div className="career-top-right career-top">
            <h2>End</h2>
            <input type="date" />
          </div>
        </div>
        <div className="career-mid-field">
          <h2>Description</h2>
          <textarea></textarea>
        </div>
        <div className="career-bottom-field">
          <h2>Requirement</h2>
          <textarea></textarea>
        </div>
      </div>
    </div>
  );
};

export default InputCareer;
