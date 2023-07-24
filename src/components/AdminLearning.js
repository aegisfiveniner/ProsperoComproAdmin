import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminLearning.css";

const LearningPage = () => {
  const cardColors = ["#462200", "#2D354A", "#1F546E", "#3F6490", "#878883"];

  const [resources, setResources] = useState([
    {
      id: 1,
      title:
        "Learning1 Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
      date: "6 - 8 December",
    },
    {
      id: 2,
      title:
        "Learning2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet semper ex, bibendum aliquam sapien",
      date: "9 - 10 December",
    },
    {
      id: 3,
      title:
        "Learning3 Nunc suscipit quam nunc, a placerat purus posuere eu. Nam eleifend, libero sed gravida aliquam, urna diam interdum dolor",
      date: "11 - 12 December",
    },
    {
      id: 4,
      title:
        "Learning4 Sed eleifend purus eget diam rutrum, pretium lobortis risus laoreet. Praesent quis vulputate diam, sit amet vestibulum neque",
      date: "13 - 14 December",
    },
    {
      id: 5,
      title:
        "Learning5 Nunc auctor enim vel felis consequat pretium. Phasellus porttitor turpis at aliquet lacinia",
      date: "15 - 16 December",
    },
  ]);
  const [newResource, setNewResource] = useState("");

  useEffect(() => {
    fetchLearningResources();
  }, []);

  const fetchLearningResources = () => {
    // Fetch learning resources from the API
    fetch(`http://localhost:8080/trainings`)
      .then((response) => response.json())
      .then((data) => setResources(data));
  };

  const handleAddResource = () => {
    // Create a new learning resource on the API
    fetch("https://api.example.com/learning-resources", {
      method: "POST",
      body: JSON.stringify({ resource: newResource }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setResources([...resources, data]);
        setNewResource("");
      });
  };

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
          <button>Exit & Save</button>
        </div>
      </div>
      <div className="learning-list">
        <div className="learning-header">
          <ul>
            <h2>Thumbnail</h2>
            <h2>Judul Lengkap</h2>
            <h2>Tanggal Training</h2>
          </ul>
        </div>

        <ul>
          {resources.map((resource, index) => (
            <div
              className="learning-card"
              style={{
                backgroundColor: cardColors[index],
                listStyleType: "none",
              }}
            >
              <li key={resource.id}>
                <div className="learning-pic">
                  <img src={"http://localhost:8080/" + resource.image} />
                  {resource.image}
                </div>
                <div className="learning-title">{resource.title}</div>
                <div className="learning-date">{resource.date}</div>
                <div className="learning-edit">
                  <Link to="/admin/input-learning">
                    <button>Edit</button>
                  </Link>
                </div>
              </li>
            </div>
          ))}
        </ul>
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
