import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./InputLearning.css";

const LearningPage = () => {
  const [newResource, setNewResource] = useState("");

  // useEffect(() => {
  //   fetchLearningResources();
  // }, []);

  // const fetchLearningResources = () => {
  //   // Fetch learning resources from the API
  //   fetch("https://api.example.com/learning-resources")
  //     .then((response) => response.json())
  //     .then((data) => setResources(data));
  // };

  // const handleAddResource = () => {
  //   // Create a new learning resource on the API
  //   fetch("https://api.example.com/learning-resources", {
  //     method: "POST",
  //     body: JSON.stringify({ resource: newResource }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setResources([...resources, data]);
  //       setNewResource("");
  //     });
  // };

  return (
    <div className="learning-page">
      <div className="left">
        <div className="content">
          <h2>
            Learning <br />
            Academy <br />
            Admin
          </h2>
          <p>Pengaturan daftar training learning academy</p>
          <Link to="/admin/learning">
            <button>Exit & Save</button>
          </Link>
        </div>
      </div>
      <div className="input-field">
        <div className="top-field">
          <h2>Judul Panjang</h2>
          <input />
        </div>
        <div className="mid-field">
          <div className="mid-left mid">
            <h2>Judul Pendek</h2>
            <input />
          </div>
          <div className="mid-center mid">
            <h2>Tanggal Mulai</h2>
            <input type="date" />
          </div>
          <div className="mid-right mid">
            <h2>Tanggal Selesai</h2>
            <input type="date" />
          </div>
        </div>
        <div className="bottom-field">
          <div className="bottom-left bottom">
            <h2>Color Scheme</h2>
            <div className="color-code">462200</div>
            <div
              className="color-scheme"
              style={{ backgroundColor: "#462200" }}
            ></div>
          </div>
          <div className="bottom-center bottom">
            <h2>Text Color</h2>
            <div className="color-name">White</div>
            <div
              className="text-color"
              style={{ backgroundColor: "white" }}
            ></div>
          </div>
          <div className="bottom-right bottom">
            <h2>Preview</h2>
            <div className="preview"></div>
          </div>
        </div>
        <div className="outline-field">
          <h2>Outline Training</h2>
          <textarea></textarea>
        </div>

        {/* <input
        type="text"
        placeholder="Add a new learning resource"
        value={newResource}
        onChange={(e) => setNewResource(e.target.value)}
      />
      <button onClick={handleAddResource}>Add</button> */}
      </div>
    </div>
  );
};

export default LearningPage;
