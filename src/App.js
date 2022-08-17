import "./App.css";
import React, { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Landing from "./Screens/Landing";
import PrivateRoutes from "./components/PrivateRoutes";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Students from "./Screens/Students";
import Teachers from "./Screens/Teachers";
import HODs from "./Screens/HODs";
import Attendance from "./Screens/Attendance";
import Subjects from "./Screens/Subjects";
import StudentsOfASubject from "./Screens/StudentsOfASubject";
import useAuth from "./hooks/useAuth";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    setTimeout(() => setAuth({ isAuthenticated: true, role: "TEACHER" }), 2000);
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated) {
      setIsLoading(false);
    }
  }, [auth]);

  return (
    <>
      <Nav loading={isLoading} />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
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
              <Route path="/attendances" element={<Attendance />} exact />
            </Route>

            <Route
              element={
                <PrivateRoutes allowedRoles={["PRINCIPAL", "HOD", "TEACHER"]} />
              }
            >
              <Route path="/subjects" element={<Subjects />} exact />
            </Route>

            <Route element={<PrivateRoutes allowedRoles={["TEACHER"]} />}>
              <Route
                path="/subjects/students"
                element={<StudentsOfASubject />}
                exact
              />
            </Route>

            <Route
              element={
                <PrivateRoutes allowedRoles={["PRINCIPAL", "HOD", "TEACHER"]} />
              }
            >
              <Route path="/users/students" element={<Students />} exact />
            </Route>

            <Route
              element={<PrivateRoutes allowedRoles={["PRINCIPAL", "HOD"]} />}
            >
              <Route path="/users/teachers" element={<Teachers />} exact />
            </Route>

            <Route element={<PrivateRoutes allowedRoles={["PRINCIPAL"]} />}>
              <Route path="/users/hods" element={<HODs />} exact />
            </Route>

            {/* catch all */}
            <Route path="*" element={<h1>404</h1>} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
