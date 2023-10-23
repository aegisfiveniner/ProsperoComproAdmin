import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert
import "./AdminLearning.css";

const LearningPage = () => {
  const cardColors = ["#462200", "#2D354A", "#1F546E", "#3F6490", "#878883"];
  const [month, setMonth] = useState(null)
  const [months, setMonths] = useState([
    {
    month: "Januari",
    value: 0
    },
    {
    month: "Februari",
    value: 1
    },
    {
    month: "Maret",
    value: 2
    },
    {
    month: "April",
    value: 3
    },
    {
    month: "Mei",
    value: 4
    },
    {
    month: "Juni",
    value: 5
    },
    {
    month: "Juli",
    value: 6
    },
    {
    month: "Agustus",
    value: 7
    },
    {
    month: "September",
    value: 8
    },
    {
    month: "Oktober",
    value: 9
    },
    {
    month: "November",
    value: 10
    },
    {
    month: "Desember",
    value: 11
    },

])

  const token = localStorage.getItem("token");

  const handleMonthChange = (e) => {
    const selectedMonthValue = e.target.value;
        // Do something with the selected month, e.g., update state
    // setMonth(selectedMonthValue);

    const newMonth = {"month": selectedMonthValue}


    const apiUrl = `${process.env.REACT_APP_API_URL}/month`;

    const method = "POST"


    fetch(apiUrl, {
      method,

      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },

      body: JSON.stringify(newMonth),
    })
      .then((response) => response.json())
      .then((data) => {
        setMonth(data.month);
      })
      .catch((error) => {
        console.log("Error adding resource:", error);
      });
  
  }



  const [colors, setColors] = useState([{ id: 0, name: "", hex: "" }]);


  const navigate = useNavigate();

  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetchLearningResources(month);
    fetchSelectedMonth()
  }, [month]);



  const fetchSelectedMonth = () => {

    // Fetch learning resources from the API
    fetch(`${process.env.REACT_APP_API_URL}/pub/month`)
      .then((response) => response.json())
      .then((data) => setMonth(data.month));
  };

  const fetchLearningResources = (month) => {

    // Fetch learning resources from the API
    fetch(`${process.env.REACT_APP_API_URL}/trainings?month=${month}`, {
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
      <div className="month-header"><p>
        Bulan Training :
        </p>
        <select className="month-selection" onChange={handleMonthChange} value={month}>
{months.map((m) => 
  (<option key={m.value} value={m.value}>{m.month}</option>)
)}
          </select>
      </div>
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
                  backgroundColor: resource.backgroundColor,
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
                    style={{ color: resource.textColor }}
                  >
                    {resource.title}
                  </div>
                  <div
                    className="learning-date"
                    style={{ color: resource.textColor }}
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
