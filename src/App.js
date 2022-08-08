import "./App.css";
import React from "react";
import Nav from "./components/Nav";
import Landing from "./Screens/Landing";
import PrivateRoutes from "./components/PrivateRoutes";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Students from "./Screens/Students";
import Teachers from "./Screens/Teachers";
import HODs from "./Screens/HODs";
import Attendance from "./Screens/Attendance";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Route */}
          <Route path="/" element={<Landing />} />

          {/* Protected Route */}
          <Route element={<PrivateRoutes />}>
            <Route path="/attendances" element={<Attendance />} exact />
            <Route path="/users/students" element={<Students />} exact />
            <Route path="/users/teachers" element={<Teachers />} exact />
            <Route path="/users/hods" element={<HODs />} exact />
          </Route>

          {/* catch all */}
          <Route path="*" element={<h1>404</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
