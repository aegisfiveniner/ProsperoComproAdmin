import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./InputLearning.css";

const InputLearningPage = ({ resources, setResources }) => {
  const location = useLocation();
  const editingLearning = location.state
    ? location.state.editingLearning
    : null;

  const [colors, setColors] = useState([
    {
      name: "",
      hex: "",
    },
  ]);

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
  }, []);

  useEffect(() => {
    if (editingLearning && colors.length > 0) {
      const textColorFound = colors.find(
        (color) => color.id === editingLearning.textColorId
      );
      if (textColorFound) {
        setSelectedTextColorHex(textColorFound.hex);
        setSelectedTextColorId(textColorFound.id);
      }

      const backgroundColorFound = colors.find(
        (color) => color.id === editingLearning.backgroundColorId
      );
      if (backgroundColorFound) {
        setSelectedSchemeColorHex(backgroundColorFound.hex);
        setSelectedSchemeColorId(backgroundColorFound.id);
      }
    }
  }, [editingLearning, colors]);

  const [temporaryImageUrl, setTemporaryImageUrl] = useState("");

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    // console.log(fileInputRef);
    // console.log("fileInputRef:", fileInputRef.current);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [newResource, setNewResource] = useState({
    title: "",
    shortTitle: "",
    description: "",
    startDate: null,
    endDate: null,
    textColorId: null,
    backgroundColorId: null,
    image: null,
  });

  useEffect(() => {
    return () => {
      if (temporaryImageUrl) {
        URL.revokeObjectURL(temporaryImageUrl);
      }
    };
  }, [temporaryImageUrl]);

  useEffect(() => {
    if (editingLearning) {
      let rawStartDate = editingLearning?.startDate;
      let rawEndDate = editingLearning?.endDate;
      const formattedStartDate = rawStartDate?.slice(0, 10);
      const formattedEndDate = rawEndDate?.slice(0, 10);

      const newResObj = {
        title: editingLearning.title,
        shortTitle: editingLearning.shortTitle,
        description: editingLearning.description,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        textColorId: editingLearning.textColorId,
        backgroundColorId: editingLearning.backgroundColorId,
        image: editingLearning.image,
      };

      setNewResource(newResObj);
    }
  }, [editingLearning]);

  const [selectedTextColorHex, setSelectedTextColorHex] = useState("");
  const [selectedSchemeColorHex, setSelectedSchemeColorHex] = useState("");
  const [selectedTextColorId, setSelectedTextColorId] = useState(0);
  const [selectedSchemeColorId, setSelectedSchemeColorId] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // const selectedFile = e.target.files[0];
    setNewResource({
      ...newResource,
      [name]: value,
      // image: selectedFile,
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission
    // For example, you can send the form data to the server using fetch or Axios
    // console.log(newResource); // Just to display the data in the console

    const formData = new FormData();
    formData.append("title", newResource.title);
    formData.append("shortTitle", newResource.shortTitle);
    formData.append("description", newResource.description);
    formData.append("textColorId", newResource.textColorId);
    formData.append("backgroundColorId", newResource.backgroundColorId);
    formData.append("startDate", newResource.startDate);
    formData.append("endDate", newResource.endDate);
    formData.append("image", newResource.image); // Append the image file to the FormData

    const apiUrl = editingLearning
      ? `${process.env.REACT_APP_API_URL}/trainings/${editingLearning.id}`
      : `${process.env.REACT_APP_API_URL}/trainings`;

    const method = editingLearning ? "PUT" : "POST";

    // fetch(process.env.REACT_APP_API_URL + "/trainings", {
    //   method: "PUT",
    //   // headers: {
    //   //   "Content-Type": "application/json",
    //   // },
    //   body: formData,
    // })

    const token = localStorage.getItem("token");

    fetch(apiUrl, {
      method,

      headers: { Authorization: token },

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

  const onTextColorChange = (e) => {
    const selectedColorId = e.target.value;

    let colorFound = {};
    colors.find((color) => {
      if (color.id == selectedColorId) {
        colorFound = color;
      }
    });
    setSelectedTextColorHex(colorFound.hex);
    setSelectedTextColorId(colorFound.id);
    setNewResource({ ...newResource, textColorId: colorFound.id });
    // console.log("textid", selectedTextColorId);
  };

  const onSchemeColorChange = (e) => {
    const selectedColorId = e.target.value;
    // console.log("color", selectedColorId);
    let colorFound = {};
    colors.find((color) => {
      if (color.id == selectedColorId) {
        colorFound = color;
      }
    });
    // console.log("found", colorFound.id);
    setSelectedSchemeColorHex(colorFound.hex);
    setSelectedSchemeColorId(colorFound.id);
    setNewResource({ ...newResource, backgroundColorId: colorFound.id });
    // console.log("result", selectedSchemeColorId);
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
          <Link to="/learning">
            <button onClick={handleFormSubmit}>Exit & Save</button>
          </Link>
        </div>
      </div>
      <form id="learning-form" onSubmit={handleSubmit}>
        <div className="input-field">
          <div className="top-field">
            <h2>Judul Panjang</h2>
            <input
              required
              type="text"
              name="title"
              value={newResource.title}
              onChange={handleChange}
            />
          </div>
          <div className="mid-field">
            <div className="mid-left mid">
              <h2>Judul Pendek</h2>
              <input
                required
                type="text"
                name="shortTitle"
                value={newResource.shortTitle}
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
          <div className="bottom-field">
            <div className="bottom-left bottom">
              <h2>Color Scheme</h2>

              <select
                required
                className="color-code"
                name="backgroundColorId"
                onChange={onSchemeColorChange}
                value={selectedSchemeColorId}
                defaultValue=""
              >
                <option selected disabled value="">
                  Select Scheme
                </option>
                {colors.map((color) => (
                  <option
                    key={color.id}
                    value={color.id}
                    style={{
                      backgroundColor: color.hex,
                      width: "50px",
                      height: "50px",
                    }}
                  >
                    {color.hex}
                  </option>
                ))}
              </select>

              <div
                className="color-scheme"
                style={{ backgroundColor: selectedSchemeColorHex }}
              ></div>
            </div>
            <div className="bottom-center bottom">
              <h2>Text Color</h2>

              <select
                required
                className="color-name"
                name="textColorId"
                onChange={onTextColorChange}
                value={selectedTextColorId}
                defaultValue=""
              >
                <option selected disabled value="">
                  Select Color
                </option>
                {colors.map((color, index) => (
                  <option
                    key={color.id}
                    value={color.id}
                    style={{
                      backgroundColor: color.hex,
                      width: "50px",
                      height: "50px",
                    }}
                  >
                    {color.name}
                  </option>
                ))}
              </select>

              <div
                className="text-color"
                style={{ backgroundColor: selectedTextColorHex }}
              ></div>
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
            <div className="bottom-right bottom">
              {newResource.image ? (
                <div className="bottom-right bottom">
                  <h2>Preview</h2>
                  <div
                    className="previewDate"
                    style={{ color: `${selectedTextColorHex}` }}
                  >
                    <p>
                      {convertDate(newResource.startDate)} -
                      {convertDate(newResource.endDate)}
                    </p>
                  </div>
                  <div
                    className="screen"
                    onClick={handleImageClick}
                    style={{
                      backgroundImage: `linear-gradient( ${selectedSchemeColorHex}, transparent, ${selectedSchemeColorHex})`,
                    }}
                  ></div>
                  <div className="previewImage">
                    <img
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

                  <div className="previewTitle">
                    <p style={{ color: `${selectedTextColorHex}` }}>
                      {newResource.shortTitle.toLocaleUpperCase()}
                    </p>
                  </div>
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
          <div className="outline-field">
            <h2>Outline Training</h2>
            <textarea
              required
              type="text"
              name="description"
              value={newResource.description}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputLearningPage;
