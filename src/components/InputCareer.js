import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./InputCareer.css";

const InputCareer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editingCareer = location.state ? location.state.editingCareer : null;

  const [newResource, setNewResource] = useState({
    title: "",
    startDate: null,
    endDate: null,
    description: "",
    requirement: "",
  });

  useEffect(() => {
    if (editingCareer) {
      console.log(editingCareer);
      let rawStartDate = editingCareer?.startDate;
      let rawEndDate = editingCareer?.endDate;
      const formattedStartDate = rawStartDate?.slice(0, 10);
      const formattedEndDate = rawEndDate?.slice(0, 10);

      const newResObj = {
        title: editingCareer.title,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        description: editingCareer.description,
        requirement: editingCareer.requirement,
      };

      setNewResource(newResObj);
    }
  }, [editingCareer]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewResource({
      ...newResource,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission
    // For example, you can send the form data to the server using fetch or Axios
    // console.log(newResource); // Just to display the data in the console

    // const formData = new FormData();
    // formData.append("title", newResource.title);
    // formData.append("startDate", newResource.startDate);
    // formData.append("endDate", newResource.endDate);
    // formData.append("description", newResource.description);
    // formData.append("requirement", newResource.requirement);

    const apiUrl = editingCareer
      ? `${process.env.REACT_APP_API_URL}/jobs/${editingCareer.id}`
      : `${process.env.REACT_APP_API_URL}/jobs`;

    const method = editingCareer ? "PUT" : "POST";

    const token = localStorage.getItem("token");

    fetch(apiUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token} }`,
      },
      body: JSON.stringify(newResource),
    })
      .then((response) => response.json())
      .then((data) => {
        // setResources([...resources, data]);
        setNewResource("");
      })
      .catch((error) => {
        console.log("Error adding resource:", error);
      });
  };

  const handleFormSubmit = () => {
    // Trigger the form submission when the button is clicked
    const form = document.getElementById("learning-form");
    form.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
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
          <Link to="/career" onClick={handleFormSubmit}>
            <button>Exit & Save</button>
          </Link>
        </div>
      </div>
      <form id="learning-form" onSubmit={handleSubmit}>
        <div className="career-input-field">
          <div className="career-top-field">
            <div className="career-top-left career-top">
              <h2>Job</h2>
              <input
                required
                type="text"
                name="title"
                value={newResource.title}
                onChange={handleChange}
              />
            </div>
            <div className="career-top-center career-top">
              <h2>Start</h2>
              <input
                required
                type="date"
                name="startDate"
                value={newResource.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="career-top-right career-top">
              <h2>End</h2>
              <input
                required
                type="date"
                name="endDate"
                value={newResource.endDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="career-mid-field">
            <h2>Description</h2>
            <textarea
              required
              type="text"
              name="description"
              value={newResource.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="career-bottom-field">
            <h2>Requirement</h2>
            <textarea
              required
              type="text"
              name="requirement"
              value={newResource.requirement}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputCareer;
