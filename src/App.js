import "./App.css";

import HODs from "./Screens/HODs";
import Nav from "./components/Nav";
import useAuth from "./hooks/useAuth";
import Landing from "./Screens/Landing";
import Courses from "./Screens/Courses";
import Layout from "./components/Layout";
import Students from "./Screens/Students";
import Teachers from "./Screens/Teachers";
import Subjects from "./Screens/Subjects";
import Attendance from "./Screens/Attendance";
import { getAuthStatus } from "./services/user";
import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PrivateRoutes from "./components/PrivateRoutes";
import StudentsOfASubject from "./Screens/StudentsOfASubject";
import { StudentAttendance } from "./Screens/StudentAttendance";
import AttendanceCalendar from "./components/AttendanceCalendar";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAuthStatus();
        const { authStatus } = data;

        setAuth({ ...authStatus });
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

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
              element={<PrivateRoutes allowedRoles={["PRINCIPAL", "HOD"]} />}
            >
              <Route path="/courses" element={<Courses />} exact />
            </Route>

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

            <Route element={<PrivateRoutes allowedRoles={["STUDENT"]} />}>
              <Route
                path="/my-attendance"
                element={<StudentAttendance />}
                exact
              />
            </Route>

            <Route element={<PrivateRoutes allowedRoles={["STUDENT"]} />}>
              <Route
                path="/attendance-calendar"
                element={<AttendanceCalendar />}
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
