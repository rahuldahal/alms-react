import "./App.css";
import React from "react";
import Nav from "./components/Nav";
import Landing from "./Screens/Landing";
import PrivateRoutes from "./components/PrivateRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<h1>Dahsboard</h1>} exact />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
