import "./App.css";
import React from "react";
import Nav from "./components/Nav";
import Landing from "./Screens/Landing";
import PrivateRoutes from "./components/PrivateRoutes";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./Screens/Dashboard";

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
              <Route path="/dashboard" element={<Dashboard />} exact />
              <Route path="/protectMe" element={<h1>Protected!</h1>} exact />
            </Route>

            {/* catch all */}
            <Route path="*" element={<h1>404</h1>} />
        </Route>
      </ Routes>
    </>
  );
}

export default App;
