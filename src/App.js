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
          <Route
            element={
              <PrivateRoutes allowedRoles={["PRINCIPAL", "HOD", "TEACHER"]} />
            }
          >
            <Route
              path="/attendances"
              element={<Attendance />}
              allowedRoles={["PRINCIPAL"]}
              exact
            />
          </Route>

          <Route
            element={
              <PrivateRoutes allowedRoles={["PRINCIPAL", "HOD", "TEACHER"]} />
            }
          >
            <Route
              path="/users/students"
              element={<Students />}
              allowedRoles={["PRINCIPAL"]}
              exact
            />
          </Route>

          <Route
            element={<PrivateRoutes allowedRoles={["PRINCIPAL", "HOD"]} />}
          >
            <Route
              path="/users/teachers"
              element={<Teachers />}
              allowedRoles={["PRINCIPAL"]}
              exact
            />
          </Route>

          <Route element={<PrivateRoutes allowedRoles={["PRINCIPAL"]} />}>
            <Route
              path="/users/hods"
              element={<HODs />}
              allowedRoles={["PRINCIPAL"]}
              exact
            />
          </Route>

          {/* catch all */}
          <Route path="*" element={<h1>404</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
