import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/components/Login";
import AdminLearning from "../src/components/AdminLearning";
import AdminArchive from "../src/components/AdminArchive";
import AdminCareer from "../src/components/AdminCareer";
import InputLearning from "../src/components/InputLearning";
import InputCareer from "../src/components/InputCareer";
import "./App.css";
import Navbar from "./components/Navbar";
import InputArchive from "./components/InputArchive";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/learning"
          element={
            <RequireAuth>
              <AdminLearning />
            </RequireAuth>
          }
        />
        <Route
          path="/archive"
          element={
            <RequireAuth>
              <AdminArchive />
            </RequireAuth>
          }
        />
        <Route
          path="/career"
          element={
            <RequireAuth>
              <AdminCareer />
            </RequireAuth>
          }
        />
        <Route
          path="/input-learning"
          element={
            <RequireAuth>
              <InputLearning />
            </RequireAuth>
          }
        />
        <Route
          path="/input-archive"
          element={
            <RequireAuth>
              <InputArchive />
            </RequireAuth>
          }
        />
        <Route
          path="/input-career"
          element={
            <RequireAuth>
              <InputCareer />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
