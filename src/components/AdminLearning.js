import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert
import "./AdminLearning.css";

const LearningPage = () => {
  const cardColors = ["#462200", "#2D354A", "#1F546E", "#3F6490", "#878883"];

  const [colors, setColors] = useState([{ id: 0, name: "", hex: "" }]);

  const cardColorLoop = (index) => {
    if (index > cardColors.length - 1) {
      return index - cardColors.length;
    } else {
      return index;
    }
  };
  const navigate = useNavigate();

  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetchLearningResources();
  }, []);

  const token = localStorage.getItem("token");

  const fetchLearningResources = () => {
    // Fetch learning resources from the API
    fetch(`${process.env.REACT_APP_API_URL}/trainings`, {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => setResources(data));
  };

  const handleEditLearning = (learning) => {
    navigate("/input-learning", { state: { editingLearning: learning } });
  };

  const handleDeleteLearning = (learningId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${process.env.REACT_APP_API_URL}/trainings/${learningId}`, {
          method: "DELETE",
          headers: { Authorization: token },
        })
          .then((response) => response.json())
          .then((data) => {
            // If the deletion is successful, update the resources by filtering out the deleted job
            setResources((prevResources) =>
              prevResources.filter((job) => job.id !== learningId)
            );
            // Show a success popup using SweetAlert
            Swal.fire("Deleted!", "The learning has been deleted.", "success");
          })
          .catch((error) => {
            console.log("Error deleting job:", error);
            // Show an error popup using SweetAlert
            Swal.fire("Error!", "Failed to delete the learning.", "error");
          });
      }
    });
  };

  const fetchColors = () => {
    // Fetch learning resources from the API
    fetch(process.env.REACT_APP_API_URL + "/colors")
      .then((response) => response.json())
      .then((data) => {
        setColors(data);
        // setSelectedTextColorHex(data[0]?.hex);
        // setSelectedSchemeColorHex(data[0]?.hex);
      });
  };

  useEffect(() => {
    fetchColors();
    // console.log(colors);
  }, []);

  const findHex = (colorId) => {
    const foundColor = colors.find((color) => colorId === color.id);

    if (foundColor) {
      return foundColor.hex;
    } else {
      return null; // or some default value if colorId is not found
    }
  };

  const convertDate = (date) => {
    const options = {
      // weekday: "long",
      // year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = new Date(date);
    const localdate = formattedDate.toLocaleDateString("id-ID", options);
    return localdate;
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
          <Link to="/input-learning" className="add-button">
            Add
          </Link>
          <button style={{ display: "none" }}>Exit & Save</button>
        </div>
      </div>
      <div className="learning-list">
        <div className="learning-header">
          <ul>
            <h2>Thumbnail</h2>
            <h2>Judul Lengkap</h2>
            <h2>Tanggal Training</h2>
            <h2>Action</h2>
          </ul>
        </div>
        <div>
          <ul className="card-container">
            {resources.map((resource, index) => (
              <div
                className="learning-card"
                style={{
                  backgroundColor: findHex(resource.backgroundColorId),
                  listStyleType: "none",
                }}
              >
                <li>
                  <div className="learning-pic">
                    <img
                      src={process.env.REACT_APP_API_URL + "/" + resource.image}
                    />
                  </div>
                  <div
                    className="learning-title"
                    style={{ color: findHex(resource.textColorId) }}
                  >
                    {resource.title}
                  </div>
                  <div
                    className="learning-date"
                    style={{ color: findHex(resource.textColorId) }}
                  >
                    {convertDate(resource.startDate)} -{" "}
                    {convertDate(resource.endDate)}
                  </div>
                  <div className="learning-edit">
                    <button
                      className="edit-button"
                      onClick={() => handleEditLearning(resource)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() => handleDeleteLearning(resource.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              </div>
            ))}
          </ul>
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
