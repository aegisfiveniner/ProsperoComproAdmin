import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert
import "./AdminCareer.css";

const AdminCareer = () => {
  const [resources, setResources] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchJobResources();
  }, []);

  const token = localStorage.getItem("token");

  const fetchJobResources = () => {
    // Fetch learning resources from the API
    fetch(`${process.env.REACT_APP_API_URL}/jobs`, {
      headers: { Authorization: token },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResources(data);
      });
  };

  const handleEditCareer = (career) => {
    navigate("/input-career", { state: { editingCareer: career } });
  };

  const handleDeleteJob = (jobId) => {
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
        fetch(`${process.env.REACT_APP_API_URL}/jobs/${jobId}`, {
          method: "DELETE",
          headers: { Authorization: token },
        })
          .then((response) => response.json())
          .then((data) => {
            // If the deletion is successful, update the resources by filtering out the deleted job
            setResources((prevResources) =>
              prevResources.filter((job) => job.id !== jobId)
            );
            // Show a success popup using SweetAlert
            Swal.fire("Deleted!", "The job has been deleted.", "success");
          })
          .catch((error) => {
            console.log("Error deleting job:", error);
            // Show an error popup using SweetAlert
            Swal.fire("Error!", "Failed to delete the job.", "error");
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
    <div className="career-page">
      <div className="career-sidebar">
        <div className="career-sidebar-content">
          <h2>
            Career <br />
            Admin
          </h2>
          <p>Pengaturan daftar Job Opening Prospero Solutions</p>
          <div className="buttons">
            <Link to="/input-career" className="add-button">
              Add
            </Link>
            <Link>
              <button style={{ display: "none" }}>Exit & Save</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="career-list">
        <div className="career-header">
          <ul>
            <h2 className="jobdesc-header">Jobdesk</h2>
            <h2 className="start-header">Start</h2>
            <h2 className="expired-header">Expired</h2>
            <h2 className="action-header">Action</h2>
          </ul>
        </div>
        <ul>
          {resources.map((job) => (
            <div
              className="career-card"
              style={{
                listStyleType: "none",
              }}
            >
              <li key={job.id}>
                <div className="career-jobdesc">{job.title}</div>
                <div className="career-start">{convertDate(job.startDate)}</div>
                <div className="career-expired">{convertDate(job.endDate)}</div>
                <div className="career-edit">
                  <button
                    className="edit-button"
                    onClick={() => handleEditCareer(job)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => handleDeleteJob(job.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminCareer;
