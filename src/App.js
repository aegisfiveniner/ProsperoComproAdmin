import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/components/Login";
import AdminLearning from "../src/components/AdminLearning";
import AdminCareer from "../src/components/AdminCareer";
import InputLearning from "../src/components/InputLearning";
import InputCareer from "../src/components/InputCareer";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const api = "http://localhost:8080";

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/learning" element={<AdminLearning />} />
        <Route path="/career" element={<AdminCareer />} />
        <Route path="/input-learning" element={<InputLearning />} />
        <Route path="/input-career" element={<InputCareer />} />
      </Routes>
    </div>
  );
}

export default App;
