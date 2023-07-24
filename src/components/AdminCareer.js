import React from "react";
import { Link } from "react-router-dom";
import "./AdminCareer.css";

const jobs = [
  {
    id: 1,
    description: "Frontend developer",
    createdDate: "6 December 2022",
    expiredDate: "6 December 2023",
  },
  {
    id: 2,
    description: "Backend developer",
    createdDate: "6 December 2022",
    expiredDate: "6 December 2023",
  },
  {
    id: 1,
    description: "Copywriter",
    createdDate: "6 December 2022",
    expiredDate: "6 December 2023",
  },
];

const AdminCareer = () => {
  return (
    <div className="career-page">
      <div className="career-sidebar">
        <div className="career-sidebar-content">
          <h2>
            Career <br />
            Admin
          </h2>
          <p>Pengaturan daftar Job Opening Prospero Solutions</p>
          <Link>
            <button>Exit & Save</button>
          </Link>
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
          {jobs.map((job) => (
            <div
              className="career-card"
              style={{
                listStyleType: "none",
              }}
            >
              <li key={job.id}>
                <div className="career-jobdesc">{job.description}</div>
                <div className="career-start">{job.createdDate}</div>
                <div className="career-expired">{job.expiredDate}</div>
                <div className="career-edit">
                  <Link to="/admin/input-career">
                    <button className="edit-button">Edit</button>
                  </Link>
                  <button className="delete-button">Delete</button>
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
