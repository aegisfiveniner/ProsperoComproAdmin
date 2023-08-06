import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert
import "./AdminArchive.css";

const ArchivePage = () => {
  // const cardColors = ["#462200", "#2D354A", "#1F546E", "#3F6490", "#878883"];

  const [resources, setResources] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchArchiveResources();
  }, []);

  const token = localStorage.getItem("token");

  const fetchArchiveResources = () => {
    // Fetch learning resources from the API
    fetch(`${process.env.REACT_APP_API_URL}/archives`, {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => {
        setResources(data);
      });
  };

  const handleEditArchive = (archive) => {
    navigate("/input-archive", { state: { editingArchive: archive } });
  };

  const handleDeleteArchive = (archiveId) => {
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
        fetch(`${process.env.REACT_APP_API_URL}/archives/${archiveId}`, {
          method: "DELETE",
          headers: { Authorization: token },
        })
          .then((response) => response.json())
          .then((data) => {
            // If the deletion is successful, update the resources by filtering out the deleted job
            setResources((prevResources) =>
              prevResources.filter((job) => job.id !== archiveId)
            );
            // Show a success popup using SweetAlert
            Swal.fire("Deleted!", "The archive has been deleted.", "success");
          })
          .catch((error) => {
            console.log("Error deleting archive:", error);
            // Show an error popup using SweetAlert
            Swal.fire("Error!", "Failed to delete the archive.", "error");
          });
      }
    });
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
    <div className="archive-page">
      <div className="left">
        <div className="content">
          <h2>
            Learning <br />
            Academy <br />
            Admin
          </h2>
          <p>Pengaturan daftar arsip learning academy</p>
          <Link to="/input-archive" className="add-button">
            Add
          </Link>
          <button style={{ display: "none" }}>Exit & Save</button>
        </div>
      </div>
      <div className="archive-list">
        <div className="learning-header">
          <ul>
            <h2>Thumbnail</h2>
            <h2>Judul</h2>
            <h2>Tanggal Training</h2>
            <h2>Action</h2>
          </ul>
        </div>

        <ul>
          {resources.map((resource, index) => (
            <div
              className="archive-card"
              style={{
                listStyleType: "none",
              }}
            >
              <li key={resource.id}>
                <div className="archive-pic">
                  <img
                    src={process.env.REACT_APP_API_URL + "/" + resource.image}
                  />
                </div>
                <div className="archive-title">{resource.title}</div>
                <div className="archive-date">
                  {convertDate(resource.startDate)} -
                  {convertDate(resource.endDate)}
                </div>
                <div className="archive-edit">
                  <button
                    className="edit-button"
                    onClick={() => handleEditArchive(resource)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteArchive(resource)}
                  >
                    Delete
                  </button>
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

export default ArchivePage;
