import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./InputArchive.css";

const InputArchivePage = ({ resources, setResources }) => {
  const location = useLocation();
  const editingArchive = location.state ? location.state.editingArchive : null;

  const [newResource, setNewResource] = useState({
    title: "",
    startDate: null,
    endDate: null,
    image: null,
  });

  useEffect(() => {
    if (editingArchive) {
      let rawStartDate = editingArchive?.startDate;
      let rawEndDate = editingArchive?.endDate;
      const formattedStartDate = rawStartDate?.slice(0, 10);
      const formattedEndDate = rawEndDate?.slice(0, 10);
      console.log(editingArchive.title);

      const newResObj = {
        title: editingArchive.title,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        image: editingArchive.image,
      };

      setNewResource(newResObj);
    }
  }, [editingArchive]);

  const [temporaryImageUrl, setTemporaryImageUrl] = useState("");

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewResource({
      ...newResource,
      [name]: value,
    });
  };

  const handleImageClick = () => {
    // console.log(fileInputRef);
    // console.log("fileInputRef:", fileInputRef.current);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Check if a file was selected
    if (file) {
      // setTemporaryImage(true); // Set temporaryImage to true
      const imageUrl = URL.createObjectURL(file);

      setTemporaryImageUrl(imageUrl); // Set temporary image URL
      // Update the state with the selected image file
      setNewResource({
        ...newResource,
        image: file,
      });
    }
  };

  useEffect(() => {
    return () => {
      if (temporaryImageUrl) {
        URL.revokeObjectURL(temporaryImageUrl);
      }
    };
  }, [temporaryImageUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission
    // For example, you can send the form data to the server using fetch or Axios
    // console.log(newResource); // Just to display the data in the console

    const formData = new FormData();
    formData.append("title", newResource.title);
    formData.append("startDate", newResource.startDate);
    formData.append("endDate", newResource.endDate);
    formData.append("image", newResource.image); // Append the image file to the FormData

    const apiUrl = editingArchive
      ? `${process.env.REACT_APP_API_URL}/archives/${editingArchive.id}`
      : `${process.env.REACT_APP_API_URL}/archives`;

    const method = editingArchive ? "PUT" : "POST";

    // fetch(process.env.REACT_APP_API_URL + "/archives", {
    //   method: "POST",
    //   // headers: {
    //   //   "Content-Type": "application/json",
    //   // },
    //   body: formData,
    // })

    const token = localStorage.getItem("token");

    fetch(apiUrl, {
      method,
      headers: { Authorization: token },
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setResources([...resources, data]);
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
          <p>Pengaturan daftar arsip learning academy</p>
          <Link to="/archive">
            <button onClick={handleFormSubmit}>Exit & Save</button>
          </Link>
        </div>
      </div>
      <form id="learning-form" onSubmit={handleSubmit}>
        <div className="input-field">
          <div className="mid-field">
            <div className="mid-left mid">
              <h2>Judul</h2>
              <input
                required
                type="text"
                name="title"
                value={newResource.title}
                onChange={handleChange}
              />
            </div>
            <div className="mid-center mid">
              <h2>Tanggal Mulai</h2>
              <input
                required
                type="date"
                name="startDate"
                value={newResource.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="mid-right mid">
              <h2>Tanggal Selesai</h2>
              <input
                required
                type="date"
                name="endDate"
                value={newResource.endDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="bottom-right bottom hidden">
            <h2>Upload Image</h2>
            <input
              ref={fileInputRef}
              required
              type="file"
              className="previewImage"
              accept="image/*"
              name="image"
              onChange={handleImageChange}
            />
          </div>
          <div className="bottom-field">
            {newResource.image ? (
              <div className="bottom-right bottom">
                <h2>Preview</h2>
                {/* <div className="previewDate">
                  <p>
                    {convertDate(newResource.startDate)} -
                    {convertDate(newResource.endDate)}
                  </p>
                </div> */}
                <div className="previewImage">
                  <img
                    onClick={handleImageClick}
                    src={
                      temporaryImageUrl
                        ? temporaryImageUrl
                        : process.env.REACT_APP_API_URL +
                          "/" +
                          newResource.image
                    }
                    alt="Preview"
                  />
                </div>
                {/* <div className="previewTitle">
                  <p>{newResource.title.toLocaleUpperCase()}</p>
                </div> */}
              </div>
            ) : (
              <div className="bottom-right bottom">
                <h2>Upload Image</h2>
                <input
                  required
                  type="file"
                  className="previewImage"
                  accept="image/*"
                  name="image"
                  onChange={handleImageChange}
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputArchivePage;
